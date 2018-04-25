import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import { whiteColor, primaryColor } from '../../asset/style/common';
import { loadListUpCall, loadListDownCall } from '../../reducer/action/listAction';
import string from '../../localization/string';
import TileList from '../components/TileList';

class AuthorProfile extends React.PureComponent {
	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;
		return {
			title: params ? params.titleParam : string.Profile
		};
	};

	componentDidMount() {
		const { navigation, loadListUpCall, data } = this.props;
		const params = navigation.state.params;
		navigation.setParams({titleParam: params.name});
		loadListUpCall('all', undefined, false, params.uid);
	}

	onRefresh() {
		const { loadListUpCall, navigation } = this.props;
		loadListUpCall('all', undefined, false, navigation.state.params.uid);
	}

	loadMore() {
		const { data, navigation, loadListDownCall } = this.props;
		loadListDownCall('all', data[data.length - 1].creationTime, false, navigation.state.params.uid);
	}

	renderUserInfo() {
		const auth = this.props.navigation.state.params;

		return (
			<View style={style.headerContainer}>						
				<View style={style.avatarWrapper}>
					<Image
						style={style.avatar}
						source={auth.photoURL == '' ? require('../../asset/image/avatar.png'): { uri: auth.photoURL}}
					/>
					<Text>{auth.name}</Text>
				</View>
				<View style={style.contentContainer}>
					{/* <View style={style.profileHightlight}> */}
						{/* <View >
							<Text style={style.hightlightText}>{auth.postCount ? auth.postCount : '0'}</Text>
							<Text style={style.hightlightText}>{string.Post}</Text>
						</View> */}
						{/* TODO: to be added when subscription feature is added */}
						{/* <View>
							<Text style={style.hightlightText}>{auth.followers.length}</Text>
							<Text style={style.hightlightText}>{string.Followers}</Text>
						</View>
						<View>
							<Text style={style.hightlightText}>{auth.following.length}</Text>
							<Text style={style.hightlightText}>{string.Following}</Text>
						</View> */}
					{/* </View> */}
					<View style={style.taglineContainer}>
						<Text style={style.tagline}>{auth.tagline}</Text>					
					</View>
				</View>
			</View>
		)
	}

	render() {
		const { data, isLoading, isBottomLoading, navigation } = this.props;

		if( data && data.length > 0) {
			return (
				<TileList
					navigate={navigation.navigate}
					data={data}
					isProfilePage={true}
					listHeaderComponent={this.renderUserInfo()}
					isLoading={isLoading}
					onRefresh={this.onRefresh.bind(this)}
					loadMore={this.loadMore.bind(this)}
				/>
			);
		} else {
			return this.renderUserInfo();
		}
	}
}

const style = StyleSheet.create({
	headerContainer: {
		backgroundColor: whiteColor,		
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 10
	},
	avatarWrapper: {
		alignItems: 'center',
	},
	avatar:{
		width: 60,
		height: 60,	
		borderRadius: 50,
	},
	contentContainer: {
		flexGrow: 1,
		width: 0,
		flex: 1,
	},
	// profileHightlight: {
	// 	width: Dimensions.get('window').width - 95,
	// 	paddingLeft: 20,
	// 	paddingRight: 20,
	// 	paddingBottom: 10,
	// 	flexDirection: 'row',
	// 	justifyContent: 'space-around',
	// },
	hightlightText: {
		textAlign: 'center'
	},
	taglineContainer: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10
	},
	tagline: {
		
	}
});

const mapStateToProps = (state) => {
	return {
		auth: state.Auth,
		data: state.List.authorList,
		isLoading: state.List.isLoading,
		isBottomLoading: state.List.isBottomLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadListUpCall: (listType, offsetTime, isMyList, uid) => dispatch(loadListUpCall(listType, offsetTime, isMyList, uid)),
		loadListDownCall: (listType, offsetTime, isMyList, uid) => dispatch(loadListDownCall(listType, offsetTime, isMyList, uid)),
		cleanMyList: () => dispatch(cleanMyList()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorProfile);
