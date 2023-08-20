import { Router } from "express";
import { getUserInfo, getUserPageInfoRefactored, getUsersWithName } from "../controllers/users.controller.js";
import validateAuth from "../middlewares/validateAuth.js";

const usersRouter = Router();

usersRouter.get("/user/:id",validateAuth, getUserPageInfoRefactored);
usersRouter.get("/users/:name",validateAuth,getUsersWithName);

export default usersRouter;