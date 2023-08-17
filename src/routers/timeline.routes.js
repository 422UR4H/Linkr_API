import { Router } from "express";
// import validateAuth from "../middlewares/validateAuth";
import { getPosts } from "../controllers/timeline.controllers.js";

const timelineRoutes = Router();

timelineRoutes.get("/timeline", getPosts);
timelineRoutes.get("/timeline", getTrendingHashtags)

export default timelineRoutes;
