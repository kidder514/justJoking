import React from 'react';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { Text, View} from 'react-native-elements'
import {
	NavigationActions,
	TabNavigator,
	StackNavigator,
	TabBarBottom,
	TabBarTop,
	DrawerNavigator,
	HeaderBackButton,
} from 'react-navigation';
import { Button } from 'react-native';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
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
import UserNameSetting from './component/profile/UserNameSetting';
import TaglineSetting from './component/profile/TaglineSetting';
import Help from './component/profile/Help';

import FollowedList from './component/home/FollowedList';
import HotList from './component/home/HotList';
import ImageList from './component/home/ImageList';
import TextList from './component/home/TextList';
import Post from './component/home/Post';
import Detail from './component/home/Detail';

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

const PostDrawNavigator = DrawerNavigator(
	{
		Post: { screen: Post }
	}, {
		headerMode: 'none',
		drawerPosition: 'bottom',
		animationEnabled: true
	}
);

const HomePrimaryNavigator = TabNavigator(
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

const HomeNavigator = StackNavigator(
	{
		Home: { 
			screen: HomePrimaryNavigator,
			navigationOptions: {
				header: null
			}
		},
		AuthorProfile: { 
			screen: Profile,
			navigationOptions: ({ navigation }) => ({ 
				headerRight: 
					<Text
						style={{
							backgroundColor: primaryColor,
							color: whiteColor,
							paddingTop:5,
							paddingBottom:5,
							paddingRight: 10,
							paddingLeft: 10,
							marginRight: 20,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
					{string.Share}
					</Text>,
				headerStyle: {
					height: 40,
				},
				headerTitleStyle: {
					fontWeight: 'normal'
				}
			})
		},
		Detail: { 
			screen: Detail,
			navigationOptions: ({ navigation }) => ({ 
				headerRight: 
					<Text
						style={{
							backgroundColor: primaryColor,
							color: whiteColor,
							paddingTop:5,
							paddingBottom:5,
							paddingRight: 10,
							paddingLeft: 10,
							marginRight: 20,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
					{string.Share}
					</Text>,
				headerStyle: {
					height: 40,
				},
				headerTitleStyle: {
					fontWeight: 'normal'
				}
			})
		},
	},{
		transitionConfig: getSlideFromRightTransition		
	}
);

const ProfileNavigator = StackNavigator(
	{
		Profile: { 
			screen: Profile,
			navigationOptions: ({ navigation }) => ({ 
				headerRight: 
					<Text
						style={{
							backgroundColor: primaryColor,
							color: whiteColor,
							paddingTop:5,
							paddingBottom:5,
							paddingRight: 10,
							paddingLeft: 10,
							marginRight: 20,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
					{string.Share}
					</Text>,
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
				title: null,
				headerStyle: {
					height: 40,
				},
				headerTitleStyle: {
					fontWeight: 'normal',
				},
				headerLeft: 
					<Icon 
						name="chevron-thin-left" 
						size={20} 
						style={{paddingLeft: 10}} 
						onPress={ () => { navigation.goBack() }}
					/>,
				headerRight: <Text style={{marginRight:20}}>{string.Setting}</Text>
				
			})
		},
		UserNameSetting: { 
			screen: UserNameSetting,
			navigationOptions: ({ navigation }) => ({ 
				title: null,
				titleStyle: {
				},
				headerStyle: {
					height: 40,
				},
				headerTitleStyle: {
					fontWeight: 'normal',
				},
				headerLeft: <Icon 
						name="chevron-thin-left" 
						size={20} 
						style={{paddingLeft: 10}} 
						onPress={ () => { navigation.goBack() }}
					/>,
				headerRight: <Text style={{marginRight:20}}>{string.UserName}</Text>

			})
		},
		TaglineSetting: { 
			screen: TaglineSetting,
			navigationOptions: ({ navigation }) => ({ 
				title: null,
				titleStyle: {
				},
				headerStyle: {
					height: 40,
				},
				headerTitleStyle: {
					fontWeight: 'normal',
				},
				headerLeft: <Icon 
						name="chevron-thin-left" 
						size={20} 
						style={{paddingLeft: 10}} 
						onPress={ () => { navigation.goBack() }}
					/>,
				headerRight: <Text style={{marginRight:20}}>{string.Tagline}</Text>

			})
		},
		Help: { 
			screen: Help,
			navigationOptions: ({ navigation }) => ({ 
				title: null,
				titleStyle: {
				},
				headerStyle: {
					height: 40,
				},
				headerTitleStyle: {
					fontWeight: 'normal',
				},
				headerLeft: <Icon 
						name="chevron-thin-left" 
						size={20} 
						style={{paddingLeft: 10}} 
						onPress={ () => { navigation.goBack() }}
					/>,
				headerRight: <Text style={{marginRight:20}}>{string.Help}</Text>
			})
		},
	},{
		headerMode: 'float',
		transitionConfig: getSlideFromRightTransition
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
	componentDidMount(){
		SplashScreen.hide();
	}

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
