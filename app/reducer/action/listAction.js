import { toastAndroid } from './appAction';
import { loadOn, loadEnd } from './uiAction';
import firebase from 'react-native-firebase';
import string from '../../localization/string';
import ImageResizer from 'react-native-image-resizer';

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
	
	return dispatch => {
		dispatch(loadOn(string.LoadingCompressingImages));
		// 1. make the postCall api call working

		// 2. to test this
		// 以1280为界限
		// 宽高均 <= 1280，图片尺寸大小保持不变
		// 宽高均 > 1280 && 宽高比 > 2，取较小值等于1280，较大值等比例压缩            
		// 宽或高 > 1280 && 宽高比 <= 2，取较大值等于1280，较小值等比例压缩
		// 宽或高 > 1280 && 宽高比 > 2 && 宽或高 < 1280，图片尺寸大小保持不变
		
		// 3. if works fine 
		// fork the react-native-image-resizer and create your own version
		if (images.length > 0 ){
			images.map(image => {
				ImageResizer.createResizedImage(image, 1280, 1280, 'PNG',50, 0)
				.then((res) => {
					imagesTemp.push(res.path);
					if (imagesTemp.length === images.length) {
						dispatch(loadOn(string.LoadingUploadingImages));
						dispatch(loadEnd());
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
