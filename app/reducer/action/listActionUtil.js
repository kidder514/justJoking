
// can be used to process like or dislike array
export function likeArrayProcessor(likeArray, uid) {
    let isLiked = false;
    
    let tempArray = [];
    likeArray.forEach(userId => {
        if (userId === uid) {
            isLiked = true;
        } else {
            tempArray.push(userId);
        }
    });

    if (!isLiked) {
        tempArray.push(uid);
    }

    return tempArray;
}
