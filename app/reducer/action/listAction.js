import { toastAndroid } from './appAction';
import { loadOn, loadEnd } from './uiAction';
import firebase from 'react-native-firebase';
import string from '../../localization/string';
import ImageResizer from 'react-native-image-resizer';
import uuidv4 from 'uuid/v4';
import { likeArrayProcessor } from './listActionUtil';

export const addPost = (post) => {
	return { type: 'ADD_POST', payload: post };
}

export const addPostStart = () => {
	return { type: 'ADD_POST_START' };
}

export const addPostEnd = () => {
	return { type: 'ADD_POST_END' };
}

export const loadList = (name, list, isUp, isMyList = false, uid) => {
	return { type: 'LOAD_LIST', payload: {name, list, isUp, isMyList, uid}};
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
 
export const cleanMyList = () => {
	return { type: 'CLEAN_MY_LIST'};
}

export const cleanAuthorList = () => {
	return { type: 'CLEAN_AUTHOR_LIST'};
}

export const updateLike = (post) => {
	return { type: 'UPDATE_LIKE', payload: {post}}
}

export const updateDislike = (post) => {
	return { type: 'UPDATE_DISLIKE', payload: {post}}
}

export const loadCommentUpStart = () => {
	return { type: 'LOAD_COMMENT_UP_START' };
}

export const loadCommentUp = (comment) => {
	return { type: 'LOAD_COMMENT_UP', payload: comment };
}

export const loadCommentUpEnd = () => {
	return { type: 'LOAD_COMMENT_UP_END' };
}

export const loadCommentBottomStart = () => {
	return { type: 'LOAD_COMMENT_BOTTOM_START' };
}

export const loadCommentBottom = (comment) => {
	return { type: 'LOAD_COMMENT_BOTTOM', payload: comment };
}

export const loadCommentBottomEnd = () => {
	return { type: 'LOAD_COMMENT_BOTTOM_END' };
}

export const addCommentStart = () => {
	return { type: 'ADD_COMMENT_START'};
}

export const addComment = (comment) => {
	return { type: 'ADD_COMMENT', payload: comment};
}

export const addCommentEnd = () => {
	return { type: 'ADD_COMMENT_END'};
}

export const cleanComment = () => {
	return { type: 'CLEAN_COMMENT_LIST'};
}

export const commentUpdateLike = (post) => {
	return { type: 'COMMENT_UPDATE_LIKE', payload: post}
}

export const commentUpdateDislike = (post) => {
	return { type: 'COMMENT_UPDATE_DISLIKE', payload: post}
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
							firebase.storage().ref().child(getState().Auth.uid + '/'+ uuidv4() +'.png').putFile(imageURI)
							.then(uploadRes => {
								imagesUploadTemp.push(uploadRes.downloadURL);

								if (imagesUploadTemp.length === imagesTemp.length) {

									// 3. upload new post data to database
									dispatch(loadOn(string.LoadingUploadingPost));
									const tempPost = {
										id: uuidv4(),
										creationTime: new Date().getTime(),			
										author: getState().Auth.uid,
										authorName: getState().Auth.name,
										authorPhoto: getState().Auth.photoURL,
										authorTagline: getState().Auth.tagline,
										postType: 'image',
										like:[],
										dislike: [],
										share: 0,
										commentCount: 0,
										images: imagesUploadTemp,
										text: text
									}
							
									firebase.firestore().collection('posts').doc(tempPost.id).set(tempPost)
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
			id: uuidv4(),
			creationTime: new Date().getTime(),			
			author: getState().Auth.uid,
			authorName: getState().Auth.name,
			authorPhoto: getState().Auth.photoURL,
			authorTagline: getState().Auth.tagline,
			postType: 'text',
			like:[],
			dislike: [],
			share: [],
			tag: '',
			comment: [],
			text: text,
		}

		firebase.firestore().collection('posts').doc(tempPost.id).set(tempPost)
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

// if isMyList is passed in as true, that mean this will update mylist
// if there is a uid pass in, that mean this will update author list
export function loadListUpCall(listType = 'all', offsetTime, isMyList = false, uid) {
	return (dispatch, getState) => {
		dispatch(loadListStart());
		let listRef = firebase.firestore().collection('posts');
		if (listType !== 'all') {	
			listRef = listRef.where('postType', '==', listType);
		}

		if (isMyList) {
			dispatch(cleanMyList());
			listRef = listRef.where('author', '==', getState().Auth.uid);
		} else if (uid !== undefined && uid !== ''){
			dispatch(cleanAuthorList());			
			listRef = listRef.where('author', '==', uid);
		}

		if(offsetTime !== undefined) {
			listRef = listRef.where('creationTime', '>', offsetTime);
		}

		listRef.orderBy('creationTime', 'desc').limit(20).get()
		.then(snapshot => {
			let list = [];
			if (snapshot.size <= 0) {
				toastAndroid(string.ServerNoMorePost);
				dispatch(loadListEnd());					
			} else {
				snapshot.forEach(doc => {
					list.push(doc.data());
				});
				dispatch(loadList(listType, list, true, isMyList, uid));
				toastAndroid(string.ServerListLoaded);
			}
			dispatch(loadListEnd());		
		})
		.catch(error => {
			dispatch(loadListEnd());		
		})
	}
}

// if isMyList is passed in as true, that mean this will update mylist
// if there is a uid pass in, that mean this will update author list
export function loadListDownCall(listType = 'all', offsetTime,  isMyList = false, uid) {
	return (dispatch, getState) => {
		dispatch(loadListBottomStart());		
		let listRef = firebase.firestore().collection('posts')
		if (listType !== 'all') {
			listRef = listRef.where('postType', '==', listType);
		}

		if (isMyList) {
			listRef = listRef.where('author', '==', getState().Auth.uid);
		} else if (uid !== undefined && uid !== ''){		
			listRef = listRef.where('author', '==', uid);
		}

		if(offsetTime !== undefined) {
			listRef = listRef.where('creationTime', '<', offsetTime);
		}

		listRef.orderBy('creationTime', 'desc').limit(20).get()
		.then(snapshot => {
			let list = [];
			if (snapshot.size <= 0) {
				toastAndroid(string.ServerNoMorePost);
				dispatch(loadListBottomEnd());						
			} else {
				snapshot.forEach(doc => {
					list.push(doc.data());
				});
				dispatch(loadList(listType, list, false, isMyList));
				toastAndroid(string.ServerListLoaded);
			}
			dispatch(loadListBottomEnd());
		})
		.catch(error => {
			dispatch(loadListBottomEnd());	
		})
	}
}

export function likeCall(data){
	return (dispatch, getState) => {
		const docRef = firebase.firestore().collection('posts').doc(data.id);
		docRef.get()
		.then(snapshot => {
			if (snapshot.exists) {
				const like = likeArrayProcessor(snapshot.data().like, getState().Auth.uid);
				docRef.update({'like': like})
				.then(() => {
					let post = snapshot.data();
					post.like = like;
					dispatch(updateLike(post));		
				})
				.catch((error) => {
					console.log(error);
					toastAndroid(string.ServerNotAbleToUpdatePost);	
				})
			} else {
				toastAndroid(string.ServerPostDoesNotExist);	
			}
		})
		.catch(error => {
			toastAndroid(string.ServerPostDoesNotExist);
		})
	}
}

export function dislikeCall(data) {
	return (dispatch, getState) => {
		const docRef = firebase.firestore().collection('posts').doc(data.id);
		docRef.get()
		.then(snapshot => {
			if (snapshot.exists) {
				const dislike = likeArrayProcessor(snapshot.data().dislike, getState().Auth.uid);
				docRef.update({'dislike': dislike})
				.then(() => {
					let post = snapshot.data();
					post.dislike = dislike;
					dispatch(updateDislike(post));		
				})
				.catch((error) => {
					console.log(error);
					toastAndroid(string.ServerNotAbleToUpdatePost);	
				})
			} else {
				toastAndroid(string.ServerPostDoesNotExist);	
			}
		})
		.catch(error => {
			toastAndroid(string.ServerPostDoesNotExist);
		})
	}
}

export function loadCommentUpCall(id) {
	return (dispatch, getState) => {
		dispatch(cleanComment());
		dispatch(loadCommentUpStart());
		let listRef = firebase.firestore().collection('comments').doc(id).collection('comments');
		listRef.orderBy('creationTime', 'desc').limit(10).get()
		.then(snapshot => {
			if (snapshot.size <= 0) {
				toastAndroid(string.ServerNoMoreComment);
				dispatch(loadCommentUpEnd());					
			} else {
				let list = [];
				snapshot.forEach(doc => {
					list.push(doc.data());
				});
				dispatch(loadCommentUp(list));
				toastAndroid(string.ServerCommentLoaded);
			}
			dispatch(loadCommentUpEnd());		
		})
		.catch(error => {
			dispatch(loadCommentUpEnd());		
		})
	}
}

export function loadCommentBottomCall(id, offsetTime) {
	return (dispatch, getState) => {
		dispatch(loadCommentBottomStart());
		let listRef = firebase.firestore().collection('comments').doc(id).collection('comments');

		if(offsetTime !== undefined) {
			listRef = listRef.where('creationTime', '<', offsetTime);
		}

		listRef.orderBy('creationTime', 'desc').limit(10).get()
		.then(snapshot => {
			if (snapshot.size <= 0) {
				toastAndroid(string.ServerNoMoreComment);
				dispatch(loadCommentBottomEnd());					
			} else {
				let list = [];
				snapshot.forEach(doc => {
					list.push(doc.data());
				});
				dispatch(loadCommentBottom(list));
				toastAndroid(string.ServerCommentLoaded);
			}
			dispatch(loadCommentBottomEnd());		
		})
		.catch(error => {
			dispatch(loadCommentBottomEnd());		
		})
	}
}

export function commentLikeCall(data){
	return (dispatch, getState) => {
		const docRef = firebase.firestore().collection('comments').doc(data.id);
		docRef.get()
		.then(snapshot => {
			if (snapshot.exists) {
				const like = likeArrayProcessor(snapshot.data().like, getState().Auth.uid);
				docRef.update({'like': like})
				.then(() => {
					let post = snapshot.data();
					post.like = like;
					dispatch(commentUpdateLike(post));		
				})
				.catch((error) => {
					console.log(error);
					toastAndroid(string.ServerNotAbleToUpdatePost);	
				})
			} else {
				toastAndroid(string.ServerPostDoesNotExist);	
			}
		})
		.catch(error => {
			toastAndroid(string.ServerPostDoesNotExist);
		})
	}
}

export function commentDislikeCall(data) {
	return (dispatch, getState) => {
		const docRef = firebase.firestore().collection('comments').doc(data.id);
		docRef.get()
		.then(snapshot => {
			if (snapshot.exists) {
				const dislike = likeArrayProcessor(snapshot.data().dislike, getState().Auth.uid);
				docRef.update({'dislike': dislike})
				.then(() => {
					let post = snapshot.data();
					post.dislike = dislike;
					dispatch(commentUpdateDislike(post));		
				})
				.catch((error) => {
					console.log(error);
					toastAndroid(string.ServerNotAbleToUpdatePost);	
				})
			} else {
				toastAndroid(string.ServerPostDoesNotExist);	
			}
		})
		.catch(error => {
			toastAndroid(string.ServerPostDoesNotExist);
		})
	}
}

export function addCommentCall(data, comment) {
	return (dispatch, getState) => {
		dispatch(addCommentStart());		
		const docRef = firebase.firestore().collection('comments').doc(data.id).collection('comments');
		const commentData = {
			id: uuidv4(),
			postId: data.id,
			author: getState().Auth.uid,
			authorName: getState().Auth.name,
			authorPhoto: getState().Auth.photoURL,
			comment,
			like:[],
			dislike:[],
		}

		docRef.doc(commentData.id).set(commentData)
		.then(ref =>{
			firebase.firestore().collection('posts').doc(data.id).update({'comment': data.comment + 1})
			.then(() => {
				dispatch(addComment(commentData));
				toastAndroid(string.ServerAddCommentSuccess);
			})
			.catch((err) => {
				console.log(err);
				dispatch(addCommentEnd());
				toastAndroid(string.ServerAddCommentFail);
			})
		})
		.catch(err => {
			console.log(err);
			dispatch(addCommentEnd());
			toastAndroid(string.ServerAddCommentFail);
		});
	}
}