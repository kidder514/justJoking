import React from 'react';
import { 
	StyleSheet, 
	View,
	ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	container: {
	    position: 'absolute',
	    left: 0,
	    right: 0,
	    top: 0,
	    bottom: 0,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor:"white",
	    opacity: 0.3,
	    zIndex: 999
	},
	activityIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 80
	}
});

class ActivityIndicatorWrapper extends React.Component {
	render() {
		return (
	         <View style = {styles.container}>
	            <ActivityIndicator
	               animating = {true}
	               size = "large"
	               style = {styles.activityIndicator}/>
	         </View>
		);
	}
}

export default ActivityIndicatorWrapper;
