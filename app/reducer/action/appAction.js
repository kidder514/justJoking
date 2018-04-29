import { ToastAndroid } from 'react-native';
import { loadEnd, loadOn } from './uiAction';
import string from '../../localization/string';
import firebase from 'react-native-firebase';

export const checkVersion = (data) => {
	return {type: 'CHECK_VERSION', payload: data};
}

export function init() {
	return (dispatch, getState) => {
		dispatch(loadOn(string.LaunchingApp));
		firebase.firestore().collection('admin').doc('config').get()
		.then( doc => {
			if (doc.exists) {
				dispatch(checkVersion(doc.data()));
			} else {
				toastAndroid(string.ServerCannotLoadSystemConfig);
			}
			dispatch(loadEnd());					
		})	
		.catch(err => {
			dispatch(loadEnd());
			toastAndroid(string.ServerCannotLoadSystemConfig);
		});
	}
}

export function toastAndroid(str) {
	ToastAndroid.show(
		str,
		ToastAndroid.SHORT,
		ToastAndroid.BOTTOM
	);
}