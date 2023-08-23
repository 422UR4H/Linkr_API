import {
  addPost,
  deletePost,
  deleteRepost,
  editPost,
  getPostsByHashtagDBRefactored,
  getPostsById,
  getPostsDBRefactored,
  getRepostsById,
  getRepostsWithHashtag,
  repostDB,
} from "../repositories/post.repository.js";
import { getFollowersFromUser } from "./users.controller.js";

export async function getTimelinePostsRefactored(req, res) {
  try {
    const userId = res.locals.user.id;
    const userIsFollowing = await getFollowersFromUser(userId);

    const page = req.query.page || 0;
    const postsPerPage = 10;
    const offset = page * postsPerPage;

    console.log("Debug: userId =", userId);
    console.log("Debug: userIsFollowing =", userIsFollowing);
    console.log("Debug: page =", page);
    console.log("Debug: postsPerPage =", postsPerPage);
    console.log("Debug: offset =", offset);

    const getPosts = await getPostsDBRefactored(res.locals.user.id, offset);
    console.log("Debug: getPosts =", getPosts.rows);

    if (getPosts.rows.length === 0) {
      if (!userIsFollowing) {
        console.log("Debug: Sending 202");
        return res.sendStatus(202);
      } else {
        console.log("Debug: Sending 204");
        return res.sendStatus(204);
      }
    }

    console.log("Debug: Sending 200");
    res.status(200).send(getPosts.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
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

export async function removeRepost(req, res) {
  const id = req.params.id;
  const user = res.locals.user;
  const post = await getRepostsById(id);

  if (post.reposted_by_id != user.id) {
    return res.status(401).send("Repost não foi deletado");
  }

  try {
    await deleteRepost(id);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getPostsByHashtagRefactored(req, res) {
  const { hashtag } = req.params;

  try {
    const postsFilteredByHashtag = (
      await getPostsByHashtagDBRefactored(hashtag, res.locals.user.id)
    ).rows;
    const repostsFilteredByHastag = (
      await getRepostsWithHashtag(hashtag, res.locals.user.id)
    ).rows;
    const response = [...postsFilteredByHashtag, ...repostsFilteredByHastag];
    return res.send(response);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
}

export async function repost(req, res) {
  const { postId } = req.body;
  try {
    await repostDB(postId, res.locals.user.id);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
}
