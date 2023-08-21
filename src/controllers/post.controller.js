import urlMetadata from "../Utils/urlMetadata.js";
import { getFirstLikeNamesFromPost, userHasLikedPost } from "../repositories/user.repository.js";
import {
  addPost,
  deletePost,
  editPost,
  getPostsByHashtagDB,
  getPostsById,
  getPostsDB,
  getPostsDBRefactored
} from "../repositories/post.repository.js";


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
    res.status(500).send("Erro ao requerir o post");
  }
}

export async function getTimelinePostsRefactored(req, res) {
  try {
    const getPosts = await getPostsDBRefactored(res.locals.user.id);
    return res.status(200).send(getPosts.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error getting timeline posts")
  }
}

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params
  try {
    const tredingPosts = await getPostsByHashtagDB(hashtag)
    const posts = tredingPosts.rows;

    for (const post of posts) {
      try {
        const metadata = (await urlMetadata(post.link)).data;
        post.metadata =
        {
          description: metadata.description ? metadata.description : "",
          title: metadata.title ? metadata.title : "",
          image: metadata.images && metadata.images[0] ? metadata.images[0] : ""
        };
        post.default_liked = await userHasLikedPost(post.id, res.locals.user.id);
        const names = await getFirstLikeNamesFromPost(post.id);
        post.first_liker_name = names.first_liker_name;
        post.second_liker_name = names.second_liker_name;
      } catch (err) {
        console.log(err.message);
      }
    }
    res.send(posts)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(500)
  }
}

export async function publishPost(req, res) {
  const user = res.locals.user;
  const post = req.body;
  try {
    await addPost(user.id, post);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const { description, hash_tags } = req.body;
  const user = res.locals.user;
  const post = await getPostsById(id);

  if (post.owner_id != user.id) {
    return res.status(401).send("Post não foi deletado");
  }

  try {
    await editPost(description, hash_tags, id);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function removePost(req, res) {
  const id = req.params.id;
  const user = res.locals.user;
  const post = await getPostsById(id);

  if (post.owner_id != user.id) {
    return res.status(401).send("Post não foi deletado");
  }

  try {
    await deletePost(id);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}