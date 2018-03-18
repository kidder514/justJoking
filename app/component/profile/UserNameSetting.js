import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { FormValidationMessage, FormInput, Button} from 'react-native-elements'
import { whiteColor, greyColor, primaryColor } from '../../asset/style/common';
import string from '../../localization/string';
import { toastAndroid } from '../../reducer/action/appAction';
import { updateNameCall } from '../../reducer/action/authAction';

class UserNameSetting extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			errorName: '',
			wordCount: 0,
			isValid: false
		}
	}

	componentDidMount(){
		const name = this.props.auth.name;
		this.setState({name: name, wordCount: name.length });
	}

	onChangeText(txt) {
		this.setState({name: txt, wordCount: txt.length});
	}

	onSubmit(){
		const name = this.state.name;
		if (name == '' || name.length > 20 || name.length < 2) {
			this.setState({errorName: string.InvalidNameLength});
		} else {
			this.setState({errorName: ''});
			this.props.updateNameCall(name);
		}
	}
	
	render() {
		const user = this.props.auth;
		const { navigate } = this.props.navigation;
		return (
			<View style={style.container}>
				<FormInput 
					containerStyle={style.inputContainer}
					placeholder={this.state.name} 
					value={this.state.name}
					onChangeText={(txt) => this.onChangeText(txt)}
					maxLength = {50}
				/>
				<Text style={style.wordCount}>{string.WordCount + this.state.wordCount}</Text>				
				<FormValidationMessage>{this.state.errorName}</FormValidationMessage>
				<Text style={style.rules}>{string.UserNameRules}</Text>
				<Button
					title={string.Submit}
					onPress={() => this.onSubmit()}
					backgroundColor={primaryColor}
					containerViewStyle={style.button}
					textStyle={style.buttonText}
				/>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: whiteColor,
		paddingBottom: 30
	}, 
	inputContainer: {
		marginTop: 20,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: greyColor,
		borderRadius: 4,
	},
	rules: {
		fontSize: 12,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		paddingBottom:30
	},
	wordCount: {
		fontSize: 12,
		paddingLeft: 20,
		paddingRight: 20,
		textAlign: 'right'
	},
	button: {
		width: Dimensions.get('window').width * 0.3,
		alignSelf: 'flex-end',
	},
	buttonText: {
		fontSize: 16
	}
});

const mapStateToProps = (state) => {
	return {
		auth: state.Auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateNameCall: (name) => {dispatch(updateNameCall(name))}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(UserNameSetting);
