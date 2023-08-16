import { clientDB } from "../database/db.connection.js";

export function createUserDB(user_name, email, password, photo) {
    return clientDB.query(
        `INSERT INTO users (user_name, email, password, photo)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *;`,
        [user_name, email, password, photo]
    );
}

export function getUserByEmailDB(email) {
    return clientDB.query(
        `SELECT * FROM users
        WHERE email = $1;`,
        [email]
    );
}

export function getUserByIdDB(id) {
    return clientDB.query(
        `SELECT * FROM users
        WHERE id = $1;`,
        [id]
    );
}

export function getUserByNickDB(nick) {
    return clientDB.query(
        `SELECT 1 FROM users
        WHERE nick = $1`,
        [nick]
    );
}

export function getUsersCountDB() {
    return clientDB.query(
        `SELECT COUNT(id) AS "usersAmount" FROM users`,
    );
}

export async  function getAllInfoFromUserId(userId) {
    try {
        const query = `
            SELECT
            json_build_object(
                'user_id', u.id,
                'user_name', u.user_name,
                'photo', u.photo,
                'user_posts', COALESCE(json_agg(
                    json_build_object(
                        'post_id', p.id,
                        'link', p.link,
                        'description', p.description,
                        'hash_tags', p.hash_tags,
                        'likes_count', p.likes_count,
                        'created_at', p.created_at
                    )
                ), '[]'::json)
            ) AS user_object
        FROM
            users u
        LEFT JOIN
            posts p ON u.id = p.owner_id
        WHERE
            u.id = $1
        GROUP BY
            u.id, u.user_name, u.photo;    
    `;

        const user = await clientDB.query(query,[userId]);
        
        return user.rows[0];
        
    } catch (error) {
        return null;
    }
}