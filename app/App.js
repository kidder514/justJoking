import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements'
import { init } from './reducer/action/appAction';
import {
	TabNavigator,
	StackNavigator,
	TabBarBottom,
	TabBarTop,
} from 'react-navigation';
import { View, ActivityIndicator, StyleSheet, Dimensions, Button, Alert, Linking } from 'react-native';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import string from './localization/string';
import { primaryColor, whiteColor, textColor } from './asset/style/common';
import Icon from 'react-native-vector-icons/Entypo';
import config from './config';

import UpdateReminderPage from './component/components/UpdateReminderPage';

import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';
import TermCondition from './component/profile/TermCondition';

import Profile from './component/profile/Profile';
import AuthorProfile from './component/profile/AuthorProfile';
import Setting from './component/profile/Setting';
import UserNameSetting from './component/profile/UserNameSetting';
import TaglineSetting from './component/profile/TaglineSetting';
import Help from './component/profile/Help';

import HotList from './component/home/HotList';
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
		TermCondition: { screen: TermCondition },
	}, {
		navigationOptions: {
			headerStyle: {
				shadowRadius: 0,
				elevation: 0
			}
		}
	}
);

const PostNavigator = StackNavigator(
	{
		Post: { screen: Post },
	}, {
		headerMode: 'none',
	}
);

const HomePrimaryNavigator = TabNavigator(
	{
		Hot: { screen: HotList,
			navigationOptions: ({ navigation }) => ({
				title: string.Hot
			})
		}
	}, {
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
			screen: AuthorProfile,
			navigationOptions: ({ navigation }) => ({
				tabBarVisible: false,
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
				tabBarVisible: false,
				headerStyle: {
					height: 40,
				},
				headerTitleStyle: {
					fontWeight: 'normal'
				}
			})
		},
	}, {
		transitionConfig: getSlideFromRightTransition
	}
);

const ProfileNavigator = StackNavigator(
	{
		Profile: {
			screen: Profile,
			navigationOptions: ({ navigation }) => ({
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
				tabBarVisible: false ,
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
						style={{ paddingLeft: 10 }}
						onPress={() => { navigation.goBack() }}
					/>,
				headerRight: <Text style={{ marginRight: 20 }}>{string.Setting}</Text>

			})
		},
		UserNameSetting: {
			screen: UserNameSetting,
			navigationOptions: ({ navigation }) => ({
				title: null,
				tabBarVisible: false,
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
					style={{ paddingLeft: 10 }}
					onPress={() => { navigation.goBack() }}
				/>,
				headerRight: <Text style={{ marginRight: 20 }}>{string.UserName}</Text>

			})
		},
		TaglineSetting: {
			screen: TaglineSetting,
			navigationOptions: ({ navigation }) => ({
				title: null,
				tabBarVisible: false,
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
					style={{ paddingLeft: 10 }}
					onPress={() => { navigation.goBack() }}
				/>,
				headerRight: <Text style={{ marginRight: 20 }}>{string.Tagline}</Text>

			})
		},
		Help: {
			screen: Help,
			navigationOptions: ({ navigation }) => ({
				title: null,
				tabBarVisible: false,
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
					style={{ paddingLeft: 10 }}
					onPress={() => { navigation.goBack() }}
				/>,
				headerRight: <Text style={{ marginRight: 20 }}>{string.Help}</Text>
			})
		},
		TermCondition: {
			screen: TermCondition,
			navigationOptions: ({ navigation }) => ({
				title: null,
				tabBarVisible: false,
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
					style={{ paddingLeft: 10 }}
					onPress={() => { navigation.goBack() }}
				/>,
				headerRight: <Text style={{ marginRight: 20 }}>{string.TermCondition}</Text>
			})
		},
	}, {
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
		Post: {
			screen: PostNavigator,
			navigationOptions: {
				tabBarVisible: false,
				title: string.Post,
				tabBarLabel: () => { null },
				tabBarIcon: () => (
					<Icon name="squared-plus" size={44} color={primaryColor} />
				),
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
	componentDidMount() {
		const { init, language } = this.props;
		SplashScreen.hide();
		if (language !== '') { string.setLanguage(language); }

		init();
	}

	componentDidUpdate(prevProps) {
		const { config } = this.props;
		const preConfig = prevProps.config;
		
		if (config.isInitialVersionCheckFinished && !preConfig.isInitialVersionCheckFinished) {
			if (config.hasNewVersion && !config.isForceUpdateNeeded) {
				Alert.alert(
					string.HasNewerVersion,
					string.GoToAppStoreMessage,
					[
						{text: string.GoToAppStore, onPress: this.onUpdatePress.bind(this)},
						{text: string.Cancel}
					]
				)
			}
		}
	}

	onRetry = () => {
		const { init } = this.props;		
		init();		
	}
	
	onUpdatePress() {
		Linking.openURL(config.playStoreUrl).catch(err => 
			toastAndroid(string.CantOpenDeepLink)			
		);
	}

	render() {
		const { config, isSignedIn, isLoading, loadingText } = this.props;
		const showUpdatePopUp = config.hasNewVersion && !config.isForceUpdateNeeded;

		if (config.isInitiating) {
			return (
				<View style={style.fullPage}>
					<ActivityIndicator size="large" color={primaryColor} />				
				</View>
			)
		}

		if (!config.isInitialVersionCheckFinished) {
			return (
				<View style={style.fullPage}>
					<Text style={style.retryText}>{string.ServerNotAbleToInit}</Text>
					<View>
						<Button
							onPress={this.onRetry}
							title={string.Retry}
							color={primaryColor}
						/>
					</View>
				</View>
			)
		}

		if (config.isForceUpdateNeeded) {
			return <UpdateReminderPage />
		}
		
		if (!!isSignedIn) {
			return (
				<View style={style.outterWrapper}>
					<MainNavigator />
					{isLoading && <View style={style.container}>
						<ActivityIndicator size="large" color={primaryColor} />
						<Text>{loadingText}</Text>						
					</View>}
					
				</View>
			);
		} else {
			return (
				<View style={style.outterWrapper}>
					<AuthNavigator/>
					{isLoading && <View style={style.container}>
						<ActivityIndicator size="large" color={primaryColor} />
						<Text style={style.spinnerText}>{loadingText}</Text>
					</View>}
				</View>
			);
		}
	}
};

const style = StyleSheet.create({
	fullPage: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 40,
		paddingRight: 40
	},
	retryText: {
		textAlign: 'center',
		paddingBottom: 20,
	},
	outterWrapper:{
		flex: 1,
		width: Dimensions.get('window').width,	
	},
	container: {
		flex: 1,		
		width: Dimensions.get('window').width,
		backgroundColor: 'rgba(255,255,255, 0.8)',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 40,
		paddingRight: 40
	},
	spinnerText: {
		textAlign: 'center'
	}
})

const mapStateToProps = state => ({
	isSignedIn: state.Auth.isSignedIn,
	isLoading: state.Ui.isLoading,
	loadingText: state.Ui.loadingText,
	config: state.App,
	language: state.Auth.language
});

const mapDispatchToProps = (dispatch) => {
	return {
		init: () => {dispatch(init())}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
