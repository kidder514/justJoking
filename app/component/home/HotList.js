import React from 'react';
import { connect } from "react-redux";
import TileList from '../components/TileList';
import { loadListUpCall, loadListDownCall } from '../../reducer/action/listAction';

class HotList extends React.PureComponent {
	constructor(props, context) {
		super(props, context)	
	}
	
	componentDidMount(){
		const { data, loadListUpCall } = this.props;
		if(data.length <= 0) {
			loadListUpCall();
		}
	}

	onRefresh() {
		const { data, loadListUpCall } = this.props;
		if (data.length > 0) {
			loadListUpCall('all', data[0].creationTime);
		} else {
			loadListUpCall();		
		}
	}

	loadMore() {
		const { data, loadListDownCall } = this.props;
		
		if (data.length > 0) {
			loadListDownCall('all', data[data.length - 1].creationTime);		
		}
	}

	render(){
		const { data, navigation, isLoading } = this.props;
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
		data: state.List.hotList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadListUpCall: (listType, offsetTime, isMyList) => dispatch(loadListUpCall(listType, offsetTime, isMyList)),
		loadListDownCall: (listType, offsetTime, isMyList) => dispatch(loadListDownCall(listType, offsetTime, isMyList))		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HotList);
