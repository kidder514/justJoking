import React from 'react';
import { connect } from "react-redux";
import { View, Text, Image, StyleSheet, Button, Dimensions, TouchableOpacity, TouchableHighlight, resolveAssetSource } from 'react-native';
import { FormValidationMessage, FormInput } from 'react-native-elements'
import { primaryColor, greyColor, whiteColor, textColor, blackColor } from '../../asset/style/common';
import string from '../../localization/string';
import Icon from 'react-native-vector-icons/Entypo';
import { toastAndroid } from '../../reducer/action/appAction';
import FitImage from 'react-native-fit-image';
import { loadOn, loadEnd } from "../../reducer/action/uiAction";
import { postCall } from '../../reducer/action/listAction';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errorText: '',
			wordCount: 0,
			images:[]
		}

		this.removeImage = this.removeImage.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState){
		if (this.state.images.length >  nextState.images.length) {
			return true;
		}

		return true;
	}

	onChangeText(txt) {
		this.setState({ text: txt, wordCount: txt.length });
	}

	chooseImage() {
		// const options = {
		// 	imageCount: 9,           	// 最大选择图片数目，默认6
		// 	isCamera: false,            // 是否允许用户在内部拍照，默认true
		// 	isCrop: false,       	    // 是否允许裁剪，默认false
		// 	isGif: true,              	// 是否允许选择GIF，默认false，暂无回调GIF数据
		// };

		ImagePicker.openPicker({
			multiple: true
		  }).then(images => {
			console.log(images);
		  });

		// this.props.loadOnCall();
		// SYImagePicker.asyncShowImagePicker(options)
		// .then(imagesData => {
		// 	let images = [];
		// 	imagesData.map(image => {images.push(image.original_uri)});
		// 	this.setState({images: images});
		// 	this.props.loadEndCall();
		// })
		// .catch(err => {
		// 	this.props.loadEndCall();			
		// 	toastAndroid(string.ErrorSelectingImage);
		// })
	}

	removeImage(index){
		let images = this.state.images;
		images.splice(index, 1)
		this.setState({images: images});
	}

	onSubmit() {
		const { text, images } = this.state;
		if (text.length > 300) {
			this.setState({ errorText: string.InvalidTextLength });
		} else {
			this.setState({ errorText: '' });
			this.resizeImage();
		}
	}

	resizeImage() {
		this.props.loadOnCall();
		let imagesTemp = [];
		this.state.images.map(image => {
			console.log(resolveAssetSource(image).width, resolveAssetSource(image).height);

			// ImageResizer.createResizedImage(
			// 	'data:image/jpeg;base64,' + pickerRes.data, 300, 300, 'PNG', 65, 0
			// )
			// .then((resizerRes) => {	
	
			// })
			// .catch((err) => {
			// 	dispatch(loadEnd());
			// 	toastAndroid(string.ErrorResizingImage);				
			// }); 
		});
		// this.props.postCall(text, images);

	}

	renderImages() {
		const imagesLength = this.state.images.length;
		return (
			<View style={style.imageList}>
				{imagesLength > 0 && this.renderImageList()}
				{this.renderImageButton()}
				{imagesLength > 0 && 
					<View className={style.removeImagePrompt}>
						<Text>{string.ClickToRemoveImage}</Text>
					</View>
				}
			</View>
		);
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
				/>
				<Text style={style.wordCount}>{string.WordCount + this.state.wordCount + '/300'}</Text>
				{this.renderImages()}
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
		width: width - width * 0.2
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		loadOnCall: () => { dispatch(loadOn())},
		loadEndCall: () => { dispatch(loadEnd())},
		postCall: () => { dispatch(postCall())}
	};
};

export default connect(null, mapDispatchToProps)(Post);

