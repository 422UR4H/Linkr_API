import { Router } from "express";
// import validateAuth from "../middlewares/validateAuth";
import { getPosts } from "../controllers/timeline.controllers.js";

const timelineRoutes = Router();

timelineRoutes.get("/timeline", getPosts);
timelineRoutes.post("/like/:id");

export default timelineRoutes;
