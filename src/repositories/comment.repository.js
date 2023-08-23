import { clientDB } from "../database/db.connection.js";

export default function createCommentDB(writer_id, post_id, comment) {
    return clientDB.query(
        `INSERT INTO comments
            (writer_id, post_id, comment)
        VALUES
            ($1, $2, $3)
        RETURNING *`,
        [writer_id, post_id, comment]
    );
}

// export default function getComments