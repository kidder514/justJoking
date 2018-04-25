
// can be used to process like or dislike array
// add uid to array if it does not exsit 
// otherwise remove it from array
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
