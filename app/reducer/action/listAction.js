import { toastAndroid } from './appAction';
import { loadOn, loadEnd } from './uiAction';
import firebase from 'react-native-firebase';
import string from '../../localization/string';
import ImageResizer from 'react-native-image-resizer';
import guid from '../../util/guid';

export const addPost = (post) => {
	return { type: 'ADD_POST', payload: post };
}

export const addPostStart = () => {
	return { type: 'ADD_POST_START' };
}

export const addPostEnd = () => {
	return { type: 'ADD_POST_END' };
}

export const loadList = (name, list, isUp, isMyList = false) => {
	return { type: 'LOAD_LIST', payload: {name, list, isUp, isMyList}};
}

export const loadListStart = () => {
	return { type: 'LOAD_LIST_START' };
}

export const loadListBottomStart = () => {
	return { type: 'LOAD_LIST_BOTTOM_START' };
}

export const loadListEnd = () => {
	return { type: 'LOAD_LIST_END' };
}

export const loadListBottomEnd = () => {
	return { type: 'LOAD_LIST_BOTTOM_END' };
}
 
export function imagePostCall(text, images){
	let imagesTemp = [];
	let imagesUploadTemp = [];
	return (dispatch, getState) => {
		dispatch(loadOn(string.LoadingCompressingImages));

		if (images.length > 0 ){
			images.map(image => {
				// 1. resize images
				ImageResizer.createResizedImage(image, 1280, 1280, 'JPEG', 25, 0)
				.then((resizeRes) => {
					imagesTemp.push(resizeRes.uri);
					if (imagesTemp.length === images.length) {
						// 2. upload all images to fire storage and retrieve their download URLS
						dispatch(loadOn(string.LoadingUploadingImages));
						imagesTemp.forEach((imageURI) => {
							firebase.storage().ref().child(getState().Auth.uid + '/'+ guid() +'.png').putFile(imageURI)
							.then(uploadRes => {
								imagesUploadTemp.push(uploadRes.downloadURL);

								if (imagesUploadTemp.length === imagesTemp.length) {

									// 3. upload new post data to database
									dispatch(loadOn(string.LoadingUploadingPost));
									const tempPost = {
										creationTime: new Date().getTime(),			
										author: getState().Auth.uid,
										authorName: getState().Auth.name,
										authorPhoto: getState().Auth.photoURL,
										postType: 'image',
										like:[],
										dislike: [],
										share: [],
										comment: [],
										images: imagesUploadTemp,
										text: text
									}
							
									firebase.firestore().collection('posts').add(tempPost)
									.then(ref =>{								
										dispatch(loadEnd());
										dispatch(addPost(tempPost));
										toastAndroid(string.AddPostSuccess);
									})
									.catch(err => {
										console.log(err);
										dispatch(loadEnd());		
										toastAndroid(string.ErrorAddPost);
									});
								}
							})
							.catch((err) => {
								dispatch(loadEnd());
								toastAndroid(string.ServerFailToUploadFile);
							});
						});
					}
				})
				.catch((err) => {
					console.log(err);
					dispatch(loadEnd());
					toastAndroid(string.ErrorResizingImage);				
				}); 
			});
		}
	}
}

export function textPostCall(text) {
	return (dispatch, getState) =>  {
		dispatch(loadOn(string.LoadingUploadingPost));
		dispatch(addPostStart());
		const tempPost = {
			creationTime: new Date().getTime(),			
			author: getState().Auth.uid,
			authorName: getState().Auth.name,
			authorPhoto: getState().Auth.photoURL,
			postType: 'text',
			like:[],
			dislike: [],
			share: [],
			tag: '',
			comment: [],
			text: text,
		}

		firebase.firestore().collection('posts').add(tempPost)
		.then(ref =>{
			dispatch(loadEnd());
			dispatch(addPost(tempPost));
			toastAndroid(string.AddPostSuccess);
		})
		.catch(err => {
			console.log(err);
			dispatch(loadEnd());
			dispatch(addPostEnd());
			toastAndroid(string.ErrorAddPost);
		});
	}
}

export function loadListUpCall(listType = 'all', offsetTime, isMyList = false) {
	return (dispatch, getState) => {
		dispatch(loadListStart());
		let listRef = firebase.firestore().collection('posts');
		if (listType !== 'all') {	
			listRef = listRef.where('postType', '==', listType);
		}

		if (isMyList) {
			listRef = listRef.where('author', '==', getState().Auth.uid);
		}

		if(offsetTime !== undefined) {
			listRef = listRef.where('creationTime', '>', offsetTime);
		}

		listRef.orderBy('creationTime', 'desc').limit(20).get()
		.then(snapshot => {
			let list = [];
			if (snapshot.size <= 0) {
				toastAndroid(string.ServerNoMorePost);
			} else {
				snapshot.forEach(doc => {
					list.push(doc.data());
				});
				dispatch(loadList(listType, list, true, isMyList));
				toastAndroid(string.ServerListLoaded);
			}
			dispatch(loadListEnd());		
		})
		.catch(error => {
			dispatch(loadListEnd());		
		})
	}
}

export function loadListDownCall(listType = 'all', offsetTime,  isMyList = false) {
	return (dispatch, getState) => {
		dispatch(loadListBottomStart());		
		let listRef = firebase.firestore().collection('posts')
		if (listType !== 'all') {
			listRef = listRef.where('postType', '==', listType);
		}

		if (isMyList) {
			listRef = listRef.where('author', '==', getState().Auth.name);
		}

		if(offsetTime !== undefined) {
			listRef = listRef.where('creationTime', '<', offsetTime);
		}

		listRef.orderBy('creationTime', 'desc').limit(20).get()
		.then(snapshot => {
			let list = [];
			if (snapshot.size <= 0) {
				toastAndroid(string.ServerNoMorePost);
			} else {
				snapshot.forEach(doc => {
					list.push(doc.data());
				});
				dispatch(loadList(listType, list, false, isMyList));
				toastAndroid(string.ServerListLoaded);
			}
		})
		.catch(error => {
			dispatch(loadListBottomEnd());		
		})
	}
}