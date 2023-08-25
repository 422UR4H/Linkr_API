import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import {
    createComment,
    getCommentsByPost,
    getCommentsCounts
} from "../controllers/comments.controllers.js";

const router = Router();

router.post("/comments/:post_id", validateAuth, createComment);
router.get("/comments/:post_id", validateAuth, getCommentsByPost);
router.get("/comments-counts", validateAuth, getCommentsCounts);
// router.delete("/users/follow/:id", validateAuth, unfollow);

export default router;