import urlMetadata from "url-metadata";
import { clientDB } from "../database/db.connection.js";

export async function getPosts(req, res) {
  try {
    const getPosts = await clientDB.query(
      `SELECT p.*, l.likes_count
      FROM posts p
      LEFT JOIN (
          SELECT posts.id AS post_id, COUNT(l.id) AS likes_count
          FROM posts 
          LEFT JOIN likes l ON posts.id = l.liked_post_id
          GROUP BY posts.id
      ) AS l ON p.id = l.post_id
      ORDER BY p.id DESC;
      `
    );

    const posts = getPosts.rows;
    for (const post of posts) {
      try {
        const metadata = await urlMetadata(post.link);
        post.metadata = {
          description: metadata.description,
          title: metadata["og:title"],
          image: metadata["og:image"],
        };
      } catch (err) {
        console.log(err);
      }
    }

    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
  }
}

export async function postLike(req, res) {
  const { id } = req.params;
  const { like_owner_id } = req.body;

  try {
    await clientDB.query(
      `INSERT INTO likes (liked_post_id, like_owner_id) VALUES ($1, $2) `,
      [id, like_owner_id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro ao adicionar o like");
  }
}
