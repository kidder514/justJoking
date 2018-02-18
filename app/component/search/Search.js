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

class Search extends React.Component {
	static navigationOptions = () => ({
		title: "search",
		header: null,
	});

	render(){
		return (	
			<View style={styles.container}>
				<Text>
					Search Screen
				</Text>
			</View>
		);
	}
}

export default Search;
