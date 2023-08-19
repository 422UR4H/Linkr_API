import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js"
import { publishPost, removePost, updatePost } from "../controllers/post.controller.js";
import { editPostSchema, postSchema } from "../schemas/post.schema.js";

const postRouter = Router();
postRouter.post("/post", validateAuth, validateSchema(postSchema), publishPost);
postRouter.put("/post/:id", validateAuth, validateSchema(editPostSchema), updatePost);
postRouter.delete("/post/:id", validateAuth, removePost);

export default postRouter;