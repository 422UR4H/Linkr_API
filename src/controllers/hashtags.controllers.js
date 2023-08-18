import { getPostsByHashtagDB } from "../repositories/hashtags.repository.js"
//import {getAllPostsDB} from "../repositories/hashtags.repository.js"
export async function getPostsByHashtag(req, res) {

    const {hashtag} = req.params

    try {
        const tredingPosts = await getPostsByHashtagDB(hashtag)

        return res.send(tredingPosts.rows)
        
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}

export async function getTrendingHashtags(req, res) {

    try {
        let cleanHashtags = []
        let allHashtagsArray = []
        let allHashtagsStrings = ''
        const allPosts = await getAllPostsDB()

        allPosts.rows.forEach(post => {
            const hashtagString = post.hash_tags
            if (hashtagString) {
                allHashtagsStrings += hashtagString + ","
            }
        })

        allHashtagsArray = allHashtagsStrings.split(',').map(h => h.trim())

        const sortedHashtags = sortByFrequency(allHashtagsArray)
        sortedHashtags.forEach( hash => {
            if(hash !== ""){
                cleanHashtags.push(hash.replace('#' , ""))
            }
            
        })

        return res.send(cleanHashtags)
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}

function sortByFrequency(hashtags) {
    const frequencyMap = {};

    hashtags.forEach(hashtag => {
      if (frequencyMap[hashtag]) {
        frequencyMap[hashtag]++;
      } else {
        frequencyMap[hashtag] = 1;
      }
    });

    const hashtagFrequencyPairs = Object.entries(frequencyMap);

    hashtagFrequencyPairs.sort((a, b) => b[1] - a[1]);

    const sortedHashtags = hashtagFrequencyPairs.map(pair => pair[0]);
  
    return sortedHashtags;
  }