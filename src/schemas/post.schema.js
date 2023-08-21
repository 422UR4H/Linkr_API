import joi from "joi";

export const postSchema = joi.object({
    link: joi.string().uri().required(),
    description: joi.string(),
    hash_tags: joi.string()
});

export const editPostSchema = joi.object({
    description: joi.string(),
    hash_tags: joi.string()
});