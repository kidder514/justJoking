
const initState = {
	isSignedIn: false
}

function Auth(state = initState, action) {
	switch (action.type) {
		case 'SIGNIN':
			return {
				...state, 
				isSignedIn: true, 
				...action.payload.additionalUserInfo, 
				...action.payload.user._user
			};
		case 'SIGNUP':
			return {
				...state, 
				isSignedIn: true, 
				...action.payload, 
			};
		case 'SIGNOUT':
			return initState;
		default:
			return state;
	}
}

export default Auth;
