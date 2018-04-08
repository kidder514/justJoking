import React from 'react';
import { connect } from "react-redux";
import TileList from '../components/TileList';
import EmptyListPage from '../components/EmptyListPage';

class TextList extends React.PureComponent {
	render(){
		const { data, navigation } = this.props;

		if(data.length <= 0) {
			return <EmptyListPage />
		} else {
			return (	
				<TileList 
					navigate={navigation.navigate}
					data={data}				
				/>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.List.textList
	}
}

export default connect(mapStateToProps)(TextList);
