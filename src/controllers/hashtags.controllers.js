import {db} from "../database/db.connection.js"

export async function getPostsByHashtag(req, res){

    const {name} = req.body
    try {

        const AllPostsHashtags = await db.query(`SELECT hash_tags FROM posts;`)
       // AllPostsHashtags.rows.map()

        const getPosts = await db.query(`SELECT * FROM posts WHERE hash_tags=$1;`, [name])

        res.send(AllPostsHashtags.rows)

    } catch (error) {
        console.log(error.message)
    }
}

export async function getTrendingHashtags(req , res){
    try {
        const getTrendings = await db.query(`SELECT * FROM posts WHERE hash_tags > 0;`)
    } catch (error) {
        console.log(error.message)
    }
}