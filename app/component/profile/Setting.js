import React from 'react';
import { connect } from "react-redux";
import { View, Text, Button, StyleSheet, ScrollView, Clipboard} from 'react-native';
import { whiteColor, primaryColor, greyColor } from '../../asset/style/common';
import string from '../../localization/string';
import { signOutCall } from '../../reducer/action/authAction';
import { Avatar, List, ListItem, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

class Setting extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const user = this.props.auth;
		const { navigate } = this.props.navigation;
		return (
			<ScrollView>
				<List containerStyle={style.listContainer}>
					<ListItem 
						titleStyle={style.title}
						rightTitle={string.Avatar}
						avatar={
							<Avatar 
								rounded 
								large 
								source={user.photoURL == '' ? require('../../asset/image/avatar.png'): { uri: user.photoURL}}
								activeOpacity={0.7}
							/>
						}
					/>
					<ListItem 
						titleStyle={style.title}
						rightTitle={user.name}
						title={string.UserName}
						onPress={() => navigate('UserNameSetting')}
					/>
					<ListItem 
						rightTitle={!!user.tagline ? user.tagline : string.AddTagline}
						titleStyle={style.title}
						onPress={() => navigate('TaglineSetting')}						
						title={string.Tagline}
					/>
				</List>
				{/* <List> */}
					{/* TODO: inbox feature to be implemted */}
					{/* <View style={style.checkBoxGroup}>
						<Text>{string.WhoCanSendMeMessages}</Text>
						<View style={style.checkboxGroupContainer}>
							<CheckBox 
								containerStyle={style.checkbox}
								checked={true}
								checkedIcon='dot-circle-o'
								uncheckedIcon='circle-o'
								checkedColor={primaryColor}
							/>
							<CheckBox 
								containerStyle={style.checkbox}
								checked={false}
								checkedIcon='dot-circle-o'
								uncheckedIcon='circle-o'
								checkedColor={primaryColor}
							/>
							<CheckBox 
								containerStyle={style.checkbox}
								checked={true}
								checkedIcon='dot-circle-o'
								uncheckedIcon='circle-o'
								checkedColor={primaryColor}
							/>
						</View>
					</View> */}
					{/* TODO auto play gif option */}
					{/* <View style={style.checkBoxItem}>
						<Text>{string.AutoPlayGif}</Text>
						<CheckBox 
							checked={user.autoPlayGif}
							containerStyle={style.checkbox}
							checkedColor={primaryColor}
						/>
					</View> */}
					{/* TODO Video support */}
					{/* <View style={style.checkBoxItem}>
						<Text>{string.AutoPlayVideos}</Text>
						<CheckBox 
							containerStyle={style.checkbox}
							checked={user.autoPlayVideos}
							checkedColor={primaryColor}
						/>
					</View> */}
					{/* TODO Geolocation visibility */}
					{/* <View style={style.checkBoxItem}>
						<Text>{string.MakeYourGeolocationPublic}</Text>
						<CheckBox 
							checked={user.publicLocation}						
							containerStyle={style.checkbox}
							checkedColor={primaryColor}
						/>
					</View> */}
				{/* </List> */}
				<List>
					<ListItem 
						avatar={<Icon name="help-with-circle" size={20} color={primaryColor} />}
						titleStyle={style.title}				
						title={string.Help}
						onPress={() => navigate('Help')}
					/>
					{/* TODO clean Cache */}
					{/* <ListItem 
						avatar={<Icon name="trash" size={20} color={primaryColor} />}
						titleStyle={style.title}
						title={string.CleanCache}
					/> */}
					{/* TODO contact us */}
					{/* <ListItem 
						avatar={<Icon name="phone" size={20} color={primaryColor} />}
						titleStyle={style.title}				
						title={string.ContactUs}
					/> */}
					{/* TODO check app update */}
					{/* <ListItem 
						avatar={<Icon name="ccw" size={20} color={primaryColor} />}
						titleStyle={style.title}
						title={string.CheckAppUpdates}
					/> */}
					<ListItem 
						avatar={<Icon name="open-book" size={20} color={primaryColor} />}
						titleStyle={style.title}				
						title={string.TermsAndConditions}
					/>
					<ListItem 
						onPress={() => this.props.signOutCall()}						
						avatar={<Icon name="log-out" size={20} color={primaryColor} />}
						titleStyle={style.title}				
						title={string.SignOut}
					/>
				</List>
			</ScrollView>
		);
	}
}

const style = StyleSheet.create({
	listContainer: {
		marginTop: 0
	}, 
	checkBoxItem: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 20,
		borderBottomWidth: 1,
		borderBottomColor: greyColor
	},
	// TODO inbox feature to be implemented.
	// checkBoxGroup: {
	// 	justifyContent: 'center',
	// 	flexDirection: 'column',
	// 	alignItems: 'flex-start',
	// 	paddingLeft: 20,
	// 	borderBottomWidth: 1,
	// 	borderBottomColor: greyColor
	// },
	// checkboxGroupContainer: {
	// 	flexDirection: 'row'
	// },
	checkbox: {
		backgroundColor: whiteColor,
		width: 60,
		borderWidth: 0
	},
	title: {
		fontSize: 14,
	}, 
	copyButton: {
		backgroundColor: greyColor,
		color: whiteColor,
		marginRight: 20,
		marginLeft: 20,
		paddingLeft: 10,
		paddingRight: 10
	}
});

const mapStateToProps = (state) => {
	return {
		auth: state.Auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOutCall: () => {dispatch(signOutCall())}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
