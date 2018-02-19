import LocalizedStrings from 'react-native-localization';


const string = new LocalizedStrings({
	en:{
// common
		Back: "Back",
// Auth
		SignIn: 'Sign In',
		SignUp: 'Sign Up',
		SignOut: 'Sign Out',
		Policy: 'Policy',
		ContinueWith: 'Continue With ...',
		ForgotPassword: 'Forgot Password?',
		EnterEmail: 'Your E-mail Address ...',
		EnterPassword: 'Your Password ...',
		AgreeWithPolicy: 'By using this app, you agree with our policy',
		signInWith: 'Or you can sign in with',
		EmailEmpty: 'Please enter your e-mail address',
		PasswordEmpty: 'Please enter your password',
		EmailInvalid: 'You have entered an invalid e-mail address',
//Home 
		Home: 'Home',
		Followed: 'Followed',
		Hot: 'Hot',
		Image: 'Image',
		Text: 'Text',
//Search
		Search: 'Search',
//Post 
		Post: 'Post',
//Inbox
		Inbox: 'Inbox',
//Profile
		Profile: 'Profile',
	}
});

export default string;
