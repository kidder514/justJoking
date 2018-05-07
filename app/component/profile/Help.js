import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { whiteColor} from '../../asset/style/common';
import Markdown from 'react-native-simple-markdown'

class Help extends React.PureComponent {
	
	render() {
		return (
			<ScrollView style={style.container}>
				<Markdown styles={markdownStyles}>
					
				</Markdown>
			</ScrollView> 
		)
	}
}

const style = StyleSheet.create({
	container: {
		backgroundColor: whiteColor,
		padding: 20,
	}
});

const markdownStyles = {
	heading1: {
		fontSize: 24,
		paddingTop: 8,
		paddingBottom: 8,
		color: 'purple',
	  },
	  link: {
		color: 'pink',
	  },
	  mailTo: {
		color: 'orange',
	  },
	  text: {
		color: '#555555',
	  },
}


export default Help;
