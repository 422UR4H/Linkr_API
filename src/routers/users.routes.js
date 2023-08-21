import { Router } from "express";
import { getUserInfo, getUsersWithName } from "../controllers/users.controller.js";
import validateAuth from "../middlewares/validateAuth.js";

const usersRouter = Router();

usersRouter.get("/users/:id", validateAuth, getUserInfo);
usersRouter.get("/users/:name", validateAuth, getUsersWithName);

export default usersRouter;