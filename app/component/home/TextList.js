import React from 'react';
import { View, Text } from 'react-native';
import string from '../../localization/string';

class TextList extends React.Component {
	static navigationOptions = () => ({
		title: string.Text,
		header: null,
	});

	render(){
		return (	
			<View >
				<Text>
                TextList 
				</Text>
			</View>
		);
	}
}

export default TextList;
