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

export async function getAllInfoFromUserId(userId) {
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
                            'likes_count', COALESCE(l.likes_count, 0),
                            'created_at', p.created_at
                        )
                    ), '[]'::json)
                ) AS user_object
            FROM users u
            LEFT JOIN posts p ON u.id = p.owner_id
            LEFT JOIN (
                SELECT p.id AS post_id, COUNT(l.id) AS likes_count
                FROM posts p
                LEFT JOIN likes l ON p.id = l.liked_post_id
                GROUP BY p.id
            ) l ON p.id = l.post_id
            WHERE u.id = $1
            GROUP BY u.id, u.user_name, u.photo;
        `;

        const user = await clientDB.query(query, [userId]);
        if (user.rows[0].user_object.user_posts.length == 1 && user.rows[0].user_object.user_posts[0].post_id == null) {
            user.rows[0].user_object.user_posts = [];
        }

        // first_liker_name={post.first_liker_name}
        // second_liker_name={post.second_liker_name}

        return user.rows[0].user_object;

    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function getFirstLikeNamesFromPost(postId) {
    try {
        const query = `
        SELECT users.user_name
        FROM likes
        JOIN users ON likes.like_owner_id = users.id
        WHERE likes.liked_post_id = $1
        LIMIT 2;`;

        const names = await clientDB.query(query, [postId]);
        return {
            first_liker_name: names.rows[0] ? names.rows[0].user_name : "",
            second_liker_name: names.rows[1] ? names.rows[1].user_name : ""
        };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function getUsersFilterName(name) {
    try {
        const query = `SELECT id, user_name, photo FROM users
        WHERE user_name ILIKE $1`;
        const result = await clientDB.query(query, [`%${name.trim()}%`]);
        return result.rows;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function userHasLikedPost(postId, userId) {
    try {
        const query = 'SELECT * FROM likes WHERE like_owner_id = $1 AND liked_post_id = $2';
        const result = await clientDB.query(query, [userId, postId]);
        return result.rows.length > 0;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}