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
