import { likeArrayProcessor } from './action/listActionUtil';

const initState = {
    hotList: [],
    imageList: [],
    textList: [],
    myList:[],
    authorList: [],
    isPosting: false,
    isLoading: false,
    isBottomLoading: false
}

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
        case 'UPDATE_DISLIKE':
            return Object.assign({}, state, reduceUpdateLikeDislike(action.payload.post, state));
		default:
			return state;
	}
}

function reduceAddPost(myList, newPost) {
    myList.unshift(newPost)
    return myList;
}

function reduceLoadList(payload, stateList){
    const { list, name, isUp, isMyList, uid } = payload;
    if (list && list.length <= 0) return {};
    switch (name) {
        case 'all':
            if (isMyList) {
                return { myList: isUp ? handleListUp(list, stateList.myList):handleListDown(list, stateList.myList)};
            } else if (uid !== undefined && uid !== ''){
                return { authorList: isUp ? handleListUp(list, stateList.authorList):handleListDown(list, stateList.authorList)};
            } else {
                return { hotList: isUp ? handleListUp(list, stateList.hotList):handleListDown(list, stateList.hotList)};
            }
        case 'image':
            return { imageList: isUp ? handleListUp(list, stateList.imageList):handleListDown(list, stateList.imageList) };
        case 'text':
            return { textList: isUp ? handleListUp(list, stateList.textList):handleListDown(list, stateList.textList) };
        case 'mylist':
            return { myList: isUp ? handleListUp(list, stateList.myList):handleListDown(list, stateList.myList) };
        default:
            return { hotList: isUp ? handleListUp(list, stateList.hotList):handleListDown(list, stateList.hotList) };
    }
}

function handleListUp(newList, stateList) {
    if (newList.length >= 20) {
        // if length >= 20, replace the old list with new list
        return newList;
    } else {
        // if length < 20, add to the list first
        // then only keep at most 50 element in the list 
        let list = newList.concat(stateList)
        if (list.length <= 50) {
            return list
        } else {
            list.splice(50);
            return list
        }
    }
}

function handleListDown(newList, stateList) {
    let list = stateList.concat(newList)
    if (list.length <= 50) {
        return list
    } else {
        list.splice(0, months.length - 50)
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
            newList.push(post);
        } else {
            newList.push(tempItem)
        }
    });

    return newList;
}

export default List;
