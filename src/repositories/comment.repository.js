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

export function getCommentsByPostDB(post_id, user_id) {
    return clientDB.query(
        // `SELECT c.*, u.user_name
        // FROM comments AS c
        // JOIN users AS u ON c.writer_id = u.id
        // WHERE c.post_id = $1`,
        `SELECT c.*, u.user_name, u.photo,
            CASE
                WHEN f.following IS NOT NULL THEN TRUE
                ELSE FALSE
            END AS is_follower
        FROM comments AS c
        JOIN users AS u ON c.writer_id = u.id
        LEFT JOIN followers AS f ON c.writer_id = f.follower AND f.following = $2
        WHERE c.post_id = $1`,
        [post_id, user_id]
    );
}