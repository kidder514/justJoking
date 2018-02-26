import React from 'react';
import { connect } from "react-redux";
import { View, Text, Button, StyleSheet} from 'react-native';
import { whiteColor, primaryColor, greyColor } from '../../asset/style/common';
import string from '../../localization/string';
import { signOut } from '../../reducer/action/authAction';
import { Avatar } from 'react-native-elements';

class Setting extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	submit() {
		this.props.signOut();
	}

	render() {
		const user = this.props.auth;
		return (
			<View >
				<Avatar
					medium
					rounded
					title={user.name ? user.name.charAt(0).toUpperCase() : ''}
					source={{ uri: user.photo }}
					onPress={() => console.log("Works!")}
					activeOpacity={0.7}
				/>
				<View>
					<View>
						<View>
							<Text>{user.postCount}</Text>
							<Text>{string.Post}</Text>
						</View>
						<View>
							<Text>{string.Followers}</Text>
						</View>
						<View>
							<Text>{string.Following}</Text>
						</View>
					</View>
					<View>
						<Button
							onPress={this.submit}
							title={string.SignOut}
							accessibilityLabel={string.SignOut}
						/>
					</View>
				</View>
				<Button
					onPress={this.submit}
					title={string.SignOut}
					accessibilityLabel={string.SignOut}
				/>
			</View>
		);
	}
}

const style = StyleSheet.create({
	tileContainer: {
		backgroundColor: whiteColor,
		marginBottom: 10,
	},
	tileBanner: {
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: whiteColor,
	},
	authorPhoto: {
		width: 30,
		height: 30,
		borderRadius: 15,
		marginRight: 10,
	},
	textSection: {
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5,
		marginBottom: 5,
		flexWrap: 'wrap',
	},
	text: {
		fontSize: 16
	},
	tag: {
		color: primaryColor,
	},
	longImageBanner: {
		position: 'absolute',
		zIndex: 10,
		textAlign: 'center',
		backgroundColor: 'rgba(42, 44, 44, 0.7)',
		color: whiteColor,
	},
	icon: {
		marginRight: 5,
		color: greyColor
	},
	iconGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 10
	},
	shareGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		right: 10
	}
});

const mapStateToProps = (state) => {
	return {
		auth: state.Auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => {
			dispatch(signOut())
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
