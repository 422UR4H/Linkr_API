import { clientDB } from "../database/db.connection.js";

export async function addPost(owner_id, post) {
    const {link, description, hash_tags} = post;

    console.log(owner_id);

    await clientDB.query(`
    INSERT INTO posts ("link", "description", "hash_tags", "owner_id") 
    VALUES ($1, $2, $3, $4)`,
    [link, description, hash_tags, owner_id]
    );
};

export async function getPostsById(id) {
    const posts = await clientDB.query(`SELECT * FROM posts WHERE id = $1`, [id]);
    return posts.rows[0];
}

export async function editPost(description, hash_tags, id) {
    console.log(hash_tags);
    await clientDB.query(`
    UPDATE posts SET "description"=$1, "hash_tags"=$2 WHERE "id"=$3`, 
    [description, hash_tags, id]
    );
}

export async function deletePost(id) {
    await clientDB.query(`DELETE FROM posts WHERE id = $1`, [id]);
}