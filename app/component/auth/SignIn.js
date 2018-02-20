import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, TextInput, Button, Image, View } from 'react-native';
import { NavigationActions } from 'react-navigation'
import string from '../../localization/string';
import { signIn } from '../../reducer/action/authAction';
import { primaryColor, greyColor, warningColor } from '../../asset/style/common';
import Icon from 'react-native-vector-icons/Entypo';
import validator from 'validator';

const initState = {
	email: "",
	errorEmail: "",
	password: "",
	errorPassword: "",
	error: "",
}

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = initState;

		this.submit = this.submit.bind(this);
		this.googleSignIn = this.googleSignIn.bind(this);
		this.facebookSignIn = this.facebookSignIn.bind(this);
		this.twitterSignIn = this.twitterSignIn.bind(this);
		this.navigateTo = this.navigateTo.bind(this);
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
			this.props.signIn();
		}
	}

	googleSignIn(){
		this.props.signIn();
	}

	facebookSignIn(){
		this.props.signIn();
	}

	twitterSignIn(){
		this.props.signIn();
	}

	navigateTo(screen){
		const { navigate } = this.props.navigation;
		this.setState(initState); // reset all input field
		navigate(screen);
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
						onPress={() => this.navigateTo('Policy')}
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
					<Icon onPress={this.twitterSignIn} name="twitter-with-circle" size={30} color={primaryColor} />
				</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
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
		backgroundColor: '#fff',
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
		signIn: () => {
			dispatch(signIn())
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);