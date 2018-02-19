const initState = {
	isSignedIn: false
}

function Auth(state = initState, action) {
	switch (action.type) {
		case 'SIGNIN':
			return {...state, isSignedIn: true};
		case 'SIGNUP':
			return {...state, isSignedIn: true};
		case 'SIGNOUT':
			return {...state, isSignedIn: false};
		default:
			return state;
	}
}

export default Auth;
