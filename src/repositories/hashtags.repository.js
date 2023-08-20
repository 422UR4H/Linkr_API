import { clientDB } from "../database/db.connection.js";

export async function getPostsByHashtagDB(hashtag) {
    return clientDB.query(`SELECT p.id, p.link, p.description, p.hash_tags, p.owner_id, p.created_at,
    l.likes_count, u.user_name, u.photo as user_photo
    FROM posts p
    LEFT JOIN (
    SELECT posts.id AS post_id, COUNT(l.id) AS likes_count
    FROM posts 
    LEFT JOIN likes l ON posts.id = l.liked_post_id
    GROUP BY posts.id
    ) AS l ON p.id = l.post_id
    LEFT JOIN users u ON p.owner_id = u.id
    WHERE p.hash_tags ILIKE $1
    ORDER BY p.id DESC;
    `, [`%${hashtag.trim()}%`])
}

export async function getPostsByHashtagDBRefactored(hashtag,userId) {
    return clientDB.query(`
    SELECT
    p.id,
    p.link,
    p.description,
    p.hash_tags,
    p.owner_id,
    p.created_at,
    l.likes_count,
    u.user_name,
    u.photo AS user_photo,
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
    LEFT JOIN users u ON p.owner_id = u.id
    LEFT JOIN users fl ON fl.id = (
        SELECT like_owner_id FROM likes 
        WHERE liked_post_id = p.id
        ORDER BY id ASC
        LIMIT 1
    )
    LEFT JOIN users sl ON sl.id = (
        SELECT like_owner_id FROM likes 
        WHERE liked_post_id = p.id
        ORDER BY id ASC
        LIMIT 1 OFFSET 1
    )
    WHERE p.hash_tags ILIKE $1
    ORDER BY p.id DESC
    LIMIT 20;
    `, [`%${hashtag.trim()}%`,userId])
    
}

