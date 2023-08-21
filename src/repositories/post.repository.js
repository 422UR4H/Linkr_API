import { clientDB } from "../database/db.connection.js";

export async function addPost(owner_id, post) {
    const { link, description, hash_tags } = post;
    return await clientDB.query(`
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
            ORDER BY p.id DESC;`
    );
}

export async function getPostsById(id) {
    const posts = await clientDB.query(`SELECT * FROM posts WHERE id = $1`, [id]);
    return posts.rows[0];
}

export async function getPostsByHashtagDB(hashtag) {
    return clientDB.query(
        `SELECT p.id, p.link, p.description, p.hash_tags, p.owner_id, p.created_at,
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
    `, [`%${hashtag.trim()}%`]);
}

export async function editPost(description, hash_tags, id) {
    return await clientDB.query(`
        UPDATE posts SET "description"=$1, "hash_tags"=$2 WHERE "id"=$3`,
        [description, hash_tags, id]
    );
}

export async function deletePost(id) {
    return await clientDB.query(`DELETE FROM posts WHERE id = $1`, [id]);
}