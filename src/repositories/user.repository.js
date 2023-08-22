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

export async function getAllInfoFromUserIdRefactored(pageUserId,userInThePageId) {
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
                        'created_at', p.created_at,
                        'first_liker_name', COALESCE(fl.user_name, ''),
                        'second_liker_name', COALESCE(sl.user_name, ''),
                        'default_liked', 
                            CASE 
                                WHEN EXISTS (
                                    SELECT 1 FROM likes WHERE liked_post_id = p.id AND like_owner_id = $2
                                ) THEN TRUE 
                                ELSE FALSE 
                            END
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
            LEFT JOIN users fl ON fl.id = (
                SELECT like_owner_id FROM likes 
                WHERE liked_post_id = p.id
                ORDER BY created_at ASC
                LIMIT 1
            )
            LEFT JOIN users sl ON sl.id = (
                SELECT like_owner_id FROM likes 
                WHERE liked_post_id = p.id
                ORDER BY created_at ASC
                LIMIT 1 OFFSET 1
            )
            WHERE u.id = $1
            GROUP BY u.id, u.user_name, u.photo;
        `;

        const user = await clientDB.query(query, [pageUserId,userInThePageId]);
        if (user.rows[0].user_object.user_posts.length == 1 && user.rows[0].user_object.user_posts[0].post_id == null) {
            user.rows[0].user_object.user_posts = [];
        }
        user.rows[0].user_object.user_posts = user.rows[0].user_object.user_posts.slice(0,19);
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
            ORDER BY created_at
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

export async function getUsersFilterName(name,userId) {
    try {
        const query = `
        SELECT 
        users.id, 
        users.user_name, 
        users.photo,
        CASE 
            WHEN followers.follower IS NOT NULL THEN TRUE 
            ELSE FALSE 
        END AS following
        FROM users
        LEFT JOIN followers ON users.id = followers.following AND followers.follower = $1
        WHERE users.user_name ILIKE $2;
        `;
        const result = await clientDB.query(query, [userId,`%${name.trim()}%`]);
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

export async function getFollowersFromUserDB(userId) {
    try {
      const query = `
        SELECT following
        FROM followers
        WHERE following = $1;`;
      const result = await clientDB.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }