import React from 'react';
import { View, Text } from 'react-native';
import string from '../../localization/string';

class ImageList extends React.Component {
	static navigationOptions = () => ({
		title: string.Image,
		header: null,
	});

	render(){
		return (	
			<View >
				<Text>
                ImageList 
				</Text>
			</View>
		);
	}
}

export default ImageList;
