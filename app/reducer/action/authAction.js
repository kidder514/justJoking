import firebase from 'react-native-firebase';
import { toastAndroid } from './appAction';
import string from '../../localization/string';

export const signIn = () => {
	return {
		type: 'SIGNIN'
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
	return (dispatch) => {
		// create user in firebase auth
		firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
		.then((res) =>{
			// set default user data into firebase datanase
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
				follower:{},
				following:{},
				posts:{},
				whoCanSendMeMessages: 'anyone',
				autoPlayGif: false,
				autoPlayVideos: false,
				publicLocation: false
			}
			firebase.database().ref('users/' + userData.uid).set(userData, error => {
				if (error) {
					toastAndroid(errorCodeTranslate());
				} else {
					dispatch(signUp(userData));
					toastAndroid(string.ServerSignUpSuccess);			
				}
			});
		})
		.catch((err) => {
			toastAndroid(errorCodeTranslate(err.code));
		});
	}
}

export function singInWithEmailCall(email, password){
	return (dispatch) => {
		firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
		.then((res) => {
			toastAndroid(string.ServerSignInSuccess);			
			dispatch(signIn(res));
			console.log('res sign up');
			console.log(res);
		})
		.catch((err) => {
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