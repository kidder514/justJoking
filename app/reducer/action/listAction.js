import { ToastAndroid } from 'react-native';
import { loadOn, loadEnd } from './uiAction';
import firebase from 'react-native-firebase';
import string from '../../localization/string';


export const post = (post) => {
	return {
		type: 'POST',
		payload: post
	};
};


export function postCall(text, images){
	return dispatch => {
		dispatch(loadOn());
		dispatch(loadEnd());
		// image picker options
		// const options = {
		// 	title: string.ChooseYourProfilePicture,
		// 	quality: 0.7,
		// 	storageOptions: {
		// 		skipBackup: true,
		// 		cameraRoll: true
		// 	}
		// };

		// dispatch(loadOn());
		// let imagesTemp = [];
		// images.map(image => {
		// 	ImageResizer.createResizedImage(
		// 		'data:image/jpeg;base64,' + pickerRes.data, 300, 300, 'PNG', 65, 0
		// 	)
		// 	.then((resizerRes) => {	
	
		// 	})
		// 	.catch((err) => {
		// 		dispatch(loadEnd());
		// 		toastAndroid(string.ErrorResizingImage);				
		// 	}); 
		// });

		// ImageResizer.createResizedImage(
		// 	'data:image/jpeg;base64,' + pickerRes.data, 300, 300, 'PNG', 65, 0
		// )
		// .then((resizerRes) => {	

		// })
		// .catch((err) => {
		// 	dispatch(loadEnd());
		// 	toastAndroid(string.ErrorResizingImage);				
		// }); 
		// upload to firestorage
		// then
			// get image links
			// upload to database /post and /user
			// then
		// catch
	}
}