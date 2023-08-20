import { clientDB } from "../database/db.connection.js";

export function getPostsDB() {
  return clientDB.query(
    `SELECT p.*, l.likes_count, u.user_name AS user_name, u.photo AS user_photo
        FROM posts p
        LEFT JOIN (
            SELECT posts.id AS post_id, COUNT(l.id) AS likes_count
            FROM posts 
            LEFT JOIN likes l ON posts.id = l.liked_post_id
            GROUP BY posts.id
        ) AS l ON p.id = l.post_id
        LEFT JOIN users u ON p.owner_id = u.id
        ORDER BY p.id DESC;          
        `
  );
}

export function getPostsDBRefactored(userId) {
  return clientDB.query(
      `SELECT 
        posts.*, 
        like_counts.likes_count, 
        users.user_name AS user_name, 
        users.photo AS user_photo,
        CASE 
            WHEN EXISTS (
                SELECT 1 FROM likes WHERE liked_post_id = posts.id AND like_owner_id = $1
            ) THEN TRUE 
            ELSE FALSE 
        END AS default_liked,
        COALESCE(first_liker.user_name, '') AS first_liker_name,
        COALESCE(second_liker.user_name, '') AS second_liker_name
        FROM posts
        LEFT JOIN (
            SELECT 
                posts.id AS post_id, 
                COUNT(likes.id) AS likes_count
            FROM posts 
            LEFT JOIN likes ON posts.id = likes.liked_post_id
            GROUP BY posts.id
        ) AS like_counts ON posts.id = like_counts.post_id
        LEFT JOIN users ON posts.owner_id = users.id
        LEFT JOIN users first_liker ON first_liker.id = (
            SELECT like_owner_id FROM likes 
            WHERE liked_post_id = posts.id
            ORDER BY id ASC
            LIMIT 1
        )
        LEFT JOIN users second_liker ON second_liker.id = (
            SELECT like_owner_id FROM likes 
            WHERE liked_post_id = posts.id
            ORDER BY id ASC
            LIMIT 1 OFFSET 1
        )
        ORDER BY posts.id DESC
        LIMIT 20;        
        `
  ,[userId]);
}

export function postLikeDB(id, like_owner_id) {
  return clientDB.query(
    `INSERT INTO likes (liked_post_id, like_owner_id) VALUES ($1, $2) `,
    [id, like_owner_id]
  );
}

export function deleteLikeDB(id, userId) {
  return clientDB.query(
    `DELETE FROM likes WHERE liked_post_id = $1 AND like_owner_id = $2`,
    [id, userId]
  );
}
