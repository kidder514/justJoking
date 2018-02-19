import React from 'react';
import { View, Text } from 'react-native';
import string from '../../localization/string';

class FollowedList extends React.Component {
	static navigationOptions = () => ({
		title: string.Followed,
		header: null,
	});

	render(){
		return (	
			<View >
				<Text>
                FollowedList 
				</Text>
			</View>
		);
	}
}

export default FollowedList;
