import LocalizedStrings from 'react-native-localization';


const string = new LocalizedStrings({
	en:{
// common
		Back: "Back",
		Thousand: 'K',
		Million: 'M',
		Billion: 'B',
		Copy: 'Copy',
		Submit: 'Submit',
		FeatureCommingSoon: 'This feature is comming soon',
		Error: 'Error',
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
		ServerSignUpSuccess: 'Sign Up Success',
		ServerSignInSuccess: 'Sign In Success',
		ServerEmailInvalid: 'Email is inValid',
		ServerUserDisabled: 'Oops, your account is disabled, contact us for more info',
		ServerEmailExist: 'This email address already exists choose another one',
		ServerWrongEmailOrPassword: 'Your e-mail or passsword is wrong, please check',
		ServerDatabaseError: 'Databasee Error Occured',
		ServerGoogleConfigureFailed: 'Google Signin Configuration failed',
		ServerGoogleSigninFailed: 'Google Signin Failed',
//Home 
		Home: 'Home',
		Followed: 'Followed',
		Hot: 'Hot',
		Image: 'Image',
		Text: 'Text',
// Image Tile List
		LongImage: 'Long Image ...',
	
//Search
		Search: 'Search',
		TypeHere: 'Type here ...',
//Post 
		Post: 'Post',
//Inbox
		Inbox: 'Inbox',
//Profile
		Profile: 'Profile',
		Share: 'Share',
		Followers: 'Followers',
		Following: 'Following',
		Post: 'Post',
//Setting
		Setting: 'Setting',
		Avatar: 'Avatar',
		UserName: 'User Name',
		JokeBuddyId: 'Joke Buddy ID',
		Tagline: 'Tagline',
		WhoCanSendMeMessages: 'Who can send me messages ?',
		Anyone: 'Anyone',
		WhoIAmFollowing: 'Who I am following',
		NoOne: 'No one',
		AutoPlayGif:'Autoplay GIF',
		AutoPlayVideos: 'Autoplay videos',
		MakeYourGeolocationPublic: 'Make you geolocation public',
		Help: 'Help',
		CleanCache: 'Clean Cache',
		ContactUs: 'Contact us',
		TermsAndConditions: 'Terms and Conditions',
		CheckAppUpdates: 'Check App Updates',
		UserNameRules: 'User Name must be 2-20 characters long, and not contain any special characters',
		TaglinePrompt: "Wanna be the champagne of jokes? why don't start writing something funny here to let people remember you?"
	}
});

export default string;
