import React from 'react';
import { connect } from "react-redux";
import TileList from '../components/TileList';

class TextList extends React.PureComponent {

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

export default connect(mapStateToProps)(TextList);
