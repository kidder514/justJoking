import { likeArrayProcessor } from './action/listActionUtil';
import { clone } from '../util/util';
import { ITEM_NUMBER_EACH_LOAD } from './action/listAction';

const initState = {
    hotList: [],
    imageList: [],
    textList: [],
    myList:[],
    authorList: [],
    commentList:[],
    isPosting: false,
    isLoading: false,
    isBottomLoading: false,
    isCommentLoading: false,
    isCommentAdding: false,
    isCommentBottomLoading: false,
}

const DISPLAY_LIMIT = 30;

function List(state = initState, action) {
	switch (action.type) {
        case 'ADD_POST_START':
            return {...state, isPosting: true};
        case 'ADD_POST':
            return {...state, myList: reduceAddPost(state.myList, action.payload), isPosting: false};
        case 'ADD_POST_END':
            return {...state, isPosting: false};
        case 'LOAD_LIST_START':
            return {...state, isLoading: true};
        case 'LOAD_LIST_BOTTOM_START':
            return {...state, isBottomLoading: true};
        case 'LOAD_LIST':
            return Object.assign({},
                state, 
                { 
                    isLoading: false,
                    isBottomLoading: false
                }, 
                reduceLoadList(action.payload, state)
            );
        case 'LOAD_LIST_END':
            return { ...state, isLoading: false}
        case 'LOAD_LIST_BOTTOM_END':
            return { ...state, isBottomLoading: false};
        case 'CLEAN_MY_LIST':
            return { ...state, myList: []};
        case 'CLEAN_AUTHOR_LIST':
            return { ...state, authorList: []};    
        case 'UPDATE_LIKE':
            return Object.assign({}, state, reduceUpdateLikeDislike(action.payload.post, state));
        case "LOAD_COMMENT_UP_START":
            return { ...state, isCommentLoading: true};
        case "LOAD_COMMENT_UP":
            return { ...state, isCommentLoading: false, commentList: action.payload};
        case "LOAD_COMMENT_UP_END":
            return { ...state, isCommentLoading: false};
        case "LOAD_COMMENT_BOTTOM_START":
            return { ...state, isCommentBottomLoading: true};
        case "LOAD_COMMENT_BOTTOM":
            return { ...state, isCommentBottomLoading: false, commentList: action.payload};
        case "LOAD_COMMENT_BOTTOM_END":
            return { ...state, isCommentBottomLoading: false};
        case "ADD_COMMENT_START":
            return { ...state, isCommentAdding: true};
        case "ADD_COMMENT":
            return Object.assign({}, 
                state, 
                reduceAddComment(state.commentList, action.payload), 
                reduceUpdateComment(action.payload.postId, state),
                { isCommentAdding: false }
            )
        case "ADD_COMMENT_END":
            return { ...state, isCommentAdding: false}
        case "CLEAN_COMMENT_LIST":
            return { ...state, commentList: []};
        case "COMMENT_UPDATE_LIKE":
            return { ...state, commentList: updateListLikeDislike(action.payload, state.commentList)};
		default:
			return state;
	}
}

function reduceAddComment(commentList, commentItem) {
    const commentListTemp = commentList;
    commentListTemp.push(commentItem);
    return {commentList: commentListTemp};
}

function reduceAddPost(myList, newPost) {
    const postTemp = newPost.postType === 'image' ? sortImage(clone(newPost)) : clone(newPost);
    
    myList.unshift(postTemp)
    return myList;
}

function reduceLoadList(payload, stateList){
    const { list, name, isUp, isMyList, uid } = payload;
    if (list && list.length <= 0) return {};

    const imageSortedList = sortImageList(list);

    switch (name) {
        case 'all':
            if (isMyList) {
                return { myList: isUp ? handleListUp(imageSortedList, stateList.myList):handleListDown(imageSortedList, stateList.myList)};
            } else if (uid !== undefined && uid !== ''){
                return { authorList: isUp ? handleListUp(imageSortedList, stateList.authorList):handleListDown(imageSortedList, stateList.authorList)};
            } else {
                return { hotList: isUp ? handleListUp(imageSortedList, stateList.hotList):handleListDown(imageSortedList, stateList.hotList)};
            }
        case 'image':
            return { imageList: isUp ? handleListUp(imageSortedList, stateList.imageList):handleListDown(imageSortedList, stateList.imageList) };
        case 'text':
            return { textList: isUp ? handleListUp(imageSortedList, stateList.textList):handleListDown(imageSortedList, stateList.textList) };
        case 'mylist':
            return { myList: isUp ? handleListUp(imageSortedList, stateList.myList):handleListDown(imageSortedList, stateList.myList) };
        default:
            return { hotList: isUp ? handleListUp(imageSortedList, stateList.hotList):handleListDown(imageSortedList, stateList.hotList) };
    }
}

function handleListUp(newList, stateList) {
    if (newList.length >= ITEM_NUMBER_EACH_LOAD) {
        // if length >= 20, replace the old list with new list
        return newList;
    } else {
        // if length < 20, add to the list first
        // then only keep at most 50 element in the list 
        let list = newList.concat(stateList)
        if (list.length <= DISPLAY_LIMIT) {
            return list
        } else {
            list.splice(DISPLAY_LIMIT);
            return list
        }
    }
}

function handleListDown(newList, stateList) {
    let list = stateList.concat(newList)
    if (list.length <= DISPLAY_LIMIT) {
        return list
    } else {
        list.splice(0, list.length - DISPLAY_LIMIT)
        return list
    }
}

function reduceUpdateLikeDislike(post, state) {
    const hotList = updateListLikeDislike(post, state.hotList);
    const imageList = updateListLikeDislike(post, state.imageList);
    const textList = updateListLikeDislike(post, state.textList);
    const myList = updateListLikeDislike(post, state.myList);
    const authorList = updateListLikeDislike(post, state.authorList);
    return {hotList, imageList, textList, myList, authorList};
}

function updateListLikeDislike(post, list) {
    let newList = [];
    list.forEach(item => {
        let tempItem = item;
        if (tempItem.id === post.id) {
            if (item.postType !== 'image'){
                newList.push(post)
            } else {
                newList.push(sortImage(post));
            }
        } else {
            newList.push(tempItem)
        }
    });

    return newList;
}

function reduceUpdateComment(postId, state) {
    const hotList = upateListComment(postId, state.hotList);
    const imageList = upateListComment(postId, state.imageList);
    const textList = upateListComment(postId, state.textList);
    const myList = upateListComment(postId, state.myList);
    const authorList = upateListComment(postId, state.authorList);
    return {hotList, imageList, textList, myList, authorList};
}

function upateListComment(postId, list) {
    let newList = list;
    list.forEach(item => {
        let tempItem = item;
        if (item.id === postId) {
            tempItem.commentCount++;
        }
        newList.push(tempItem);
    });

    return newList;
}

function sortImageList(list) {
    let newList = [];
    list.forEach(item => {
        if (item.postType !== 'image'){
            newList.push(item)
        } else {
            newList.push(sortImage(item));
        }
    })

    return newList;
}

function sortImage(post) {
    let postTemp = clone(post);
    let images = [];
    let thumbnails = [];
    
    for (let i = 0; i < 9; i++) {
        if(postTemp.images['image' + i] !== undefined && postTemp.thumbnails['image' + i] !== undefined ) {
            images.push(postTemp.images['image' + i]);
            thumbnails.push(postTemp.thumbnails['image' + i]);
        } else {
            break;
        }
    }
    postTemp.images = images;
    postTemp.thumbnails = thumbnails;
    
    return postTemp;
}

export default List;
