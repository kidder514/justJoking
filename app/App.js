import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements'
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
import { primaryColor, greyColor, whiteColor, textColor, blackColor } from './asset/style/common';
import Icon from 'react-native-vector-icons/Entypo';

import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';
import Policy from './component/auth/Policy';

import Search from './component/search/Search';
import Inbox from './component/inbox/Inbox';

import Profile from './component/profile/Profile';
import Setting from './component/profile/Setting';

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

const ProfileNavigator = StackNavigator(
	{
		Profile: { 
			screen: Profile,
			navigationOptions: ({ navigation }) => ({ 
				headerRight: 
					<Button
						title={string.Share}
						color={blackColor}
						backgroundColor={whiteColor}
						fontSize={14}
						outline={true}
						buttonStyle={{height:30}}
						borderRadius={5}
					/>,
				headerStyle: {
					height: 40,
				},
				headerTitleStyle: {
					fontWeight: 'normal'
				}
			})
		},
		Setting: { 
			screen: Setting,
			navigationOptions: ({ navigation }) => ({ 
				title: string.Setting,
				headerStyle: {
					height: 40,
				},
				headerTitleStyle: {
					fontWeight: 'normal'
				},
				headerLeft: 
					<Icon 
						name="chevron-thin-left" 
						size={20} 
						style={{paddingLeft: 10}} 
						onPress={ () => { navigation.goBack() }}
					/>
			})
		},		
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
			screen: ProfileNavigator,
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

class App extends React.PureComponent {

	render() {
		if (!!this.props.isSignedIn) {
			return <MainNavigator />;
		} else {
			return <AuthNavigator />;
		}
	}
};

const mapStateToProps = state => ({
	isSignedIn: state.Auth.isSignedIn,
});

export default connect(mapStateToProps)(App);
