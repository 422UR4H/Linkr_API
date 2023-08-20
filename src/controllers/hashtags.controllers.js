import { getPostsByHashtagDB, getPostsByHashtagDBRefactored } from "../repositories/hashtags.repository.js"
import { getPostsDB } from "../repositories/timeline.repository.js";
import { getFirstLikeNamesFromPost, userHasLikedPost } from "../repositories/user.repository.js";
import urlMetadata from "../Utils/urlMetadata.js";

export async function getPostsByHashtag(req, res) {

    const {hashtag} = req.params

    try {

        const tredingPosts = await getPostsByHashtagDB(hashtag)

        const posts = tredingPosts.rows;
        for (const post of posts) {
          try {
            const metadata = (await urlMetadata(post.link)).data;
            post.metadata = 
            {
                description: metadata.description ? metadata.description : "", 
                title: metadata.title ? metadata.title : "",
                image: metadata.images &&  metadata.images[0] ? metadata.images[0] : ""
            };
              post.default_liked = await userHasLikedPost(post.id,res.locals.user.id);
              const names = await getFirstLikeNamesFromPost(post.id);
              post.first_liker_name = names.first_liker_name;
              post.second_liker_name = names.second_liker_name;
          } catch (err) {
              console.log(err.message);
          }
        }

        return res.send(posts)
        
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}

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
        let cleanHashtags = []
        let allHashtagsArray = []
        let allHashtagsStrings = ''
        const allPosts = await getPostsDB()
          
            
        allPosts.rows.forEach(post => {
            const hashtagString = post.hash_tags
            if (hashtagString) {
                allHashtagsStrings += hashtagString + ","
            }
        })

        allHashtagsArray = allHashtagsStrings.split(',').map(h => h.trim())

        const sortedHashtags = sortByFrequency(allHashtagsArray)
        const top10Hashtags = sortedHashtags.slice(0, 10);
        top10Hashtags.forEach( hash => {
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