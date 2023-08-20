import{Router} from "express"
import validateAuth from "../middlewares/validateAuth.js";
import { getPostsByHashtag, getPostsByHashtagRefactored } from "../controllers/hashtags.controllers.js";
import { getTrendingHashtags } from "../controllers/hashtags.controllers.js";

const hashtagRouter = Router()

hashtagRouter.get("/hashtags/:hashtag", validateAuth, getPostsByHashtagRefactored)
hashtagRouter.get("/hashtags", validateAuth, getTrendingHashtags)

export default hashtagRouter