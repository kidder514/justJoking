
const initState = {
	isSignedIn: false,
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
			return initState;
		case 'UPDATE_NAME':
			return { ...state, name: action.payload };
		case 'UPDATE_TAGLINE':
			return { ...state, tagline: action.payload };
		default:
			return state;
	}
}

export default Auth;
