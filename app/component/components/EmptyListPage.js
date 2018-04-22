import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import string from '../../localization/string';

class EmptyListPage extends React.PureComponent {

	render(){
        return (
            <View style={style.container}>
                <Text>
                    {string.PostEmpty}
                </Text>
            </View>
        )
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

export default EmptyListPage;
