import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { FormValidationMessage, FormInput, Button} from 'react-native-elements'
import { whiteColor, greyColor, primaryColor } from '../../asset/style/common';
import string from '../../localization/string';

const maxCharCount = 50;

class TaglineSetting extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tagline: '',
			isValid: false
		}
	}

	componentDidMount(){
		this.setState({tagline: this.props.auth.tagline});
	}

	onChangeText(txt) {
		this.setState({tagline: txt});
	}

	onSubmit(){
		console.log('on submit');
	}
	
	render() {
		const user = this.props.auth;
		const { navigate } = this.props.navigation;
		return (
			<View style={style.container}>
				<FormInput 
					containerStyle={style.inputContainer}
					placeholder={this.state.tagline} 
					value={this.state.tagline}
					multiline={true}
					numberOfLines={4}
					onChangeText={(txt) => this.onChangeText(txt)}
				/>
				<FormValidationMessage>{'Error Message'}</FormValidationMessage>
				<Text style={style.rules}>{string.TaglinePrompt}</Text>
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
		signOut: () => {
			dispatch(signOut())
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TaglineSetting);
