export function sortPostsByDate(posts) {
    return posts.slice().sort((postA, postB) => {
      const dateA = new Date(postA.is_repost ? postA.repost_created_at : postA.created_at);
      const dateB = new Date(postB.is_repost ? postB.repost_created_at : postB.created_at);
      return dateB - dateA;
    });
  }