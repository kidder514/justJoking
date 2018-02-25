import React from 'react';
import { connect } from "react-redux";
import TileList from '../components/TileList';

class HotList extends React.Component {

	render(){
		return (	
			<TileList 
				data={this.props.data}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.List.followedList
	}
}

export default connect(mapStateToProps)(HotList);
