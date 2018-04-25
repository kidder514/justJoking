import React from 'react';
import { View, Text } from 'react-native';
import string from '../../localization/string';
import ImageTile from '../components/ImageTile';
import TextTile from '../components/TextTile';

class Detail extends React.PureComponent {
	static navigationOptions = ({ navigation, navigationOptions }) => {
	};

	render(){
		const { navigation } = this.props;
		const params = navigation.state.params;

		if (params.data.postType === 'image'){
			return (	
				<View >
					<ImageTile
						isOnDetailPage={true} 
						data={params.data} 
						navigator={params.navigator} 
						isProfilePage={params.isProfilePage}
					/>
				</View>
			);
		} else {
			return (
				<View >
					<TextTile 
						isOnDetailPage={true}
						data={params.data} 
						navigator={params.navigator} 
						isProfilePage={params.isProfilePage}
					/>
				</View>
			);
		}
	}
}

export default Detail;
