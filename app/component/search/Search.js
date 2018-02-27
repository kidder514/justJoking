import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
import string from '../../localization/string';
import { whiteColor, primaryColor, greyColor } from '../../asset/style/common';
import { SearchBar } from 'react-native-elements'


class Search extends React.PureComponent {
	static navigationOptions = () => ({
		title: string.Search,
		header: null,
	});

	render(){
		return (	
			<View >
				<SearchBar
					lightTheme
					clearIcon
					showLoadingIcon={false}
					icon={{style: {fontSize: 20}}}
					onChangeText={() => {}}
					onClearText={() => {}}
					placeholder={string.TypeHere}
					containerStyle={{backgroundColor: whiteColor}}
					inputStyle={{backgroundColor: whiteColor, paddingLeft: 40}}
				/>
			</View>
		);
	}
}


const style = StyleSheet.create({
	container: {
		backgroundColor: whiteColor,
		height: 40,
	},
	input: {
		backgroundColor: greyColor
	}
});

const mapStateToProps = (state) => {
	return {
		auth: state.Auth,
		data: state.List.followedList
	}
}

export default connect(mapStateToProps)(Search);
