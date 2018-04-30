import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import { whiteColor, primaryColor } from '../../asset/style/common';
import { loadListUpCall, loadListDownCall } from '../../reducer/action/listAction';
import string from '../../localization/string';
import TileList from '../components/TileList';

class Profile extends React.PureComponent {
	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;
		return {
			title: params ? params.titleParam : string.Profile
		};
	};

	componentDidMount() {
		const { navigation, loadListUpCall, cleanMyList, data } = this.props;
		navigation.setParams({titleParam: this.props.auth.name});
		loadListUpCall('all', undefined, true);
	}

	onRefresh() {
		const { loadListUpCall} = this.props;
		loadListUpCall('all', undefined, true);		
	}

	loadMore() {
		const { data, loadListDownCall } = this.props;
		loadListDownCall('all', data[data.length - 1].creationTime, true);
	}

	render() {
		const { data, isLoading, isBottomLoading, navigation } = this.props;
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
	}

	renderUserInfo() {
		const { navigation, auth } = this.props;
		const tagline = auth.tagline.length > 0 ? auth.tagline : string.NoTagline;

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
					{this.renderSettingButton()}
					<View style={style.taglineContainer}>
						<Text style={style.tagline}>{tagline}</Text>					
					</View>
				</View>
			</View>
		)
	}

	renderSettingButton() {
		const { navigation } = this.props;

		return (
			<View>
				<Button
					title={string.Setting}
					onPress={() => navigation.navigate("Setting")}
					outline={true}
					buttonStyle={{
						height: 30,
						backgroundColor: primaryColor,
						width: Dimensions.get('window').width * 0.4,
						alignSelf: 'center'
					}}
				/>
			</View>
		)
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
		paddingTop: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	tagline: {
		textAlign: 'center'
	}
});

const mapStateToProps = (state) => {
	return {
		auth: state.Auth,
		data: state.List.myList,
		isLoading: state.List.isLoading,
		isBottomLoading: state.List.isBottomLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadListUpCall: (listType, offsetTime, isMyList, uid) => dispatch(loadListUpCall(listType, offsetTime, isMyList, uid)),
		loadListDownCall: (listType, offsetTime, isMyList, uid) => dispatch(loadListDownCall(listType, offsetTime, isMyList, uid)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
