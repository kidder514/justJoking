import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import { whiteColor, primaryColor } from '../../asset/style/common';
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
		this.props.navigation.setParams({titleParam: this.props.auth.name});
	}

	render() {
		const user = this.props.auth;
		const { navigate } = this.props.navigation;
		return (
			<View style={style.container}>
				<View style={style.headerContainer}>
					<View>
						<Avatar
							large
							rounded
							title={user.name ? user.name.charAt(0).toUpperCase() : ''}
							source={user.photoURL == '' ? require('../../asset/image/avatar.png'): { uri: user.photoURL}}
							activeOpacity={0.7}
						/>
					</View>
					<View >
						<View style={style.profileHightlight}>
							<View >
								<Text style={style.hightlightText}>{user.postCount ? user.postCount : '0'}</Text>
								<Text style={style.hightlightText}>{string.Post}</Text>
							</View>
							{/* TODO: to be added when subscription feature is added */}
							{/* <View>
								<Text style={style.hightlightText}>{user.followers.length}</Text>
								<Text style={style.hightlightText}>{string.Followers}</Text>
							</View>
							<View>
								<Text style={style.hightlightText}>{user.following.length}</Text>
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
				<TileList
					data={this.props.data}
				/>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		backgroundColor: whiteColor,
		flex: 1,
	},
	headerContainer: {
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
		data: state.List.followedList
	}
}

export default connect(mapStateToProps)(Profile);
