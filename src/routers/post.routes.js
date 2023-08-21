import { Router } from "express";
import { editPostSchema, postSchema } from "../schemas/post.schema.js";
import validateAuth from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js"
import {
    getPosts,
    getPostsByHashtag,
    publishPost,
    removePost,
    updatePost
} from "../controllers/post.controller.js";

const postRouter = Router();
postRouter.post("/posts", validateAuth, validateSchema(postSchema), publishPost);
postRouter.get("/posts", validateAuth, getPosts);
postRouter.get("/posts/:hashtag", validateAuth, getPostsByHashtag);
postRouter.put("/posts/:id", validateAuth, validateSchema(editPostSchema), updatePost);
postRouter.delete("/posts/:id", validateAuth, removePost);

export default postRouter;