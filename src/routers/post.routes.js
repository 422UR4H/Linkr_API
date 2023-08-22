import { Router } from "express";
import { editPostSchema, postSchema, repostSchema } from "../schemas/post.schema.js";
import validateAuth from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  getPostsByHashtagRefactored,
  getTimelinePostsRefactored,
  publishPost,
  removePost,
  repost,
  updatePost,
} from "../controllers/post.controller.js";
const postRouter = Router();

postRouter.post("/posts", validateAuth, validateSchema(postSchema), publishPost);
postRouter.get("/timeline",validateAuth, getTimelinePostsRefactored);
postRouter.get("/posts/:hashtag", validateAuth, getPostsByHashtagRefactored);
postRouter.put("/posts/:id", validateAuth, validateSchema(editPostSchema), updatePost);
postRouter.delete("/posts/:id", validateAuth, removePost);
postRouter.post("/repost", validateAuth, validateSchema(repostSchema), repost);


export default postRouter;
