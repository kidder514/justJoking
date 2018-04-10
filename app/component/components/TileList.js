import React from 'react';
import { SectionList } from 'react-native';
import { connect } from "react-redux";
import ImageTile from '../components/ImageTile';
import TextTile from '../components/TextTile';
import { ActivityIndicator } from 'react-native';
import { primaryColor } from '../../asset/style/common';

class TileList extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false
        }
    }

    renderItem({item}, navigator){
        switch (item.postType) {
            case 'image':
                return <ImageTile data={item} navigator={navigator}/>;
            case 'text':
                return <TextTile data={item} navigator={navigator}/>;
            case 'video':
                return null;
            default:
                return null;
        }
    }

	render(){
        const { isLoading, onRefresh, onEndReached, navigate, data } = this.props;
		return (
            <SectionList
                refreshing={isLoading}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                initialNumToRender={10}
                renderItem={({item}) => this.renderItem({item}, navigate)}
                sections={[{key:'tileList', data:data}]}
                keyExtractor={(item, index) => {
                    return 'item' + index
                }}
                ListFooterComponent={<ActivityIndicator size="large" color={primaryColor} />}
                onEndReachedThreshold={0}
            />
		);
	}
}

export default TileList;

