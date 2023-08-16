import { Router } from "express";
import { getUserInfo } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/user/:id", getUserInfo);

export default usersRouter;