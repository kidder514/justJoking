import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { whiteColor} from '../../asset/style/common';
import Markdown from 'react-native-simple-markdown'

class TermCondition extends React.PureComponent {
	
	render() {
		return (
			<ScrollView style={style.container}>
				<Markdown styles={markdownStyles}>
					There is no such thing as terms and conditions here, I hope you all enjoy this app and find it as a good entertainment after a long day of work or study. If you like this app and are willing to share, upload some funny images or jokes to bring this joke community to another level. {'\n\n'}

					However, there are something that are not allowed here in compliance with the rule of app store. Please follow the following rule otherwise Google might shut down my app. {'\n\n'}
					- No sexually explicit content {'\n'}
					- No hate speech{'\n'}
					- No violence{'\n'}
					- No sensitive events{'\n'}
					- No bullying or harassment{'\n'}
					- No financial instruments{'\n'}
					- No gambling on the app{'\n'}
					- No illegal activities{'\n'}
					- No other inappropriate content{'\n\n\n'}

					Again, thank you for using my app, and hope you can LYAO. 

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


export default TermCondition;
