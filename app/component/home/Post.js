import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native';
import { FormValidationMessage, FormInput } from 'react-native-elements'
import { primaryColor, greyColor, whiteColor, textColor, blackColor } from '../../asset/style/common';
import string from '../../localization/string';
import Icon from 'react-native-vector-icons/Entypo';

class Post extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errorText: '',
			wordCount: 0,
			isValid: false
		}
	}

	onChangeText(txt) {
		this.setState({ text: txt, wordCount: txt.length });
	}

	chooseImage() {

		// pick one from react-native-customized-image-picker
		// and react-native-multi-image-selector 

		// this image picker does not open the gallery
		
	}

	onSubmit() {
		const text = this.state.text;
		if (text.length > 300) {
			this.setState({ errorText: string.InvalidTextLength });
		} else {
			this.setState({ errorText: '' });

		}
	}

	renderImageList() {
		return (
			<View style={style.imageList}>
				{this.renderImageButton()}
			</View>
		);
	}

	renderImageButton() {
		return (
			<TouchableOpacity onPress={() => this.chooseImage()} style={style.imageButton}>
				<Icon name="plus" size={40} color={greyColor} />
			</TouchableOpacity>
		)
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={style.container}>
				<Text style={style.text}>{string.PostSomethingFunny}</Text>
				<FormInput
					containerStyle={style.inputContainer}
					placeholder={this.state.text}
					value={this.state.text}
					multiline={true}
					numberOfLines={6}
					maxLength={300}
					onChangeText={(txt) => this.onChangeText(txt)}
				/>
				<Text style={style.wordCount}>{string.WordCount + this.state.wordCount + '/300'}</Text>
				{this.renderImageList()}
				<FormValidationMessage>{this.state.errorText}</FormValidationMessage>
				<Button
					style={style.button}
					onPress={() => navigate('Publish')}
					title={string.Upload}
					color={primaryColor}
				/>
			</View>
		);
	}
}
const width = Dimensions.get('window').width;

const style = StyleSheet.create({
	container: {
		backgroundColor: whiteColor,
		flex: 1,
		paddingLeft: width * 0.1,
		paddingRight: width * 0.1,
		paddingTop: width * 0.1,
	},
	inputContainer: {
		borderBottomWidth: 1,
		borderColor: greyColor,
		marginTop: 10,
		marginBottom: 10,
		marginRight: 0,
		marginLeft: 0
	},
	wordCount: {
		fontSize: 12,
		textAlign: 'right',
		paddingBottom: 10
	},
	imageButton: {
		borderWidth: 1,
		borderColor: greyColor,
		height: width * 0.18,
		width: width * 0.18,
		paddingLeft: width * 0.01,
		paddingRight: width * 0.01,
		paddingTop: width * 0.01,
		paddingBottom: width * 0.01,
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
	}
});


export default Post;
