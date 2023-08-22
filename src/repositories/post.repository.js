import { clientDB } from "../database/db.connection.js";

export async function addPost(owner_id, post) {
  const { link, description, hash_tags } = post;
  return await clientDB.query(
    `
        INSERT INTO posts ("link", "description", "hash_tags", "owner_id") 
        VALUES ($1, $2, $3, $4)`,
    [link, description, hash_tags, owner_id]
  );
}

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
            ORDER BY p.created_at DESC;`
  );
}

export function getPostsDBRefactored(userId) {
  return clientDB.query(
    `SELECT 
        posts.*, 
        like_counts.likes_count, 
        repost_counts.repost_count,
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
        JOIN followers ON posts.owner_id = followers.following
        LEFT JOIN (
            SELECT 
                posts.id AS post_id, 
                COUNT(likes.id) AS likes_count
            FROM posts 
            LEFT JOIN likes ON posts.id = likes.liked_post_id
            GROUP BY posts.id
        ) AS like_counts ON posts.id = like_counts.post_id
        LEFT JOIN (
          SELECT 
              references_post_id AS post_id, 
              COUNT(id) AS repost_count
          FROM reposts
          GROUP BY references_post_id
      ) AS repost_counts ON posts.id = repost_counts.post_id
        LEFT JOIN users ON posts.owner_id = users.id
        LEFT JOIN users first_liker ON first_liker.id = (
            SELECT like_owner_id FROM likes 
            WHERE liked_post_id = posts.id
            LIMIT 1
        )
        LEFT JOIN users second_liker ON second_liker.id = (
            SELECT like_owner_id FROM likes 
            WHERE liked_post_id = posts.id
            LIMIT 1 OFFSET 1
        )
        WHERE posts.owner_id = $1 
        OR posts.owner_id IN (
        SELECT following FROM followers WHERE follower = $1 
        )
        ORDER BY posts.created_at DESC
        `,
    [userId]
  );
}

export async function getPostsById(id) {
  const posts = await clientDB.query(`SELECT * FROM posts WHERE id = $1`, [id]);
  return posts.rows[0];
}

export async function getPostsByHashtagDBRefactored(hashtag, userId) {
  return clientDB.query(
    `
    SELECT p.id, p.link, p.description, p.hash_tags, p.owner_id, p.created_at,
        l.likes_count, u.user_name, u.photo AS user_photo, repost_counts.repost_count,
    COALESCE(fl.user_name, '') AS first_liker_name,
    COALESCE(sl.user_name, '') AS second_liker_name,
    CASE
        WHEN EXISTS (
            SELECT 1 FROM likes WHERE liked_post_id = p.id AND like_owner_id = $2
        ) THEN TRUE 
        ELSE FALSE 
    END AS default_liked
    FROM posts p
    LEFT JOIN (
        SELECT posts.id AS post_id, COUNT(l.id) AS likes_count
        FROM posts 
        LEFT JOIN likes l ON posts.id = l.liked_post_id
        GROUP BY posts.id
    ) AS l ON p.id = l.post_id
    LEFT JOIN (
      SELECT 
          references_post_id AS post_id, 
          COUNT(id) AS repost_count
      FROM reposts
      GROUP BY references_post_id
  ) AS repost_counts ON p.id = repost_counts.post_id
    LEFT JOIN users u ON p.owner_id = u.id
    LEFT JOIN users fl ON fl.id = (
        SELECT like_owner_id FROM likes 
        WHERE liked_post_id = p.id
        ORDER BY created_at ASC
        LIMIT 1
    )
    LEFT JOIN users sl ON sl.id = (
        SELECT like_owner_id FROM likes 
        WHERE liked_post_id = p.id
        ORDER BY created_at ASC
        LIMIT 1 OFFSET 1
    )
    WHERE p.hash_tags LIKE $1
    ORDER BY p.created_at DESC
    LIMIT 20;
    `,
    [`%${hashtag.trim()}%`, userId]
  );
}

export async function editPost(description, hash_tags, id) {
  return await clientDB.query(
    `
        UPDATE posts SET "description"=$1, "hash_tags"=$2 WHERE "id"=$3`,
    [description, hash_tags, id]
  );
}

export async function deletePost(id) {
  return await clientDB.query(`DELETE FROM posts WHERE id = $1`, [id]);
}

export async function repostDB(postId,userId) {
  return clientDB.query(`
  INSERT INTO reposts ("reposted_by_id","references_post_id")
  VALUES( $1 , $2 )`, [userId,postId]);
}
