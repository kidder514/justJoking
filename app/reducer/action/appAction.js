import { ToastAndroid } from 'react-native';
import { loadEnd } from './uiAction';

export function init() {
	return dispatch => {
		dispatch(loadEnd());
	}
}

export function toastAndroid(str) {
	ToastAndroid.show(
		str,
		ToastAndroid.SHORT,
		ToastAndroid.BOTTOM
	);
}