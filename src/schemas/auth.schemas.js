import Joi from "joi";

export const authSchema = Joi.object({
    email: Joi.string().email().max(64).required(),
    password: Joi.string().min(3).max(32).required()
});