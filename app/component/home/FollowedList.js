import React from 'react';
import { connect } from "react-redux";
import TileList from '../components/TileList';

class FollowedList extends React.PureComponent {

	render(){
		return (	
			<TileList 
				data={this.props.data}
				navigate={this.props.navigation.navigate}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.List.followedList
	}
}

export default connect(mapStateToProps)(FollowedList);
