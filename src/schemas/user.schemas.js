import Joi from "joi";

export const userSchema = Joi.object({
    email: Joi.string().email().max(64).required(),
    user_name: Joi.string().min(3).max(64).required(),
    password: Joi.string().min(3).max(255).required(),
    photo: Joi.string().required()
});