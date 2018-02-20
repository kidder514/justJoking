import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler } from "react-native";
import {
	NavigationActions,
	TabNavigator,
	StackNavigator,
	TabBarBottom,
	TabBarTop,
	DrawerNavigator,
	HeaderBackButton
} from 'react-navigation';
import string from './localization/string';
import { primaryColor, greyColor, whiteColor, textColor } from './asset/style/common';
import Icon from 'react-native-vector-icons/Entypo';

import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';
import Policy from './component/auth/Policy';

import Search from './component/search/Search';
import Inbox from './component/inbox/Inbox';
import Profile from './component/profile/Profile';

import FollowedList from './component/home/FollowedList';
import HotList from './component/home/HotList';
import ImageList from './component/home/ImageList';
import TextList from './component/home/TextList';
import Post from './component/home/Post';

const AuthNavigator = StackNavigator(
	{
		SignIn: { 
			screen: SignIn,
			navigationOptions: ({ navigation }) => ({ 
				header: null
			})
		},
		SignUp: { screen: SignUp },
		Policy: { screen: Policy },
	},{
		navigationOptions: {
			headerStyle: {
				shadowRadius: 0,
				elevation: 0
			}
		}
	}
);

const HomeNavigator = TabNavigator(
	{
		Followed: { screen: FollowedList },
		Hot: { screen: HotList },
		Image: { screen: ImageList },
		Text: { screen: TextList },
		
	},{
		tabBarComponent: TabBarTop,
		tabBarPosition: 'top',
		tabBarOptions: {
			scrollEnabled: true,
			indicatorStyle: {
				backgroundColor: primaryColor,
				width: 30,
				left: 35,
			},
			style: {
				height: 40,
				backgroundColor: whiteColor,
				shadowRadius: 0,
				elevation: 0,
			},
			labelStyle: {
				color: textColor,
			},
			tabStyle: {
				width: 100,
			}
		}
	}
);

const PostDrawNavigator = DrawerNavigator(
	{
		Post: { screen: Post }
	}, {
		headerMode: 'none',
		drawerPosition: 'bottom',
		animationEnabled: true
	}
);

const MainNavigator = TabNavigator(
	{
		Home: { 
			screen: HomeNavigator,
			navigationOptions: {
				title: string.Home,
				tabBarIcon: ({ focused, tintColor }) => (
					focused ? 
						<Icon name="home" size={30} color={primaryColor} /> :
						<Icon name="home" size={30} color={tintColor} />						
				)
			}
		},
		Search: { 
			screen: Search,
			navigationOptions: {
				title: string.Search,
				tabBarIcon: ({ focused, tintColor }) => (
					focused ? 
						<Icon name="magnifying-glass" size={30} color={primaryColor} /> :
						<Icon name="magnifying-glass" size={30} color={tintColor} />						
				)
			}
		},
		Post: { 
			screen: PostDrawNavigator,
			navigationOptions: {
				title: string.Post,
				tabBarLabel: () => {null},
				tabBarIcon: () => ( 
					<Icon name="squared-plus" size={44} color={primaryColor} /> 				
				),
			}
		},
		Inbox: { 
			screen: Inbox,
			navigationOptions: {
				title: string.Inbox,
				tabBarIcon: ({ focused, tintColor }) => (
					focused ? 
						<Icon name="message" size={30} color={primaryColor} /> :
						<Icon name="message" size={30} color={tintColor} />						
				)
			}
		},
		Profile: { 
			screen: Profile,
			navigationOptions: {
				title: string.Profile,
				tabBarIcon: ({ focused, tintColor }) => (
					focused ? 
						<Icon name="user" size={25} color={primaryColor} /> :
						<Icon name="user" size={25} color={tintColor} />						
				)
			}
		},
	}, {
		tabBarComponent: TabBarBottom,
		tabBarPosition: 'bottom',
		animationEnabled: false,
		swipeEnabled: false,
		tabBarOptions: {
			activeTintColor: primaryColor,
			showIcon: true,
			labelStyle: {
				fontSize: 12
			}
		}
	}
);

class App extends React.Component {

	render() {
		if (this.props.isSignedIn) {
			return <MainNavigator />;
		} else {
			return <AuthNavigator />;
		}
	}
};

const mapStateToProps = state => ({
	isSignedIn: state.Auth.isSignedIn
});

export default connect(mapStateToProps)(App);
