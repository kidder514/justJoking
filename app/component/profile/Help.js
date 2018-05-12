import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { whiteColor } from '../../asset/style/common';

class Help extends React.PureComponent {

	render() {
		return (
			<ScrollView style={style.container}>
				<Text>
					From the JustJokes developer:
				</Text>
				<Text style={style.linePadding}>
					Welcome to the world of funny things, the purpose of this app is to provide a place for you to relax after a long day of work, study or whatever you do.
					I will be really thankful if you can help me build and grow this community by posting more funny things or asking your friends to download this app. 
				</Text>
				<Text style={style.linePadding}>
					If will be even better if you can click some ads and that will help me cover the cost of my server.
				</Text>
				<Text style={style.linePadding}>
					You can join our facebook group https://www.facebook.com/groups/215145849077262/ to share you thought about this app, 
				</Text>
				<Text>
					or contact me on justjokesapp@gmail.com, I will try my best to get back to you ASAP.
				</Text>
			</ScrollView>
		)
	}
}

const style = StyleSheet.create({
	container: {
		backgroundColor: whiteColor,
		padding: 20,
	},
	linePadding: {
		paddingTop: 10
	}
});

export default Help;
