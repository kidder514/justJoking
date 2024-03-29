import React from 'react';
import { View, Text, StyleSheet, Alert, Button, Image, Linking } from 'react-native';
import string from '../../localization/string';
import { primaryColor } from '../../asset/style/common';
import config from '../../config';

class UpdateReminderPage extends React.PureComponent {

    componentDidMount() {
        Alert.alert(
            string.NeedToUpdateTitle,
            string.NeedToUpdateMessage,
            [
                {text: string.GoToAppStore, onPress: () => this.onPress()},
            ]
        )
    }

    onPress() {
        Linking.openURL(config.playStoreUrl).catch(error =>
			toastAndroid(string.CantOpenDeepLink)
        );
    }   

	render(){
        return (
            <View style={style.container}>
				<Image source={require('../../asset/logo.png')} style={style.logo} />            
                <Text>
                    {string.NeedToUpdateMessage}
                </Text>
                <View style={style.button}>
                    <Button
                        onPress={() => this.onPress()}
                        title={string.GoToAppStore}
                        color={primaryColor}
                        />
                </View>
            </View>
        )
	}
}

const style = StyleSheet.create({
    logo: {
		width: 100,
		height: 100,
		marginBottom: 60,
	},
	container: {
		flex: 1,
		paddingLeft: 30,
		paddingRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 20,
    }
});

export default UpdateReminderPage;
