import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { whiteColor } from '../../asset/style/common';

class TermCondition extends React.PureComponent {

	render() {
		return (
			<ScrollView style={style.container}>
				<Text>
					There is no such thing as terms and conditions here, I hope you all enjoy this app and find it as a good entertainment after a long day of work or study. If you like this app and are willing to share, upload some funny images or jokes to bring this joke community to another level.
				</Text>

				<Text style={style.linePadding}>
					However, there are something that are not allowed here in compliance with the rule of app store. Please follow the following rule otherwise Google might shut down my app.
				</Text>

				<Text style={style.linePadding}>
					- No sexually explicit content 			
				</Text>
				<Text>
					- No hate speech
				</Text>
				<Text>
					- No violence		
				</Text>
				<Text>
					- No sensitive events
				</Text>
				<Text>
					- No bullying or harassment
				</Text>
				<Text>
					- No financial instruments
				</Text>
				<Text>
					- No gambling on the app
				</Text>
				<Text>
					- No illegal activities
				</Text>
				<Text>
					- No other inappropriate content
				</Text>

				<Text style={style.linePadding}>
					Again, thank you for using my app, and hope you can LYAO. 
				</Text>
			</ScrollView>
		);
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

export default TermCondition;
