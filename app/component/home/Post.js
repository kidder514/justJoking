import React from 'react';
import { connect } from "react-redux";
import { View, Text, Image, StyleSheet, Button, Dimensions, TouchableOpacity, TouchableHighlight, resolveAssetSource } from 'react-native';
import { FormValidationMessage, FormInput } from 'react-native-elements'
import { primaryColor, greyColor, whiteColor, textColor, blackColor } from '../../asset/style/common';
import string from '../../localization/string';
import Icon from 'react-native-vector-icons/Entypo';
import { toastAndroid } from '../../reducer/action/appAction';
import FitImage from 'react-native-fit-image';
import { textPostCall, imagePostCall } from '../../reducer/action/listAction';
import SYImagePicker from 'react-native-syan-image-picker'

const initialState = {
	text: '',
	errorText: '',
	wordCount: 0,
	images: []
};

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;

		this.removeImage = this.removeImage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.reset = this.reset.bind(this);
	}

	componentWillUpdate(nextProps) {
		if (this.props.isPosting && !nextProps.isPosting) {
			this.reset();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.images.length != nextState.images.length) {
			return true;
		}

		return true;
	}

	reset(){
		this.setState(initialState);
	}

	onChangeText(txt) {
		this.setState({ text: txt, wordCount: txt.length });
	}

	chooseImage() {
		const options = {
			imageCount: 9,             // 最大选择图片数目，默认6
			isCamera: true,            // 是否允许用户在内部拍照，默认true
			isGif: false,              // 是否允许选择GIF，默认false，暂无回调GIF数据
		};

		SYImagePicker.asyncShowImagePicker(options)
		.then(images => {
			let imageList = [];

			if (images.length > 0)
				images.map(image => imageList.push(image.original_uri));

			this.setState({images: imageList});
		})
		.catch(err => {
			console.log(err);
		})
	}

	removeImage(index) {
		let images = this.state.images;
		images.splice(index, 1)
		this.setState({ images: images });
	}

	onSubmit() {
		const { text, images } = this.state;
		if (images.length == 0) {
			// text post
			if (text.length == 0) {
				this.setState({errorText: string.ErrorEmptyContent});
			} else if (text.length < 20 && text.length > 300) {
				this.setState({errorText: string.ErrorTextLengthInvalid});
			} else {
				this.setState({ errorText: '' });
				this.props.textPostCall(text);
			}
		} else {
			//image post
			if (text.length > 300) {
				this.setState({ errorText: string.ErrorTextTooLong });
			} else {
				this.setState({ errorText: '' });
				this.props.imagePostCall(text, images);
			}
		}
	}

	renderImages() {
		const imagesLength = this.state.images.length;
		return [
			<View style={style.imageList} key='image-list'>
				{imagesLength > 0 && this.renderImageList()}
				{this.renderImageButton()}
			</View>,
			<View key='remove-image-prompt'>				
				{this.renderRemoveImagePrompt()}
			</View>
		];
	}

	renderRemoveImagePrompt() {
		if ( this.state.images.length > 0 ) {
			return (
				<View style={style.removeImagePrompt}>
					<Text>{string.ClickToRemoveImage}</Text>
				</View>
			)
		} else {
			return false;
		}
	}

	renderImageList() {
		let imageList = [];
		this.state.images.map((image, index) => {
			imageList.push(
				<TouchableHighlight
					key={'upload-image' + index}
					onPress={(index) => this.removeImage(index)}
					style={style.imageButton}
				>
					<FitImage
						style={style.imageButton}
						resizeMode={Image.resizeMode.cover}
						source={{ uri: image }}
					/>
				</TouchableHighlight>
			);
		});

		return imageList;
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
					inputStyle={style.inputStyle}
					placeholder={this.state.text}
					value={this.state.text}
					multiline={true}
					numberOfLines={6}
					maxLength={300}
					onChangeText={(txt) => this.onChangeText(txt)}
					underlineColorAndroid='transparent'					
				/>
				<Text style={style.wordCount}>{string.WordCount + this.state.wordCount + '/300'}</Text>
				{this.renderImages()}
				<FormValidationMessage>{this.state.errorText}</FormValidationMessage>
				<View style={style.button}>
					<Button
						onPress={this.onSubmit}
						title={string.Upload}
						color={primaryColor}
					/>
				</View>
				<View style={style.resetButton}>
					<Button
						onPress={this.reset}
						title={string.Reset}
						color={greyColor}
					/>
				</View>
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
		width: width - width * 0.2,
		marginLeft: 0,
		marginRight: 0
	},
	inputStyle: {
		width: width - width * 0.2
	},
	wordCount: {
		fontSize: 12,
		textAlign: 'right',
		paddingBottom: 10
	},
	imageButton: {
		borderWidth: 1,
		borderColor: greyColor,
		height: width * 0.19,
		width: width * 0.19,
		marginLeft: width * 0.004,
		marginRight: width * 0.004,
		marginTop: width * 0.004,
		marginBottom: width * 0.004,
		paddingLeft: 0,
		paddingRight: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	imageList: {
		width: width - width * 0.2,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	removeImagePrompt: {
		width: width - width * 0.2,
	},
	resetButton: {
		marginTop: 20,
	}
});

const mapStateToProps = (state) => {
	return {
		isPosting: state.List.isPosting
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		imagePostCall: (text, images) => {dispatch(imagePostCall(text, images))},
		textPostCall: (text) => {dispatch(textPostCall(text))}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);

