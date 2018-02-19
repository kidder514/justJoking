import React from 'react';
import { View, Text } from 'react-native';
import string from '../../localization/string';

class HotList extends React.Component {
	static navigationOptions = () => ({
		title: string.Hot,
		header: null,
	});

	render(){
		return (	
			<View >
				<Text>
                HotList 
				</Text>
			</View>
		);
	}
}

export default HotList;
