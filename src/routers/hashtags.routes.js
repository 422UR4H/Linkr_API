import{Router} from "express"
import validateAuth from "../middlewares/validateAuth.js";
import { getPostsByHashtag, getTrendingHashtags } from "../controllers/hashtags.controllers.js";

const hashtagRouter = Router()

hashtagRouter.get("/hashtags/:hashtag", getPostsByHashtag)


export default hashtagRouter