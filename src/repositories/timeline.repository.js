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
