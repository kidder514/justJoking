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
            return Object.assign({}, 
                state, 
                { isLoading: false }, 
                reduceList(action.payload, state.List)
            );
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

function reduceLoadList(payload, stateList){
    const { list, name, isTop } = payload;
    if (list && list.length <= 0) return {};
    switch (name) {
        case 'all':
            return { hotList: isTop ? handleListTop(list, stateList):handleListBottom(list, stateList)};
        case 'image':
            return { imageList: isTop ? handleListTop(list, stateList):handleListBottom(list, stateList) };
        case 'text':
            return { textList: isTop ? handleListTop(list, stateList):handleListBottom(list, stateList) };
        case 'mylist':
            return { myList: isTop ? handleListTop(list, stateList):handleListBottom(list, stateList) };
        default:
            return { hotList: isTop ? handleListTop(list, stateList):handleListBottom(list, stateList) };
    }
}

function handleListTop(newList, stateList) {
    if (newList.length >= 20) {
        // if length >= 20, replace the old list with new list
        return newList;
    } else {
        // if length < 20, add to the list first
        // then only keep at most 100 element in the list 
        let list = newList.concat(stateList)
        if (list.length <= 100) {
            return list
        } else {
            list.splice(100);
            return list
        }
    }
}

function handleListbutton(newList, stateList) {
    let list = stateList.concat(newList)
    if (list.length <= 100) {
        return list
    } else {
        list.splice(0, months.length - 100)
        return list
    }
}



export default List;
