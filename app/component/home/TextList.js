import React from 'react';
import { connect } from "react-redux";
import TileList from '../components/TileList';
import EmptyListPage from '../components/EmptyListPage';
import { loadListUpCall, loadListDownCall } from '../../reducer/action/listAction';
import { primaryColor } from '../../asset/style/common';
import { ActivityIndicator } from 'react-native';

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
		}
	}

	loadMore() {
		const { data, loadListDownCall } = this.props;
		
		if (data.length > 0) {
			loadListDownCall('text', data[data.length - 1].creationTime);		
		}
	}

	render(){
		const { data, navigation, isLoading, isBottomLoading } = this.props;

		if(data.length <= 0) {
			return [
				<EmptyListPage key='empty-list-page'/>,
				<ActivityIndicator key='spinner' size="large" color={primaryColor} />
			];
		} else {
			return (
				<TileList 
					navigate={navigation.navigate}
					data={data}
					isLoading={isLoading}
					onRefresh={this.onRefresh.bind(this)}
					loadMore={this.loadMore.bind(this)}
				/>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.List.textList,
		isLoading: state.List.isLoading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadListUpCall: (listType, offsetTime, isMyList) => dispatch(loadListUpCall(listType, offsetTime, isMyList)),
		loadListDownCall: (listType, offsetTime, isMyList) => dispatch(loadListDownCall(listType, offsetTime, isMyList))		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TextList);
