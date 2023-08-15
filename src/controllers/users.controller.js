import { getAllInfoFromUserId } from "../repositories/user.repository.js";

export async function getUserInfo(req, res) {
    const { id } = req.params;

    try {
        const user = await getAllInfoFromUserId(id);
        if (user == null) {
            return res.status(404).send(`No users found with id ${id}`);
        }

        return res.status(200).send(user);
    } catch ({ message }) {
        return res.status(500).send({ message });
    }
}
