import { clientDB } from "../database/db.connection.js";

export function createCommentDB(writer_id, post_id, comment) {
    return clientDB.query(
        `INSERT INTO comments
            (writer_id, post_id, comment)
        VALUES
            ($1, $2, $3)
        RETURNING *`,
        [writer_id, post_id, comment]
    );
}

export function getCommentsByPostDB(post_id) {
    return clientDB.query(
        `SELECT c.*, u.user_name
        FROM comments AS c
        JOIN users AS u ON c.writer_id = u.id
        WHERE post_id = $1`,
        [post_id]
    );
}