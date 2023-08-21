import { Router } from "express";
import { getTrendingHashtags } from "../controllers/hashtags.controllers.js";
import validateAuth from "../middlewares/validateAuth.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtags", validateAuth, getTrendingHashtags);

export default hashtagRouter;