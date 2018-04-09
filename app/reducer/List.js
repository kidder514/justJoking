const initState = {
    hotList: [],
    imageList: [],
    textList: [],
    myList:[],
    isPosting: false,
    isLoading: false 
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
            return {...state, isLoading: true}
        case 'LOAD_LIST':
            return Object.assign({}, state, {isLoading: false}, reduceList(action.payload.name, action.payload.list));
        case 'LOAD_LIST_END':
            return { ...state, isLoading: false}
		default:
			return state;
	}
}

function reduceAddPost(myList, newPost) {
    myList.unshift(newPost)
    return myList;
}

function reduceList(listName = 'all', list){
    if (list && list.length <= 0) return {};
    switch (listName) {
        case 'all':
            return {hotList: list};
        case 'image':
            return {imageList: list};
        case 'text':
            return {textList: list};
        case 'mylist':
            return {myList: list};
        default:
            return {};
    }
}



export default List;
