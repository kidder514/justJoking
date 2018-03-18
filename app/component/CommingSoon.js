import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import string from '../localization/string';

class CommingSoon extends React.PureComponent {

	render(){
		return (	
			<View style={style.container}>
                <Text>
                    {string.FeatureCommingSoon}
                </Text>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 30,
		paddingRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
	}
});

export default CommingSoon;
