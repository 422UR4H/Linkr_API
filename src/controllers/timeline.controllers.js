import { clienteDB } from "../database/db.connection.js";

export async function getPosts(req, res) {
  try {
    const getPosts = await clienteDB.query(
      `SELECT * FROM posts ORDER BY id DESC`
    );
    res.status(200).send(getPosts.rows);
  } catch (err) {
    console.log(err);
  }
}
