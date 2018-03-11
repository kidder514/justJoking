import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, TextInput, Button, Image, View, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation'
import string from '../../localization/string';
import { signUpWithEmailCall } from '../../reducer/action/authAction';
import { primaryColor, greyColor, warningColor, whiteColor } from '../../asset/style/common';
import validator from 'validator';

const initState = {
	name: "",
	errorName: "",
	email: "",
	errorEmail: "",
	password: "",
	errorPassword: "",
	confirmPassword: "",
	errorConfirmPassword: "",
	error: "",
}

class SignUp extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = initState;
		this.submit = this.submit.bind(this);
		this.navigateTo = this.navigateTo.bind(this);
        this.backButtonListener = null;		
	}

	componentWillMount() {
		this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
			this.setState(initState);
			this.props.navigation.goBack();
            return true;
		});
    }

    componentWillUnmount() {
        this.backButtonListener.remove();
	}

	submit() {
		let isValid = true;
		
		if(this.state.name === '') {
			isValid = false;
			this.setState({errorName: string.NameEmpty});
		} else {
			this.setState({errorName: ''});
		}

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
		} else if(!(validator.isAlphanumeric(this.state.password) &&
			!validator.isAlpha(this.state.password) &&
			!validator.isNumeric(this.state.password) &&
			this.state.password.length >= 8)){

			isValid = false;
			this.setState({errorPassword: string.PasswordInvalid});
		} else {
			this.setState({errorPassword: ''});
		}

		if(this.state.confirmPassword === '') {
			isValid = false;
			this.setState({errorConfirmPassword: string.ConfirmPasswordEmpty});
		} else if (this.state.confirmPassword !== this.state.password){
			isValid = false;			
			this.setState({errorConfirmPassword: string.PasswordNotMatch});
		} else {
			this.setState({errorConfirmPassword: ''});
		}

		if(isValid){
			this.props.signUpCall(this.state.name, this.state.email, this.state.password);
		}
	}

	navigateTo(screen){
		const { navigate } = this.props.navigation;
		this.setState(initState); // reset all input field
		navigate(screen);
	}

	render() {
		return (
			<View style={style.container}>
				<TextInput
					style={style.input}
					placeholder={string.EnterName}
					onChangeText={(text) => this.setState({ name: text })}
					value={this.state.name}
					underlineColorAndroid={greyColor}
				/>
				<Text style={style.warning}>{this.state.errorName}</Text>
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
				<TextInput
					style={style.input}
					secureTextEntry={true}
					placeholder={string.ConfirmPassword}
					onChangeText={(text) => this.setState({ confirmPassword: text })}
					value={this.state.confirmPassword}
					underlineColorAndroid={greyColor}
				/>
				<Text style={style.warning}>{this.state.errorConfirmPassword}</Text>
				<Text style={style.warning}>{this.state.error}</Text>
				<View style={style.buttonWrapper}>
					<Button
						onPress={this.submit}
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
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: whiteColor,
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
	warning: {
		color: warningColor,
		fontSize: 12,
		marginRight: 30,
		marginLeft: 30
	}
});

const mapStateToProps = (state) => {
	return {
		auth: state.Auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signUpCall: (name, email, password) => {
			dispatch(signUpWithEmailCall(name, email, password))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);