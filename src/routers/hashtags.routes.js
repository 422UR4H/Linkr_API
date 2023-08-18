import{Router} from "express"
import validateAuth from "../middlewares/validateAuth.js";
import { getPostsByHashtag } from "../controllers/hashtags.controllers.js";
import { getTrendingHashtags } from "../controllers/hashtags.controllers.js";

const hashtagRouter = Router()

hashtagRouter.get("/hashtags/:hashtag",  getPostsByHashtag)
hashtagRouter.get("/hashtags", getTrendingHashtags)

export default hashtagRouter