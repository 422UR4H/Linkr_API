import { Router } from "express";
// import validateAuth from "../middlewares/validateAuth";
import { deleteLike, getPosts, getTimelinePostsRefactored, postLike } from "../controllers/timeline.controllers.js";
import validateAuth from "../middlewares/validateAuth.js";
const timelineRoutes = Router();

timelineRoutes.post("/like/:id",validateAuth,postLike);
timelineRoutes.delete("/dislike/:id",validateAuth,deleteLike);
timelineRoutes.get("/timeline",validateAuth, getTimelinePostsRefactored);

export default timelineRoutes;
