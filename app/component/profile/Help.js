import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, } from 'react-native';
import { whiteColor} from '../../asset/style/common';
import string from '../../localization/string';

const maxCharCount = 50;

class Help extends React.PureComponent {
	
	render() {
		const user = this.props.auth;
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
		backgroundColor: whiteColor,
	}
});

const mapStateToProps = (state) => {
	return {
		auth: state.Auth
	}
}

export default connect(mapStateToProps)(Help);
