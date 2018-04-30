import { ToastAndroid } from 'react-native';
import { loadEnd, loadOn } from './uiAction';
import string from '../../localization/string';
import firebase from 'react-native-firebase';

export const initStart = () => {
	return {type: 'INIT_START'};
}

export const initEnd = () => {
	return {type: 'INIT_END'};
}

export const checkVersionStart = (data) => {
	return {type: 'CHECK_VERSION_START'};
}

export const checkVersion = (data) => {
	return {type: 'CHECK_VERSION', payload: data};
}

export const checkVersionEnd = (data) => {
	return {type: 'CHECK_VERSION_END'};
}

export function init() {
	return (dispatch, getState) => {
		dispatch(initStart());
		firebase.firestore().collection('admin').doc('config').get()
		.then( doc => {
			if (doc.exists) {
				dispatch(checkVersion(doc.data()));
			} else {
				toastAndroid(string.ServerCannotLoadSystemConfig);
			}
			dispatch(initEnd());			
		})	
		.catch(err => {
			dispatch(initEnd());
			toastAndroid(string.ServerCannotLoadSystemConfig);
		});
	}
}

export function checkVersionCall() {
	return (dispatch, getState) => {
		dispatch(loadOn(string.CheckingUpdate));
		dispatch(checkVersionStart());
		firebase.firestore().collection('admin').doc('config').get()
		.then( doc => {
			if (doc.exists) {
				dispatch(checkVersion(doc.data()));
			} else {
				dispatch(checkVersionEnd());
				toastAndroid(string.ServerCannotLoadSystemConfig);
			}
			dispatch(loadEnd());			
		})	
		.catch(err => {
			dispatch(loadEnd());
			dispatch(checkVersionEnd());
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