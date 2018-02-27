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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
	}
});

export default CommingSoon;
