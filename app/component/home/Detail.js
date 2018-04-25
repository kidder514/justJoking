import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { primaryColor, greyColor, whiteColor } from '../../asset/style/common';
import string from '../../localization/string';
import ImageTile from '../components/ImageTile';
import TextTile from '../components/TextTile';
import { connect } from "react-redux";
import { loadCommentUpCall, loadCommentBottomCall } from '../../reducer/action/listAction';
import CommentList from '../components/CommentList';

class Detail extends React.PureComponent {
	static navigationOptions = ({ navigation, navigationOptions }) => {
	};

	componentDidMount(){
		const params = this.props.navigation.state.params;
		const { loadCommentUpCall } = this.props;
		loadCommentUpCall(params.data.id);
	}

	loadMore() {
		const { list } = this.props;
		if (list.length <= 0) return;

		const params = this.props.navigation.state.params;		
		loadCommentBottomCall(params.data.id, list[list.length - 1].creationTime)
	}

	render(){
		return (
			<View style={style.container}>
				{this.renderPost()}
				{this.renderComment()}
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

	renderComment() {
		const { list, isLoading, navigation } = this.props;
		
		if (list.length > 0 || isLoading) {
			return (
				<View style={style.listContainer}>
					<CommentList 
						navigate={navigation.navigate}
						data={list}
						loadMore={this.loadMore.bind(this)}
					/>
				</View>
			);		
		} else {		
			return (
				<View style={style.listContainer}>
					<Text>
						{"be the first one comment on this"}
					</Text>
				</View>
			);
		}
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1
	},
    listContainer: {
		flex: 1,
        backgroundColor: whiteColor,
        marginBottom: 10,
    },
});

const mapStateToProps = (state) => {
    return {    
		auth: state.Auth,
		list: state.List.commentList,
		isLoading: state.List.isCommentLoading
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadCommentUpCall: (id) => dispatch(loadCommentUpCall(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

