import React from 'react';
import { connect } from "react-redux";
import { Button, View, Text } from 'react-native';
import string from '../../localization/string';
import { signIn } from '../../reducer/action/authAction';

class SignUp extends React.Component {
	constructor(props){
		super(props);
		this.submit = this.submit.bind(this);
	}

	submit(){
		this.props.signIn();
	}

	render(){
		return (	
			<View>
				<Text>
                    Sign Up
				</Text>
				<Button
					onPress={this.submit}
					title={string.SignUp}
					accessibilityLabel={string.SignUp}
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
        signIn: () => { dispatch(signIn())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);