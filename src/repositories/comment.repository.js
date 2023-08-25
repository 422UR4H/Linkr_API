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
        `SELECT c.*, u.user_name, u.photo,
            CASE
                WHEN f.following IS NOT NULL THEN TRUE
                ELSE FALSE
            END AS is_follower
        FROM comments AS c
        JOIN users AS u ON c.writer_id = u.id
        LEFT JOIN followers AS f ON f.follower = $2 AND f.following = c.writer_id
        WHERE c.post_id = $1`,
        [post_id, user_id]
    );
}

export function getCommentsCountsDB() {
    return clientDB.query(
        `SELECT c.post_id, COUNT(c.post_id) AS comments_count
        FROM comments AS c
        GROUP BY c.post_id
        ORDER BY comments_count DESC`
    );
}