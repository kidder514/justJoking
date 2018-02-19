import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler } from "react-native";
import {
	NavigationActions,
	TabNavigator,
	StackNavigator,
	TabBarBottom,
	DrawerNavigator,
	HeaderBackButton
} from 'react-navigation';
import string from './localization/string';

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

const AuthNavigator = StackNavigator({
	SignIn: { 
		screen: SignIn,
		navigationOptions: ({ navigation }) => ({ 
			header: null
		})
	},
	SignUp: { screen: SignUp },
	Policy: { screen: Policy },
});

const HomeNavigator = TabNavigator(
	{
		Followed: { screen: FollowedList },
		Hot: { screen: HotList },
		Image: { screen: ImageList },
		Text: { screen: TextList },
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
		Home: { screen: HomeNavigator },
		Search: { screen: Search },
		Post: { screen: PostDrawNavigator },
		Inbox: { screen: Inbox },
		Profile: { screen: Profile },
	}, {
		tabBarComponent: TabBarBottom,
		tabBarPosition: 'bottom',
		animationEnabled: false,
		swipeEnabled: false
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
