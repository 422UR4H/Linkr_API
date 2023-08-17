import { Router } from "express";
// import validateAuth from "../middlewares/validateAuth";
import { getPosts } from "../controllers/timeline.controllers.js";
import { getTrendingHashtags } from "../controllers/hashtags.controllers.js";

const timelineRoutes = Router();

timelineRoutes.get("/timeline", getPosts);


export default timelineRoutes;
