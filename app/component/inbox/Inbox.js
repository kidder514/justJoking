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

class Inbox extends React.Component {
	static navigationOptions = () => ({
		title: 'inbox',
		header: null,
	});

	render(){
		return (	
			<View style={styles.container}>
				<Text>
					Inbox Screen
				</Text>
			</View>
		);
	}
}

export default Inbox;