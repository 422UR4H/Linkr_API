import { Router } from "express";
import { getUserPageInfoRefactored, getUsersWithName } from "../controllers/users.controller.js";
import validateAuth from "../middlewares/validateAuth.js";

const usersRouter = Router();

usersRouter.get("/users/id/:id", validateAuth, getUserPageInfoRefactored);
usersRouter.get("/users/name/:name", validateAuth, getUsersWithName);

export default usersRouter;