import React from 'react';
import { View, Text } from 'react-native';
import string from '../../localization/string';
import CommingSoon from '../CommingSoon';

class Inbox extends React.PureComponent {
	static navigationOptions = () => ({
		title: string.Inbox,
		header: undefined,
	});

	render(){
		return (	
			<CommingSoon />
		);
	}
}

export default Inbox;