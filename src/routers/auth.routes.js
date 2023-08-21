import { Router } from "express";
import { userSchema } from "../schemas/user.schemas.js";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { authSchema } from "../schemas/auth.schemas.js";
import validateSchema from "../middlewares/validateSchema.js";

const router = Router();

router.post("/sign-up", validateSchema(userSchema), signUp);
router.post("/sign-in", validateSchema(authSchema), signIn);

export default router;