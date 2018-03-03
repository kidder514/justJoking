import React from 'react';
import { connect } from "react-redux";
import TileList from '../components/TileList';

class ImageList extends React.PureComponent {

	render(){
		return (	
			<TileList 
				navigate={this.props.navigation.navigate}
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

export default connect(mapStateToProps)(ImageList);
