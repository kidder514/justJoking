import React from 'react';
import { connect } from "react-redux";
import { View, Text, Button, StyleSheet, ScrollView, Clipboard} from 'react-native';
import { whiteColor, primaryColor, greyColor } from '../../asset/style/common';
import string from '../../localization/string';
import { signOut } from '../../reducer/action/authAction';
import { Avatar, List, ListItem, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

class Setting extends React.PureComponent {
	constructor(props) {
		super(props);
	}


	async copyToClipboard(){
		Clipboard.setString(this.props.auth.id);
	}

	onCopy(){
		this.copyToClipboard().then( () => {
			console.log('successfully copied')
		})
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
						avatar={<Avatar rounded large source={{ uri: user.photo }}/>}
					/>
					<ListItem 
						titleStyle={style.title}
						rightTitle={user.name}
						title={string.UserName}
						onPress={() => navigate('UserNameSetting')}
					/>
					<ListItem 
						titleStyle={style.title}				
						rightTitle={user.id}
						hideChevron={true}
						label={
							<Text 
								style={style.copyButton} 
								onPress={() => this.onCopy()}
							>
								{string.Copy}
							</Text>
						}
						title={string.JokeBuddyId}
					/>
					<ListItem 
						titleStyle={style.title}
						onPress={() => navigate('TaglineSetting')}						
						title={string.Tagline}
					/>
				</List>
				<List>
					<View style={style.checkBoxItem}>
						<Text>{string.WhoCanSendMeMessages}</Text>
						<CheckBox 
							containerStyle={style.checkbox}
							checked={true}
							checkedColor={primaryColor}
						/>
					</View>
					<View style={style.checkBoxItem}>
						<Text>{string.AutoPlayGif}</Text>
						<CheckBox 
							containerStyle={style.checkbox}
							checkedColor={primaryColor}
						/>
					</View>
					<View style={style.checkBoxItem}>
						<Text>{string.AutoPlayVideos}</Text>
						<CheckBox 
							containerStyle={style.checkbox}
							checked={true}
							checkedColor={primaryColor}
						/>
					</View>
					<View style={style.checkBoxItem}>
						<Text>{string.MakeYourGeolocationPublic}</Text>
						<CheckBox 
							containerStyle={style.checkbox}
							checkedColor={primaryColor}
						/>
					</View>
				</List>
				<List>
					<ListItem 
						avatar={<Icon name="help-with-circle" size={20} color={primaryColor} />}
						titleStyle={style.title}				
						title={string.Help}
						onPress={() => navigate('Help')}
					/>
					<ListItem 
						avatar={<Icon name="trash" size={20} color={primaryColor} />}
						titleStyle={style.title}
						title={string.CleanCache}
					/>
					<ListItem 
						avatar={<Icon name="phone" size={20} color={primaryColor} />}
						titleStyle={style.title}				
						title={string.ContactUs}
					/>
					<ListItem 
						avatar={<Icon name="ccw" size={20} color={primaryColor} />}
						titleStyle={style.title}
						title={string.CheckAppUpdates}
					/>
					<ListItem 
						avatar={<Icon name="open-book" size={20} color={primaryColor} />}
						titleStyle={style.title}				
						title={string.TermsAndConditions}
					/>
					<ListItem 
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
		signOut: () => {
			dispatch(signOut())
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
