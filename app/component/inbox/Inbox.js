import React from 'react';
import { View, Text } from 'react-native';
import string from '../../localization/string';

class Inbox extends React.Component {
	static navigationOptions = () => ({
		title: string.Inbox,
		header: null,
	});

	render(){
		return (	
			<View >
				<Text>
					Inbox Screen
				</Text>
			</View>
		);
	}
}

export default Inbox;