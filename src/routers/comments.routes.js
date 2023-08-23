import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { createComment } from "../controllers/comments.controllers.js";

const router = Router();

router.post("/comments/:post_id", validateAuth, createComment);
// router.get("/users/id/:id", validateAuth, getUserPageInfoRefactored);
// router.get("/users/name/:name", validateAuth, getUsersWithName);
// router.delete("/users/follow/:id", validateAuth, unfollow);

export default router;