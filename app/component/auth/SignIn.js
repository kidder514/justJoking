import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, TextInput, Button, Image, View, Picker } from 'react-native';
import string from '../../localization/string';
import { signInWithEmailCall, signInWithSocialCall, updateLanguage } from '../../reducer/action/authAction';
import { primaryColor, greyColor, warningColor, whiteColor } from '../../asset/style/common';
import Icon from 'react-native-vector-icons/Entypo';
import validator from 'validator';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { toastAndroid } from '../../reducer/action/appAction';

const initState = {
	email: "",
	errorEmail: "",
	password: "",
	errorPassword: "",
	error: "",
	langCode: string.getLanguage(),
}

class SignIn extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = initState;

		this.submit = this.submit.bind(this);
		this.googleSignIn = this.googleSignIn.bind(this);
		this.facebookSignIn = this.facebookSignIn.bind(this);
		this.twitterSignIn = this.twitterSignIn.bind(this);
		this.navigateTo = this.navigateTo.bind(this);
		this.onSelectLang = this.onSelectLang.bind(this);
	}

	submit() {
		let isValid = true;
		
		if(this.state.email === '') {
			isValid = false;
			this.setState({errorEmail: string.EmailEmpty});
		} else if(!validator.isEmail(this.state.email)) {
			isValid = false;
			this.setState({errorEmail: string.EmailInvalid});
		} else {
			this.setState({errorEmail: ''});
		}

		if(this.state.password === '') {
			isValid = false;
			this.setState({errorPassword: string.PasswordEmpty});
		} else {
			this.setState({errorPassword: ''});
		}

		if(isValid){
			this.props.signInWithEmailCall(this.state.email, this.state.password);
		}
	}

	googleSignIn() {
		GoogleSignin.configure()
		.then(()=> {
			GoogleSignin.signIn()
			.then((res) => {
				const credential = firebase.auth.GoogleAuthProvider.credential(res.idToken, res.accessToken);
				this.props.signInWithSocialCall(credential);
			})
		})
		.catch(() => toastAndroid(string.ServerGoogleConfigureFailed));
	}


	async facebookSignIn(){
		try {
			const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
			if (result.isCancelled) {
				toastAndroid(string.ServerUserCancelledLogin);
			}

			// get the access token
			const data = await AccessToken.getCurrentAccessToken();
			if (!data) {
				toastAndroid(string.ServerObtainTokenError);				
			}
		
			// create a new firebase credential with the token
			const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
			this.props.signInWithSocialCall(credential);
		  } catch (e) {
			console.error(e);
		  }
	}

	twitterSignIn(){
		this.props.signIn();
	}

	navigateTo(screen){
		const { navigate } = this.props.navigation;
		this.setState(initState); // reset all input field
		navigate(screen);
	}

	onSelectLang = (langCode) => {
		this.setState({ langCode });
		if (string.getAvailableLanguages().indexOf(langCode) !== -1) {
			const { updateLanguage } = this.props;
			updateLanguage(langCode);
			string.setLanguage(langCode);
		}
	}

	render() {
		return (
			<View style={style.container}>
				<Image source={require('../../asset/logo.png')} style={style.logo} />
				<TextInput
					style={style.input}
					placeholder={string.EnterEmail}
					onChangeText={(text) => this.setState({ email: text })}
					value={this.state.email}
					underlineColorAndroid={greyColor}
				/>
				<Text style={style.warning}>{this.state.errorEmail}</Text>
				<TextInput
					style={style.input}
					secureTextEntry={true}
					placeholder={string.EnterPassword}
					onChangeText={(text) => this.setState({ password: text })}
					value={this.state.password}
					underlineColorAndroid={greyColor}
				/>
				<Text style={style.warning}>{this.state.errorPassword}</Text>
				<Text style={style.warning}>{this.state.error}</Text>
				<View style={style.buttonWrapper}>
					<Button
						onPress={this.submit}
						title={string.SignIn}
						accessibilityLabel={string.SignIn}
						style={style.button}
						color={primaryColor}
					/>
				</View>
				<View style={style.buttonWrapper}>
					<Button
						onPress={() => this.navigateTo('SignUp')}
						title={string.SignUp}
						accessibilityLabel={string.SignUp}
						style={style.button}
						color={primaryColor}
					/>
				</View>
				<View>
					<Text
						style={style.policyText}
						onPress={() => this.navigateTo('TermCondition')}
					>
						{string.AgreeWithPolicy}
					</Text>
				</View>
				<View style={style.line}>
					<Text
						style={style.signInWithText}
					>
						{string.signInWith}
					</Text>
				</View>
				<View style={style.iconList}>
					<Icon onPress={this.googleSignIn} name="google--with-circle" size={30} color={primaryColor} />
					<Icon onPress={this.facebookSignIn} name="facebook-with-circle" size={30} color={primaryColor} />
				</View>
				<View style={style.langPickerContainer}>
					<View style={style.langPickerLabelContainer}>
						<Icon name="language" size={20} color={primaryColor} style={{paddingRight: 10}}/>
						<Text>
							{string.ChangeLanguage}
						</Text>
					</View>
					{this.renderLangPicker()}
				</View>
			</View>
		);
	}

	renderLangPicker() {
		const { langCode } = this.state;
		const availableLang = string.getAvailableLanguages();
		const langPickers = availableLang.map((langCode, index) => {
			return <Picker.Item label={string[langCode]} value={langCode} key={'language-index-' + index}/>
		});
		
		return (
			<Picker
				selectedValue={langCode}
				style={{ height: 50, width: 200 }}
				onValueChange={(langCode, index) => this.onSelectLang(langCode)}
				mode='dialog'
			>
				{langPickers}
			</Picker>
		)
	}

}

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: whiteColor,
	},
	langPickerContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 10,
	},
	langPickerLabelContainer: {
		flexDirection: 'row',
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	buttonWrapper: {
		width: 200,
		marginTop: 10,
		marginBottom: 10,
		zIndex: 1
	},
	input: {
		width: 200,
	},
	button: {
		marginBottom: 50,
	},
	policyText: {
		fontSize: 12
	},
	signInWithText: {
		fontSize: 12,
		textAlign: 'center',
		marginBottom: 5
	},
	line: {
		borderBottomWidth: 1,
		borderBottomColor: greyColor,
		width: 150,
		marginTop: 20,
	},
	iconList: {
		marginTop: 10,
		display: 'flex',
		width: 200,
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: whiteColor,
	},
	warning: {
		color: warningColor,
		fontSize: 12,
		marginRight: 30,
		marginLeft: 30,
	}
});

const mapStateToProps = (state) => {
	return {
		auth: state.Auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signInWithEmailCall: (email, password) => {dispatch(signInWithEmailCall(email, password))},
		signInWithSocialCall: (credential) => {dispatch(signInWithSocialCall(credential))},
		updateLanguage: (langCode) => {dispatch(updateLanguage(langCode))}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);