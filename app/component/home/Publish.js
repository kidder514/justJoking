import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import { primaryColor, greyColor, whiteColor, textColor, blackColor } from '../../asset/style/common';
import string from '../../localization/string';
import ImagePicker from 'react-native-image-crop-picker';

class Publish extends React.PureComponent {
	render(){
		const { navigate } = this.props.navigation;

		return (	
			<View style={style.container}>
				
				<Text style={style.text}>{string.PostSomethingFunny}</Text>
				<Button 
					style={style.button}
					onPress={() => navigate('Publish')}
					title={string.Go}
					color={primaryColor}
				/>
			</View>
		);
	}
}

const style = StyleSheet.create({
    container: {
		backgroundColor: whiteColor,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 30
	},
	button: {
	}
});


export default Publish;
