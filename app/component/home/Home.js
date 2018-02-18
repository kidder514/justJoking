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

class Home extends React.Component {
	static navigationOptions = () => ({
		title: 'Home',
		header: null,
	});

	render(){
		return (	
			<View style={styles.container}>
				<Text>
					Home Screen
				</Text>
			</View>
		);
	}
}

export default Home;
