import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { FormValidationMessage, FormInput, Button} from 'react-native-elements'
import { whiteColor, greyColor, primaryColor } from '../../asset/style/common';
import string from '../../localization/string';
import { updateTaglineCall } from '../../reducer/action/authAction';

class TaglineSetting extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tagline: '',
			errorTagline: '',
			wordCount: 0,
			isValid: false
		}
	}

	componentDidMount(){
		const tagline = this.props.auth.tagline;
		this.setState({tagline: tagline, wordCount: tagline.length });
	}

	onChangeText(txt) {
		this.setState({tagline: txt, wordCount: txt.length});
	}

	onSubmit(){
		const tagline = this.state.tagline;
		if (tagline.length > 100) {
			this.setState({errorTagline: string.InvalidTaglineLength});
		} else {
			this.setState({errorTagline: ''});
			this.props.updateTaglineCall(tagline);
		}
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
					maxLength = {150}					
					onChangeText={(txt) => this.onChangeText(txt)}
					underlineColorAndroid='transparent'	
				/>
				<Text style={style.wordCount}>{string.WordCount + this.state.wordCount}</Text>				
				<FormValidationMessage>{this.state.errorTagline}</FormValidationMessage>
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
		updateTaglineCall: (tagline) => {dispatch(updateTaglineCall(tagline))}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TaglineSetting);
