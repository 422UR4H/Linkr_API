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

export function getPostsHashtags() {
  return clientDB.query(`SELECT posts.hash_tags FROM posts;`);
}

export function getPostsDBRefactored(userId, offset) {
  return clientDB.query(
    `SELECT DISTINCT
        posts.*, 
        like_counts.likes_count, 
        repost_counts.repost_count,
        users.user_name AS user_name, 
        users.photo AS user_photo,
        false as is_repost,
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
        LIMIT 10 OFFSET $2;
        `,
    [userId, offset]
  );
}

export async function getPostsById(id) {
  const posts = await clientDB.query(`SELECT * FROM posts WHERE id = $1`, [id]);
  return posts.rows[0];
}

export async function getRepostsById(id) {
  const posts = await clientDB.query(`SELECT * FROM reposts WHERE id = $1`, [
    id,
  ]);
  return posts.rows[0];
}

export async function getPostsByHashtagDBRefactored(hashtag, userId) {
  return clientDB.query(
    `  SELECT 
        posts.id, posts.link, posts.description, posts.hash_tags, posts.owner_id, posts.created_at,
        likes_count.likes_count, users.user_name, users.photo AS user_photo, repost_counts.repost_count,
        false AS is_repost,
        COALESCE(first_liker.user_name, '') AS first_liker_name,
        COALESCE(second_liker.user_name, '') AS second_liker_name,
        CASE
            WHEN EXISTS (
                SELECT 1 FROM likes WHERE liked_post_id = posts.id AND like_owner_id = $2
            ) THEN TRUE 
            ELSE FALSE 
        END AS default_liked
        FROM posts
        LEFT JOIN (
            SELECT 
                posts.id AS post_id, COUNT(likes.id) AS likes_count
            FROM posts 
            LEFT JOIN likes ON posts.id = likes.liked_post_id
            GROUP BY posts.id
        ) AS likes_count ON posts.id = likes_count.post_id
        LEFT JOIN (
            SELECT 
                references_post_id AS post_id, 
                COUNT(id) AS repost_count
            FROM reposts
            GROUP BY references_post_id
        ) AS repost_counts ON posts.id = repost_counts.post_id
        LEFT JOIN users ON posts.owner_id = users.id
        LEFT JOIN users AS first_liker ON first_liker.id = (
            SELECT like_owner_id FROM likes 
            WHERE liked_post_id = posts.id
            ORDER BY created_at ASC
            LIMIT 1
        )
        LEFT JOIN users AS second_liker ON second_liker.id = (
            SELECT like_owner_id FROM likes 
            WHERE liked_post_id = posts.id
            ORDER BY created_at ASC
            LIMIT 1 OFFSET 1
        )
        WHERE posts.hash_tags LIKE $1
        ORDER BY posts.created_at DESC
        LIMIT 20;
    `,
    [`%${hashtag.trim()}%`, userId]
  );
}

export async function getRepostsWithHashtag(hashtag, viewerId) {
  try {
    const query = `
    SELECT
    reposts.id AS repost_id,
    reposts.created_at AS repost_created_at,
    posts.id AS id,
    posts.link AS link,
    posts.description AS description,
    posts.hash_tags AS hash_tags,
    posts.owner_id AS owner_id,
    posts.created_at AS created_at,
    reposts.reposted_by_id,
    COALESCE(repost_counts.repost_count, 0) AS repost_count,
    COALESCE(likes_counts.likes_count, 0) AS likes_count,
    users.user_name AS user_name,
    users.photo AS user_photo,
    first_liker.user_name AS first_liker_name,
    second_liker.user_name AS second_liker_name,
    true AS is_repost,
  CASE WHEN EXISTS (SELECT 1 FROM likes WHERE liked_post_id = posts.id AND like_owner_id = $2) THEN true ELSE false END AS default_liked
  FROM reposts
  INNER JOIN posts ON reposts.references_post_id = posts.id
  LEFT JOIN users ON reposts.reposted_by_id = users.id
  LEFT JOIN (
      SELECT liked_post_id, COUNT(*) AS likes_count
      FROM likes
      GROUP BY liked_post_id
  ) AS likes_counts ON posts.id = likes_counts.liked_post_id
  LEFT JOIN (
      SELECT
          likes.liked_post_id,
          users.user_name,
          ROW_NUMBER() OVER (PARTITION BY likes.liked_post_id ORDER BY likes.liked_at) AS row_num
      FROM likes
      JOIN users ON likes.like_owner_id = users.id
  ) AS first_liker ON posts.id = first_liker.liked_post_id AND first_liker.row_num = 1
  LEFT JOIN (
      SELECT
          likes.liked_post_id,
          users.user_name,
          ROW_NUMBER() OVER (PARTITION BY likes.liked_post_id ORDER BY likes.liked_at) AS row_num
      FROM likes
      JOIN users ON likes.like_owner_id = users.id
  ) AS second_liker ON posts.id = second_liker.liked_post_id AND second_liker.row_num = 2
  LEFT JOIN (
      SELECT references_post_id, COUNT(*) AS repost_count
      FROM reposts
      GROUP BY references_post_id
  ) AS repost_counts ON posts.id = repost_counts.references_post_id
  WHERE posts.hash_tags LIKE $1
  ORDER BY reposts.created_at DESC;
  `;
    return clientDB.query(query, [`%${hashtag.trim()}%`, viewerId]);
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

export async function editPost(description, hash_tags, id) {
  return await clientDB.query(
    `UPDATE posts SET "description"=$1, "hash_tags"=$2 WHERE "id"=$3`,
    [description, hash_tags, id]
  );
}

export async function deletePost(id) {
  return await clientDB.query(`DELETE FROM posts WHERE id = $1`, [id]);
}

export async function deleteRepost(id) {
  return await clientDB.query(`DELETE FROM reposts WHERE id = $1`, [id]);
}

export async function repostDB(postId, userId) {
  return clientDB.query(
    `
  INSERT INTO reposts ("reposted_by_id","references_post_id")
  VALUES( $1 , $2 )`,
    [userId, postId]
  );
}
