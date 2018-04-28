import React from 'react';
import { connect } from "react-redux";
import TileList from '../components/TileList';
import { loadListUpCall, loadListDownCall } from '../../reducer/action/listAction';

class TextList extends React.PureComponent {
	componentDidMount(){
		const { data, loadListUpCall } = this.props;
		if(data.length <= 0) {
			loadListUpCall('text');
		}
	}

	onRefresh() {
		const { data, loadListUpCall } = this.props;
		if (data.length > 0) {
			loadListUpCall('text', data[0].creationTime);
		} else {
			loadListUpCall('text');			
		}
	}

	loadMore() {
		const { data, loadListDownCall } = this.props;
		
		if (data.length > 0) {
			loadListDownCall('text', data[data.length - 1].creationTime);		
		}
	}

	render(){
		const { data, navigation } = this.props;
		return (
			<TileList 
				navigate={navigation.navigate}
				data={data}
				onRefresh={this.onRefresh.bind(this)}
				loadMore={this.loadMore.bind(this)}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.List.textList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadListUpCall: (listType, offsetTime, isMyList) => dispatch(loadListUpCall(listType, offsetTime, isMyList)),
		loadListDownCall: (listType, offsetTime, isMyList) => dispatch(loadListDownCall(listType, offsetTime, isMyList))		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TextList);
