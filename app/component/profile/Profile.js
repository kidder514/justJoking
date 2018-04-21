import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import { whiteColor, primaryColor } from '../../asset/style/common';
import { loadListUpCall, loadListDownCall, cleanMyList } from '../../reducer/action/listAction';
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
		cleanMyList();
		navigation.setParams({titleParam: this.props.auth.name});
		loadListUpCall('all', undefined, true);
	}

	onRefresh() {
		const { data, loadListUpCall } = this.props;
		
		if (data.length > 0) {
			loadListUpCall('all', data[0].creationTime, true);
		}
	}

	loadMore() {
		const { data, loadListDownCall } = this.props;
		
		if (data.length > 0) {
			loadListDownCall('all', data[data.length - 1].creationTime, true);		
		}
	}

	renderUserInfo() {
		const { auth } = this.props;
		const { navigate } = this.props.navigation;

		return (
			<View style={style.headerContainer}>						
				<View>
					<Avatar
						large
						rounded
						title={auth.name ? auth.name.charAt(0).toUpperCase() : ''}
						source={auth.photoURL == '' ? require('../../asset/image/avatar.png'): { uri: auth.photoURL}}
						activeOpacity={0.7}
					/>
				</View>
				<View >
					<View style={style.profileHightlight}>
						<View >
							<Text style={style.hightlightText}>{auth.postCount ? auth.postCount : '0'}</Text>
							<Text style={style.hightlightText}>{string.Post}</Text>
						</View>
						{/* TODO: to be added when subscription feature is added */}
						{/* <View>
							<Text style={style.hightlightText}>{auth.followers.length}</Text>
							<Text style={style.hightlightText}>{string.Followers}</Text>
						</View>
						<View>
							<Text style={style.hightlightText}>{auth.following.length}</Text>
							<Text style={style.hightlightText}>{string.Following}</Text>
						</View> */}
					</View>
					<View>
						<Button
							title={string.Setting}
							onPress={() => navigate("Setting")}
							outline={true}
							buttonStyle={{
								height: 30,
								backgroundColor: primaryColor,
								width: Dimensions.get('window').width * 0.6,
								alignSelf: 'center'
							}}
						/>
					</View>
				</View>
			</View>
		)
	}

	render() {
		const { data, isLoading, isBottomLoading } = this.props;

		if( data.length > 0) {
			return (
				<TileList
					data={data}
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
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 20,
		paddingBottom: 20
	},
	profileHightlight: {
		width: Dimensions.get('window').width - 95,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	hightlightText: {
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
		loadListUpCall: (listType, offsetTime, isMyList) => dispatch(loadListUpCall(listType, offsetTime, isMyList)),
		loadListDownCall: (listType, offsetTime, isMyList) => dispatch(loadListDownCall(listType, offsetTime, isMyList)),
		cleanMyList: () => dispatch(cleanMyList()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
