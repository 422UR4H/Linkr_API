import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { createUserDB, getUserByEmailDB } from "../repositories/user.repository.js";

dotenv.config();


export async function signUp(req, res) {
    const { user_name, email, password, photo } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    try {
        const result = await createUserDB(user_name, email, hash, photo);
        if (result.rowCount === 0) {
            return res.status(409).send({ message: "E-mail já cadastrado!" });
        }
        res.sendStatus(201);
    } catch ({ message }) {
        res.status(500).send({ message });
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
    try {
        const result = await getUserByEmailDB(email);
        if (result.rowCount === 0) {
            return res.status(404).send({ message: "E-mail não cadastrado!" });
        }

        const user = result.rows[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({ message: "Senha incorreta!" });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || "test",
            { expiresIn: 24 * 60 * 60 }
        );
        res.send({ token });
    } catch ({ message }) {
        res.status(500).send({ message });
    }
}