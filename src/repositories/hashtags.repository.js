import { clientDB } from "../database/db.connection.js";

export async function getPostsByHashtagDB(hashtag){
    return clientDB.query(`SELECT * FROM posts WHERE hash_tags LIKE $1;`, [`%${hashtag.toLowerCase()}%`])
}