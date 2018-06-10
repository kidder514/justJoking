
const initState = {
	isSignedIn: false,
	language: '',
}

function Auth(state = initState, action) {
	switch (action.type) {
		case 'SIGNIN':
		case 'SIGNUP':
			return {
				...state, 
				isSignedIn: true, 
				...action.payload,
			};
		case 'SIGNOUT':
			return { ...initState, language: state.language};
		case 'UPDATE_NAME':
			return { ...state, name: action.payload };
		case 'UPDATE_TAGLINE':
			return { ...state, tagline: action.payload };
		case 'UPDATE_PHOTO':
			return { ...state, photoURL: action.payload };
		case 'UPDATE_LANGUAGE':
			return { ...state, language: action.payload };
		default:
			return state;
	}
}

export default Auth;
