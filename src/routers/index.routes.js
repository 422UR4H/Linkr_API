import { Router } from "express";
import authRouter from "./auth.routes.js";
import usersRouter from "./users.routes.js";
import timelineRoutes from "./timeline.routes.js";
import postRouter from "./post.routes.js";

const router = Router();

router.use(authRouter);
router.use(timelineRoutes);
router.use(usersRouter);
router.use(postRouter);

export default router;
