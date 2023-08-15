import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/user.schemas.js";
import { signUp } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/sign-up", validateSchema(userSchema), signUp);

export default router;