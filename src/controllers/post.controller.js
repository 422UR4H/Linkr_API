
import { sortPostsByDate } from "../Utils/orderPostsData.js";
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
import { getRepostsFromUser } from "../repositories/user.repository.js";
import { getFollowersFromUser } from "./users.controller.js";

export async function getTimelinePostsRefactored(req, res) {
  const page = parseInt(req.query.page, 10) || 0;

  try {
    const userId = res.locals.user.id;
    const userIsFollowing = await getFollowersFromUser(userId);
    const postsPerPage = 10;
    const getReposts = await getRepostsFromUser(
      res.locals.user.id,
      res.locals.user.id,
      0
    );

    const getPosts = (await getPostsDBRefactored(res.locals.user.id, 0))
      .rows;
    
    const allPostsAndRepostsFromUserTimeline = sortPostsByDate([
      ...getPosts,
      ...getReposts,
    ]); //Ordenar por data de criação
    const currentPage =  page ? Number(page) : 1;
    const start =( currentPage-1) * postsPerPage;
    const end = postsPerPage * currentPage;
    const responseFinal = allPostsAndRepostsFromUserTimeline.slice(start,end);
    if (responseFinal.length === 0) {
      if (!userIsFollowing) {
        return res.sendStatus(202);
      } else {
        return res.sendStatus(204);
      }
    }

    res.status(200).send(responseFinal);
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
