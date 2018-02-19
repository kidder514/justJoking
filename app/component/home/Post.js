import React from 'react';
import { View, Text } from 'react-native';
import string from '../../localization/string';

class Post extends React.Component {
	static navigationOptions = () => ({
		title: string.Post,
		header: null,
	});

	render(){
		return (	
			<View >
				<Text>
				Post 
				</Text>
			</View>
		);
	}
}

export default Post;
