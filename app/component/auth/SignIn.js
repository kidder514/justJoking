import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});

class SignIn extends React.Component {
	static navigationOptions = () => ({
		title: "Sign in",
		header: null,
	});

	render(){
		return (	
			<View style={styles.container}>
				<Text>
				SignIn Screen
				</Text>
			</View>
		);
	}
}

export default SignIn;