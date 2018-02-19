import React from 'react';
import { View, Text } from 'react-native';
import string from '../../localization/string';

class Search extends React.Component {
	static navigationOptions = () => ({
		title: string.Search,
		header: null,
	});

	render(){
		return (	
			<View >
				<Text>
					Search Screen
				</Text>
			</View>
		);
	}
}

export default Search;
