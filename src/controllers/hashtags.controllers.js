import sortByFrequency from "../scripts/sortByFrequency.js";
import { getPostsByHashtagDBRefactored, getPostsDB } from "../repositories/post.repository.js";


export async function getPostsByHashtagRefactored(req, res) {
    const {hashtag} = req.params;

    try {
        const tredingPosts = await getPostsByHashtagDBRefactored(hashtag,res.locals.user.id);
        return res.send(tredingPosts.rows);
        
    } catch (error) {
        console.log(error.message)
        return res.sendStatus(500)
    }
}

export async function getTrendingHashtags(req, res) {
    try {
        let cleanHashtags = [];
        let allHashtagsArray = [];
        let allHashtagsStrings = '';
        const allPosts = await getPostsDB();

        allPosts.rows.forEach(post => {
            const hashtagString = post.hash_tags;
            if (hashtagString) {
                allHashtagsStrings += hashtagString + ",";
            }
        });
        allHashtagsArray = allHashtagsStrings.split(',').map(h => h.trim());

        const sortedHashtags = sortByFrequency(allHashtagsArray);
        const top10Hashtags = sortedHashtags.slice(0, 10);

        top10Hashtags.forEach(hash => {
            if (hash !== "") cleanHashtags.push(hash.replace('#', ""));
        });
        res.send(cleanHashtags);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
}