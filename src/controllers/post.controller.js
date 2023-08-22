
import {
  addPost,
  deletePost,
  editPost,
  getPostsByHashtagDBRefactored,
  getPostsById,
  getPostsDBRefactored
} from "../repositories/post.repository.js";
import { getFollowersFromUser } from "./users.controller.js";

export async function getTimelinePostsRefactored(req, res) {
  try {
    const userId= res.locals.user.id;
    const userIsFollowing = await getFollowersFromUser(userId)
    const getPosts = await getPostsDBRefactored(res.locals.user.id);

    if (getPosts.rows.length === 0) {
      if (!userIsFollowing) {
        return res.sendStatus(404); 
      } else {
        return res.sendStatus(204);
      }
    }

    res.status(200).send(getPosts.rows);
  } catch (err) {
    console.log(err);
    return res.status(500)
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

export async function getPostsByHashtagRefactored(req, res) {
  const {hashtag} = req.params;

  try {
      const tredingPosts = await getPostsByHashtagDBRefactored(hashtag,res.locals.user.id);
      return res.send(tredingPosts.rows);
      
  } catch (error) {
      console.log(error.message)
      return res.sendStatus(500)
  }
}

