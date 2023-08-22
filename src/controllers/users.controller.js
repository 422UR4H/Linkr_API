import {
    getAllInfoFromUserIdRefactored,
    getFollowersFromUserDB,
    getUsersFilterName,
} from "../repositories/user.repository.js";

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

export async function getFollowersFromUser(userId) {
    try {
        const followers = await getFollowersFromUserDB(userId);
        return followers.length > 0;
      } catch (error) {
        console.log(error.message);
        return false;
      }
  }