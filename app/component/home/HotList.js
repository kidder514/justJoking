import React from 'react';
import { connect } from "react-redux";
import TileList from '../components/TileList';
import EmptyListPage from '../components/EmptyListPage';
import { loadListUpCall, loadListDownCall } from '../../reducer/action/listAction';

class HotList extends React.PureComponent {
	componentDidMount(){
		const { data, loadListUpCall } = this.props;
		if(data.length <= 0) {
			loadListUpCall();
		}
	}

	onRefresh() {
		if (data.length > 0) {
			loadListUpCall('all', data[0].creationTime);
		}
	}

	onEndReached() {
		if (data.length > 0) {
			loadListDownCall('all', data[data.length - 1].creationTime);		
		}
	}

	render(){
		const { data, navigation, isLoading } = this.props;

		if(data.length <= 0) {
			return <EmptyListPage />
		} else {
			return (
				<TileList 
					navigate={navigation.navigate}
					data={data}
					isLoading={isLoading}
					onRefresh={this.onRefresh.bind(this)}
					onEndReached={this.onEndReached.bind(this)}
				/>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.List.hotList,
		isLoading: state.List.isLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadListUpCall: (listType, offsetTime) => dispatch(loadListUpCall(listType, offsetTime)),
		loadListDownCall: (listType, offsetTime) => dispatch(loadListDownCall(listType, offsetTime))		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HotList);
