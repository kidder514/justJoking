import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler } from "react-native";
import { 
	addNavigationHelpers,
	NavigationActions, 
	TabNavigator, 
	StackNavigator
} from 'react-navigation';

import Home from './component/home/Home';
import Search from './component/search/Search';
import Inbox from './component/inbox/Inbox';
import Profile from './component/profile/Profile';
import SignIn from './component/auth/SignIn';

export const AppNavigator = TabNavigator({
	Home: { screen: Home },
	Search: { screen: Search},
	Inbox: { screen: Inbox },
	Profile: {screen: Profile }
});

export const WrapperNavigator = StackNavigator({
	Main: { screen: AppNavigator },
	Signin: { screen: SignIn }
});

class AppWithNavigationState extends React.Component{
	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
	}

	onBackPress = () => {
		const { dispatch, nav} = this.props;

		// these lines break the tap nagivation
		// if (nav.index == 0) {
		// 	return true;
		// }
		
		dispatch(NavigationActions.back());
		return true;
	};

	render() {
		const { dispatch, nav } = this.props;
		const navigation = addNavigationHelpers({
			dispatch,
			state: nav
		});

		return <AppNavigator navigation={navigation} />;
	}
};

AppWithNavigationState.propTypes = {
	dispatch: PropTypes.func.isRequired,
	nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	nav: state.Nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
