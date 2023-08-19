import joi from "joi";

export const postSchema = joi.object({
    link: joi.string().uri().required(),
    description: joi.string(),
    hash_tags: joi.string()
});

export const editPostSchema = joi.object({
    id: joi.string().required(),
    description: joi.string(),
    hash_tags: joi.string()
});