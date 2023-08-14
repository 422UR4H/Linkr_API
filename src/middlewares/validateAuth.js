import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserByIdDB } from "../repositories/user.repository.js";

dotenv.config();

export default function validateAuth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", '');
    if (!token) return res.status(401).send({ message: "Access Denied!" });

    try {
        jwt.verify(token, process.env.JWT_SECRET || "test", async (error, decoded) => {
            if (error) return res.status(401).send({ message: "Access Denied!" });

            const user = (await getUserByIdDB(decoded.id))?.rows[0];
            if (!user) return res.sendStatus(404);

            delete user.senha;
            res.locals.user = user;
            return next();
        });
    } catch ({ message }) {
        res.status(500).send({ message });
    }
}