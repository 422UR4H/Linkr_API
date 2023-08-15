import { Router } from "express";
import validateAuth from "../middlewares/validateAuth";
import { getPosts } from "../controllers/timeline.controllers";

const timelineRoutes = Router();

timelineRoutes.get("/timeline", validateAuth, getPosts);

export default timelineRoutes;
