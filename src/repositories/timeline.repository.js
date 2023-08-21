import { clientDB } from "../database/db.connection.js";


export function postLikeDB(id, like_owner_id) {
  return clientDB.query(
    `INSERT INTO likes (liked_post_id, like_owner_id) VALUES ($1, $2) `,
    [id, like_owner_id]
  );
}

export function deleteLikeDB(id, userId) {
  return clientDB.query(
    `DELETE FROM likes WHERE liked_post_id = $1 AND like_owner_id = $2`,
    [id, userId]
  );
}
