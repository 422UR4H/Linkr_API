import urlMetadata from "../Utils/urlMetadata.js";
import { clientDB } from "../database/db.connection.js";
import {
  deleteLikeDB,
  getPostsDB,
  getPostsDBRefactored,
  postLikeDB,
} from "../repositories/timeline.repository.js";
import {
  getFirstLikeNamesFromPost,
  userHasLikedPost,
} from "../repositories/user.repository.js";

export async function getTimelinePostsRefactored(req, res) {
  try {
    const getPosts = await getPostsDBRefactored(res.locals.user.id);
    return res.status(200).send(getPosts.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error getting timeline posts")
  }
}

export async function getPosts(req, res) {
  try {
    const getPosts = await getPostsDB();
    const posts = getPosts.rows;
    for (const post of posts) {
      try {
        const metadata = (await urlMetadata(post.link)).data;
        post.metadata = {
          description: metadata.description ? metadata.description : "",
          title: metadata.title ? metadata.title : "",
          image:
            metadata.images && metadata.images[0] ? metadata.images[0] : "",
        };

        post.default_liked = await userHasLikedPost(
          post.id,
          res.locals.user.id
        );
        const names = await getFirstLikeNamesFromPost(post.id);
        post.first_liker_name = names.first_liker_name;
        post.second_liker_name = names.second_liker_name;
      } catch (err) {
        console.log(err.message);
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
    await postLikeDB(id, like_owner_id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro ao adicionar o like");
  }
}

export async function deleteLike(req, res) {
  const { id } = req.params;
  const userId = res.locals.user.id;
  try {
    await deleteLikeDB(id, userId);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro ao retirar o like");
  }
}
