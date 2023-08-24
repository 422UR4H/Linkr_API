import { Router } from "express";
import { checkFollow, follow, getUserPageInfoRefactored, getUsersWithName, unfollow } from "../controllers/users.controller.js";
import validateAuth from "../middlewares/validateAuth.js";

const usersRouter = Router();

usersRouter.get("/users/id/:id", validateAuth, getUserPageInfoRefactored);
usersRouter.get("/users/name/:name", validateAuth, getUsersWithName);
usersRouter.post("/users/follow/:id", validateAuth, follow);
usersRouter.delete("/users/follow/:id", validateAuth, unfollow);
usersRouter.get("/users/follow/:id", validateAuth, checkFollow);

export default usersRouter;

// test protection rule