import React from 'react';
import { connect } from "react-redux";
import { Button, View, Text } from 'react-native';
import string from '../../localization/string';
import { signOut } from '../../reducer/action/authAction';

class Profile extends React.Component {
	static navigationOptions = () => ({
		title: string.Profile,
		header: null,
	});

	constructor(props){
		super(props);
		this.submit = this.submit.bind(this);
	}

	submit(){
		this.props.signOut();
	}

	render(){
		return (	
			<View >
				<Text>
					Profile Screen
				</Text>
				<Button
					onPress={this.submit}
					title={string.SignOut}
					accessibilityLabel={string.SignOut}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.Auth
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => { dispatch(signOut())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
