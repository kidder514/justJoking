import React from 'react';
import { connect } from "react-redux";
import { View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import { whiteColor, primaryColor, greyColor } from '../../asset/style/common';
import string from '../../localization/string';
import { signOut } from '../../reducer/action/authAction';
import { Avatar, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

class Setting extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const user = this.props.auth;
		return (
			<ScrollView>
				<List key='userSetting' containerStyle={style.listContainer}>
					<ListItem 
						titleStyle={style.title}
						rightTitle={string.Avatar}
						avatar={<Avatar rounded large source={{ uri: user.photo }}/>}
					/>
					<ListItem 
						titleStyle={style.title}
						rightTitle={user.name}
						title={string.UserName}
					/>
					<ListItem 
						titleStyle={style.title}				
						rightTitle={user.id}
						title={string.JokeBuddyId}
					/>
				</List>
				<List>
					<ListItem 
						titleStyle={style.title}				
						title={string.WhoCanSendMeMessages}
					/>
					<ListItem 
						titleStyle={style.title}					
						title={string.AutoPlayGif}
					/>
					<ListItem 
						titleStyle={style.title}				
						title={string.AutoPlayVideos}
					/>
					<ListItem 
						titleStyle={style.title}
						title={string.MakeYourGeolocationPublic}
					/>
				</List>
				<List>
					<ListItem 
						avatar={<Icon name="help-with-circle" size={20} color={primaryColor} />}
						titleStyle={style.title}				
						title={string.Help}
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
				</List>
			</ScrollView>
		);
	}
}

const style = StyleSheet.create({
	listContainer: {
		marginTop: 0
	}, 
	title: {
		fontSize: 14 
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
