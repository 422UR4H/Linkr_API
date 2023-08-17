import { Router } from "express";
// import validateAuth from "../middlewares/validateAuth";
import { getPosts } from "../controllers/timeline.controllers.js";
import { deleteLike, getPosts, postLike } from "../controllers/timeline.controllers.js";
import validateAuth from "../middlewares/validateAuth.js";
const timelineRoutes = Router();

timelineRoutes.get("/timeline", getPosts);

timelineRoutes.post("/like/:id",validateAuth,postLike);
timelineRoutes.delete("/dislike/:id",validateAuth,deleteLike);
timelineRoutes.get("/timeline",validateAuth, getPosts);

export default timelineRoutes;
