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
		FeatureCommingSoon: 'This feature is comming soon. "Just joking" is my solo project, please be patient and allow some time for me to complete all the missing features.',
		Error: 'Error',
		LoadingUploadingImages: 'Uploading images, this might take a white, please be patient.',
		LoadingCompressingImages: 'Compressing images',
		LoadingSigningUp: 'Signing Up',
		LoadingSigningIn: 'Signing In',
		LoadingSigningOut: 'Signing Out',
		LoadingUpdatingProfile: 'Updating Profile',
		LoadingUploadingPost: 'Uploading Post',
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
		InvalidNameLength: 'Name must be 2 - 20 characters long',
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
		ServerUserCancelledLogin: 'User has cancelled login.',
		ServerObtainTokenError: 'Not able to obtain user token',
		ServerSignOutError: 'Contact server failed, but you local sign-in status is removed.',
//Home 
		Home: 'Home',
		Followed: 'Followed',
		Hot: 'Hot',
		Image: 'Image',
		Text: 'Text',
		PostEmpty: 'Oops, no funny things here at the moment, join us and share your best jokes',
		ServerNoMorePost: 'No more new post',
		ServerNoMoreComment: 'No more new comment',
		ServerListLoaded: 'New posts has been loaded.',
		ServerCommentLoaded: 'New comment has been loaded.',		
		ServerNotAbleToUpdatePost: 'Not able to update post',
		LoadMore: 'Load More ...',
// Image Tile List
		LongImage: 'click to see more ...',
	
//Search
		Search: 'Search',
		TypeHere: 'Type here ...',
//Post 
		Post: 'Post',
		PostSomethingFunny: 'Post something funny and make people laugh.',
		Upload: 'Upload',
		Reset: 'Reset',
		ErrorEmptyContent: 'You cannot submit an empty content',
		ErrorTextLengthInvalid: 'A text post should be at least 30 and at most 300 characters long, please make sure you are actually telling a joke',
		ErrorTextTooLong: 'Please make sure it is less that 300 characters',
		ErrorSelectingImage: 'Error ocurred while selecting images',
		ClickToRemoveImage: 'Click to remove image from the list',
		ErrorAddPost: 'Adding post has failed',
		AddPostSuccess: 'Your joke has been added successfully',
		ServerPostDoesNotExist: 'This joke does not exist, it must have been removed',
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
		ChooseYourProfilePicture:'Choose your profile picture',
		UserName: 'User Name',
		JokeBuddyId: 'Joke Buddy ID',
		AddTagline: 'Add you tagline here',
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
		TaglinePrompt: "Wanna be the champagne of jokes? why don't start writing something funny here to let people remember you? Please make sure it is less that 100 characters",
		InvalidTaglineLength: 'Please make sure it is less that 100 characters',
		WordCount: 'word count:',
		ServerNameUpdateSuccess: 'Name has been updated',
		ServerTaglineUpdateSuccess: 'Tagline has been updated',		
		ServerPhotoUpdateSuccess: 'Photo has been updated',
		ErrorSelectingPicture: 'Error occured while selecting picture.',
		ErrorResizingImage: 'Error occured when resizing image',
		ServerFailToUploadFile: 'Fail to upload the file',
		ServerFileUploadSuccess: 'File has been uploaded successfully'
	}
});

export default string;
