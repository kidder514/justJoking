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
		ForgotPassword: 'Forgot Password, huh?',
		EnterEmail: 'Your E-mail Address ...',
		EnterPassword: 'Your Password ...',
		AgreeWithPolicy: 'By using this app, you agree with our policy',
		signInWith: 'Or you can sign in with',
		EmailEmpty: "Dont't forget your e-mail address",
		PasswordEmpty: 'Seems you forgot to enter a password',
		EmailInvalid: "uhm, This e-mail doesn't look right.",
		EnterName: 'Enter name or nick name ...',
		NameEmpty: 'Please give us a name, any name will do',
		ConfirmPassword: 'Retype your password again ...',
		ConfirmPasswordEmpty: 'please retype password here.',
		PasswordNotMatch: 'two passwords entered does not match, please retype again.',
		PasswordInvalid: 'password needs to contain at least one ahpabetic character, one number and no special characters. The whole password must be at least 8 characters long',
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
