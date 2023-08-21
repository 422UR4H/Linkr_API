import { Router } from "express";
import { deleteLike, postLike } from "../controllers/timeline.controllers.js";
import validateAuth from "../middlewares/validateAuth.js";

const timelineRoutes = Router();

timelineRoutes.post("/like/:id", validateAuth, postLike);
timelineRoutes.delete("/dislike/:id", validateAuth, deleteLike);

export default timelineRoutes;
