const initState = {
	isSignedIn: false,
	id: '1921ije1j11',
	photo: 'https://independentaustralia.net/_lib/slir/w400/i/profiles/profile-765.jpg',
	name: 'James Akapala',
	followers: [1,2,3,4,5,6,7,8,9,9,8,71,35,2],
	following: [3,5,6,7,8,11,233,44,555],
	postCount: 35,
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
