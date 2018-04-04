import { toastAndroid } from './appAction';
import { loadOn, loadEnd } from './uiAction';
import firebase from 'react-native-firebase';
import string from '../../localization/string';
import ImageResizer from 'react-native-image-resizer';
import guid from '../../util/guid';

export const addPost = (post) => {
	return {
		type: 'ADD_POST',
		payload: post
	};
}

export const addPostStart = () => {
	return { type: 'ADD_POST_START' };
}

export function imagePostCall(text, images){
	let imagesTemp = [];
	let imagesUploadTemp = [];
	return (dispatch, getState) => {
		dispatch(loadOn(string.LoadingCompressingImages));

		if (images.length > 0 ){
			images.map(image => {
				// 1. resize images
				//
				ImageResizer.createResizedImage(image, 1280, 1280, 'JPEG', 25, 0)
				.then((resizeRes) => {
					console.log('resize image');					
					console.log(resizeRes.size);
					
					imagesTemp.push(resizeRes.uri);
					if (imagesTemp.length === images.length) {
						console.log('upload to fire storage');
						// 2. upload all images to fire storage and retrieve their download URLS
						dispatch(loadOn(string.LoadingUploadingImages));
						imagesTemp.forEach((imageURI) => {
							firebase.storage().ref().child(getState().Auth.uid + '/'+ guid() +'.png').putFile(imageURI)
							.then(uploadRes => {
								imagesUploadTemp.push(uploadRes.downloadURL);

								if (imagesUploadTemp.length === imagesTemp.length) {

									// 3. upload new post data to database
									let tempImageObject = {};

									imagesUploadTemp.forEach((image) => {
										tempImageObject[image] = true;
									})

									dispatch(loadOn(string.LoadingUploadingPost));
									const tempPost = {
										creationTime: new Date().getTime(),			
										author: getState().Auth.uid,
										authorName: getState().Auth.name,
										postType: 'text',
										like:{},
										unlike: {},
										share: {},
										comment: {},
										images:tempImageObject,
										text: text
									}
							
									firebase.firestore().collection('posts').add(tempPost)
									.then(ref =>{
										console.log('upload to server');
								
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
			postType: 'text',
			like:{},
			unlike: {},
			share: {},
			comment: {},
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
			toastAndroid(string.ErrorAddPost);
		});
	}
}
