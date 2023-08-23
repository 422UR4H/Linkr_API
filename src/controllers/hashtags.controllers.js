import sortByFrequency from "../scripts/sortByFrequency.js";
import { getPostsHashtags } from "../repositories/post.repository.js";

export async function getTrendingHashtags(req, res) {
    try {
        let cleanHashtags = [];
        let allHashtagsArray = [];
        let allHashtagsStrings = '';
        const allPosts = await getPostsHashtags();

        allPosts.rows.forEach(post => {
            const hashtagString = post.hash_tags;
            if (hashtagString && hashtagString !== '') {
                allHashtagsStrings += hashtagString + ",";
            }
        });

        allHashtagsArray = allHashtagsStrings.split(',').map(h => h.trim());
        allHashtagsArray.forEach(hash => {
            if ( hash && hash !== "" && hash !== ''){
                cleanHashtags.push(hash.replace('#', ""));
            }
        });
        const sortedHashtags = sortByFrequency(cleanHashtags);
        res.send(sortedHashtags.slice(0, 10));
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
}