import {
    addFollower,
    checkFollower,
    getAllInfoFromUserIdRefactored,
    getFollowersFromUserDB,
    getRepostsFromUser,
    getUsersFilterName,
    removeFollower,
} from "../repositories/user.repository.js";

export async function getUserPageInfoRefactored(req, res) {
    const { id } = req.params; // This is the user id that is in the url
    try {
        const user = await getAllInfoFromUserIdRefactored(id, res.locals.user.id);
        if (user == null) {
            return res.status(404).send(`No users found with id ${id}`);
        }
        const userReposts = await getRepostsFromUser(id,res.locals.user.id);
        user.user_posts = [...user.user_posts,...userReposts];
        return res.status(200).send(user);
    } catch ({ message }) {
        console.log(message);
        return res.status(500).send({ message });
    }
}

export async function getUsersWithName(req, res) {
    const { name } = req.params;
    try {
        const users = await getUsersFilterName(name,res.locals.user.id);
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

  export async function follow(req,res) {
    const follower = res.locals.user;
    const following = req.params;

    try {
        await addFollower(follower.id,following.id);
        return res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
  }

  export async function unfollow(req,res) {
    const follower = res.locals.user;
    const following = req.params;

    try {
        await removeFollower(follower.id, following.id);
        return res.sendStatus(201);        
    } catch (error) {
        res.status(500).send(error.message);
    }
  }

  export async function checkFollow(req,res) {
    const follower = res.locals.user;
    const following = req.params;

    try {
        const followers = await checkFollower(follower.id, following.id);
        if(followers.length > 0) {
            res.send(true);
        } else {
            res.send(false);
        } 
    } catch (error) {
        res.status(500).send(error.message);
    }
  }