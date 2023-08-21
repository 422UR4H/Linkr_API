import { Router } from "express";
import { getUserPageInfoRefactored, getUsersWithName } from "../controllers/users.controller.js";
import validateAuth from "../middlewares/validateAuth.js";

const usersRouter = Router();

usersRouter.get("/users/:id", validateAuth, getUserPageInfoRefactored);
usersRouter.get("/users/:name", validateAuth, getUsersWithName);

export default usersRouter;