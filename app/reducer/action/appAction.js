import { ToastAndroid } from 'react-native';

export function toastAndroid(str) {
	ToastAndroid.show(
		str,
		ToastAndroid.SHORT,
		ToastAndroid.BOTTOM
	);
}