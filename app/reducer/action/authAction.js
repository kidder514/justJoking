import firebase from 'react-native-firebase';
import { toastAndroid } from './appAction';
import { loadOn, loadEnd} from './uiAction';
import string from '../../localization/string';

export const signIn = (user) => {
	return {
		type: 'SIGNIN',
		payload: user
	};
};

export const signUp = (user) => {
	return {
		type: 'SIGNUP',
		payload: user
	};
};

export const signOut = () => {
	return {
		type: 'SIGNOUT'
	};
};

export function signUpWithEmailCall(name, email, password){
	return dispatch => {
		dispatch(loadOn());
		// create user in firebase auth
		firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
			.then(res => {
				// create user data
				const resUser = res.user._user;
				const userData = {
					email: email,
					name: name,
					emailVerified: resUser.emailVerified,
					creationTime: resUser.metadata.creationTime,
					lastSignInTime: resUser.metadata.lastSignInTime,
					photoURL: resUser.photoURL ? resUser.photoURL : "",
					providerId: resUser.providerId,
					uid: resUser.uid,
					tagline: '',
					whoCanSendMeMessages: 'anyone',
					autoPlayGif: false,
					autoPlayVideos: false,
					publicLocation: false
				}
				// set default user data into firebase firestore				
				firebase.firestore().doc('users/' + userData.uid).set(userData)
					.then(() => {
						dispatch(loadEnd());
						dispatch(signUp(userData));
						toastAndroid(string.ServerSignUpSuccess);								
					})	
					.catch(() => {
						dispatch(loadEnd());
						toastAndroid(string.ServerDatabaseError)
					});
			})
			.catch(err => {
				dispatch(loadEnd());
				toastAndroid(errorCodeTranslate(err.code))
			});
	}
}

export function singInWithEmailCall(email, password){
	return dispatch => {
		dispatch(loadOn());
		
		// get user from firebase auth
		firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
		.then(res => {
			const uid = res.user._user.uid;
			// load user data from firestore
			firebase.firestore().doc('users/' + uid).get()
				.then( doc => {
					dispatch(loadEnd());					
					dispatch(signIn(doc.data()));
					toastAndroid(string.ServerSignUpSuccess);								
				})	
				.catch(err => {
					dispatch(loadEnd());
					toastAndroid(string.ServerDatabaseError);
				});
		})
		.catch(err => {
			dispatch(loadEnd());
			toastAndroid(errorCodeTranslate(err.code));
		});
	}
}

function errorCodeTranslate(code = 'default'){
	switch (code) {
		case 'auth/invalid-email':
			return string.ServerEmailInvalid;
		case 'auth/user-disabled':
			return string.ServerUserDisabled;
		case 'auth/user-not-found':
		case 'auth/wrong-password':
			return string.ServerWrongEmailOrPassword;
		case 'auth/email-already-in-use':
			return string.ServerEmailExist;
		default:
			return string.Error;
	}
}