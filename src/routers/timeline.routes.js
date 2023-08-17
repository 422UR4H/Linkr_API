import { Router } from "express";
// import validateAuth from "../middlewares/validateAuth";
import { getPosts } from "../controllers/timeline.controllers.js";
import validateAuth from "../middlewares/validateAuth.js";

const timelineRoutes = Router();

timelineRoutes.post("/like/:id");
timelineRoutes.get("/timeline",validateAuth, getPosts);

export default timelineRoutes;
