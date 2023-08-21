import urlMetadata from "../Utils/urlMetadata.js";
import {
    getAllInfoFromUserId,
    getAllInfoFromUserIdRefactored,
    getFirstLikeNamesFromPost,
    getUsersFilterName,
    userHasLikedPost
} from "../repositories/user.repository.js";


export async function getUserInfo(req, res) {
    const { id } = req.params;
    try {
        const user = await getAllInfoFromUserId(id);
        if (user == null) {
            return res.status(404).send(`No users found with id ${id}`);
        }

        for (const post of user.user_posts) {
            try {
                const metadata = (await urlMetadata(post.link)).data;
                post.metadata =
                {
                    description: metadata.description ? metadata.description : "",
                    title: metadata.title ? metadata.title : "",
                    image: metadata.images && metadata.images[0] ? metadata.images[0] : ""
                };
                post.default_liked = await userHasLikedPost(post.post_id, res.locals.user.id);
                const names = await getFirstLikeNamesFromPost(post.post_id);
                post.first_liker_name = names.first_liker_name;
                post.second_liker_name = names.second_liker_name;
            } catch (err) {
                console.log(err);
            }
        }
        res.status(200).send(user);
    } catch ({ message }) {
        console.log(message);
        res.status(500).send({ message });
    }
}

export async function getUserPageInfoRefactored(req, res) {
    const { id } = req.params; // This is the user id that is in the url
    try {
        const user = await getAllInfoFromUserIdRefactored(id, res.locals.user.id);
        if (user == null) {
            return res.status(404).send(`No users found with id ${id}`);
        }
        return res.status(200).send(user);
    } catch ({ message }) {
        console.log(message);
        return res.status(500).send({ message });
    }
}

export async function getUsersWithName(req, res) {
    const { name } = req.params;
    try {
        const users = await getUsersFilterName(name);
        if (users == null) {
            return res.status(404).send(`No users found with id ${name}`);
        }
        res.status(200).send(users);
    } catch ({ message }) {
        res.status(500).send({ message });
    }
}
