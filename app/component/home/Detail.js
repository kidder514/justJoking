import React from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, ScrollView} from 'react-native';
import { FormInput, Button } from 'react-native-elements'
import { primaryColor, greyColor, whiteColor } from '../../asset/style/common';
import string from '../../localization/string';
import ImageTile from '../components/ImageTile';
import TextTile from '../components/TextTile';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from "react-redux";
import { loadCommentUpCall, loadCommentBottomCall, addCommentCall } from '../../reducer/action/listAction';
import CommentList from '../components/CommentList';
import { toastAndroid } from '../../reducer/action/appAction';
import AdBannerComponent from '../components/AdBannerComponent';

class Detail extends React.PureComponent {
	static navigationOptions = ({ navigation, navigationOptions }) => {
	};

	constructor(props) {
		super(props);
		this.state = {
			comment: ''
		}

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount(){
		const params = this.props.navigation.state.params;
		const { loadCommentUpCall } = this.props;
		loadCommentUpCall(params.data.id);
	}

	onChangeText(txt) {
		this.setState({comment: txt});
	}

	onSubmit = () => {
		const { comment } = this.state;		
		const params = this.props.navigation.state.params;
		const { addCommentCall } = this.props;
		if (comment === '') return;

		if (comment.length < 10) {
			toastAndroid(string.CommentTooShort);
		} else {
			addCommentCall(params.data, comment)
		}
	}

	loadMore() {
		const { list, loadCommentBottomCall } = this.props;
		if (list.length <= 0) return;

		const params = this.props.navigation.state.params;		
		loadCommentBottomCall(params.data.id, list[list.length - 1].creationTime)
	}

	render() {
		return (
			<View style={style.container}>
				<ScrollView >
					{this.renderPost()}
					{this.renderAd()}
					{this.renderComment()}
				</ScrollView>
				{this.renderInputFooter()}
			</View>
		)
	}

	renderPost() {
		const { navigation } = this.props;
		const params = navigation.state.params;

		if (params.data.postType === 'image'){
			return (	
				<ImageTile
					isOnDetailPage={true} 
					data={params.data} 
					navigator={params.navigator} 
					isProfilePage={params.isProfilePage}
				/>
			);
		} else {
			return (
				<TextTile 
					isOnDetailPage={true}
					data={params.data} 
					navigator={params.navigator} 
					isProfilePage={params.isProfilePage}
				/>
			);
		}
	}

	renderAd() {
		return (
			<View style={style.adBanner}>
				<AdBannerComponent />
			</View>
		);
	}

	renderComment() {
		const { list, isCommentLoading, navigation } = this.props;
		const params = navigation.state.params;
		
		if (list.length > 0 || isCommentLoading) {
			return (
				<View style={style.listContainer}>
					<CommentList 
						navigate={navigation.navigate}
						isProfilePage={params.isProfilePage}
						data={list}
						loadMore={this.loadMore.bind(this)}
					/>
				</View>
			);		
		} else {		
			return (
				<View style={style.listContainer}>
					<Text>
						{string.PostYourComment}
					</Text>
				</View>
			);
		}
	}

	renderInputFooter() {
		return (
			<View style={style.inputContainer}>
				<FormInput 
					containerStyle={style.inputFooter}
					placeholder={string.LeaveComment} 
					value={this.state.comment}
					onChangeText={(txt) => this.onChangeText(txt)}
					maxLength = {50}
					underlineColorAndroid='transparent'	
				/>
				{this.renderSubmitButton()}
			</View>
		);
	}

	renderSubmitButton() {
		const { isCommentAdding } = this.props;
		if (isCommentAdding) {
			return (
				<ActivityIndicator 
					size="large" 
					color={primaryColor} 
					style={style.submitButton}
				/>
			)
		} else {
			return (
				<Icon 
					onPress={this.onSubmit}					
					style={style.submitButton}
					name="arrow-with-circle-up" 
					size={40} 
					color={primaryColor} 
				/>
			);
		}
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 50
	},
    listContainer: {
		flex: 1,
        backgroundColor: whiteColor,
		marginBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 20
	},
	inputContainer: {		
		backgroundColor: whiteColor,
		position: 'absolute',
		width: Dimensions.get('window').width,
		bottom: 0,
		paddingBottom: 4,
		paddingTop: 4
	},
	inputFooter: {
		borderWidth:1,
		borderColor: greyColor,
		borderRadius: 5,
		width: Dimensions.get('window').width - 70
	},
	submitButton: {
		position: 'absolute',
		bottom: 8,
		right: 10,
		zIndex: 2,
	},
    adBanner: {
        marginBottom: 5
    }
});

const mapStateToProps = (state) => {
    return {    
		auth: state.Auth,
		list: state.List.commentList,
		isCommentLoading: state.List.isCommentLoading,
		isCommentAdding: state.List.isCommentAdding
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadCommentUpCall: (id) => dispatch(loadCommentUpCall(id)),
		loadCommentBottomCall: (id, offsetTime) => dispatch(loadCommentBottomCall(id, offsetTime)),
		addCommentCall: (data, comment) => dispatch(addCommentCall(data, comment))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

