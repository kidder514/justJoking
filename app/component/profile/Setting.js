import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, ScrollView, Alert, Linking, Picker } from 'react-native';
import { whiteColor, primaryColor, greyColor } from '../../asset/style/common';
import string from '../../localization/string';
import { signOutCall, updatePhotoCall, updateLanguage } from '../../reducer/action/authAction';
import { checkVersionCall } from '../../reducer/action/appAction';
import { Avatar, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import config from '../../config';

class Setting extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			langCode: string.getLanguage(),
		};

		this.checkUpdate = this.checkUpdate.bind(this);
		this.onUpdatePress = this.onUpdatePress.bind(this);
		this.onSelectLang = this.onSelectLang.bind(this);
	}

	componentDidUpdate(prevProps) {
		const { config } = this.props;
		const preConfig = prevProps.config;
		
		if (!config.isCheckingUpdate && preConfig.isCheckingUpdate){
			if (config.hasNewVersion) {
				Alert.alert(
					string.HasNewerVersion,
					string.GoToAppStoreMessage,
					[
						{text: string.GoToAppStore, onPress: this.onUpdatePress},
						{text: string.Cancel}
					]
				)
			} else {
				Alert.alert(
					string.IsNewestVersion,
					string.IsNewestVersionMessage,
					[
						{text: string.OK}
					]
				)
			}
		}
	
	}

	onUpdatePress() {
		Linking.openURL(config.playStoreUrl).catch(err => 
			toastAndroid(string.CantOpenDeepLink)			
		);
	}

	checkUpdate = () => {
		const { checkVersionCall } = this.props;
		checkVersionCall();
	}

	onSelectLang = (langCode) => {
		this.setState({ langCode });
		if (string.getAvailableLanguages().indexOf(langCode) !== -1) {
			const { updateLanguage } = this.props;
			updateLanguage(langCode);
			string.setLanguage(langCode);
		}
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
						onPress={() => this.props.updatePhotoCall()}
						avatar={
							<Avatar
								rounded
								large
								source={user.photoURL == '' ? require('../../asset/image/avatar.png') : { uri: user.photoURL }}
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
					<ListItem 
						avatar={<Icon name="ccw" size={20} color={primaryColor} />}
						titleStyle={style.title}
						title={string.CheckAppUpdates}
						onPress={this.checkUpdate}
					/>
					<ListItem
						avatar={<Icon name="open-book" size={20} color={primaryColor} />}
						titleStyle={style.title}
						title={string.TermsAndConditions}
						onPress={() => navigate('TermCondition')}						
					/>
					<ListItem
						onPress={() => this.props.signOutCall()}
						avatar={<Icon name="log-out" size={20} color={primaryColor} />}
						titleStyle={style.title}
						title={string.SignOut}
					/>
				</List>
				<View style={style.langPickerContainer}>
					<View style={style.langPickerLabelContainer}>
						<Icon name="language" size={20} color={primaryColor} style={{paddingRight: 10}}/>
						<Text>
							{string.ChangeLanguage}
						</Text>
					</View>
					{this.renderLangPicker()}
				</View>
				<View style={style.version}>
					<Text>{string.CurrentVersion + ': ' + config.currentVersion}</Text>
				</View>
			</ScrollView>
		);
	}

	renderLangPicker() {
		const { langCode } = this.state;
		const availableLang = string.getAvailableLanguages();
		const langPickers = availableLang.map((code, index) => {
			return <Picker.Item label={string[code]} value={code} key={'language-index-' + index}/>
		});
		
		return (
			<Picker
				selectedValue={langCode}
				style={{ height: 50, width: 200 }}
				onValueChange={(code, index) => this.onSelectLang(code)}
				mode='dialog'
			>
				{langPickers}
			</Picker>
		)
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
	langPickerContainer: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10,
		marginTop: 20,
		marginBottom: 20,
		backgroundColor: whiteColor,
		borderBottomWidth: 1,
		borderBottomColor: greyColor,
		borderTopWidth: 1,
		borderTopColor: greyColor
	},
	langPickerLabelContainer: {
		flexDirection: 'row',
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
	},
	version: {
		marginLeft: 10,
		marginBottom: 40,
		marginTop: 10
	}
});

const mapStateToProps = (state) => {
	return {
		auth: state.Auth,
		config: state.App,
		language: state.Auth.language
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOutCall: () => { dispatch(signOutCall())},
		updatePhotoCall: () => { dispatch(updatePhotoCall())},
		checkVersionCall: () => { dispatch(checkVersionCall())},
		updateLanguage: (langCode) => {dispatch(updateLanguage(langCode))}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
