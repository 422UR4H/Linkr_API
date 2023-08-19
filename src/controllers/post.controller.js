import { addPost, deletePost, editPost, getPostsById } from "../repositories/post.repository.js";

export async function publishPost(req,res) {
    const user = res.locals.user;
    const post = req.body;

    try {
        await addPost(user.id, post);
        return res.sendStatus(201);      
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  export async function updatePost(req,res) {
    const { id } = req.params;
    const { description, hash_tags } = req.body;
    const user = res.locals.user;
    const post = await getPostsById(id);
    if(post.owner_id != user.id) {
        return res.status(401).send("Post não foi deletado");
    }

    try {
        await editPost(description, hash_tags, id);
        return res.sendStatus(201);        
    } catch (error) {
        return res.status(500).send(error.message);
    }
  }

  export async function removePost(req,res) {
    const id  = req.params.id;
    const user = res.locals.user;
    const post = await getPostsById(id);

      if(post.owner_id != user.id) {
        return res.status(401).send("Post não foi deletado");
    }

    try {
        await deletePost(id);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).send(error.message);
    }
  }