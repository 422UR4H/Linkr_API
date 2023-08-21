export default function sortByFrequency(hashtags) {
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