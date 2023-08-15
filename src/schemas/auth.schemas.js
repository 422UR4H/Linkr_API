import Joi from "joi";

export const authSchema = Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(3).max(255).required()
});