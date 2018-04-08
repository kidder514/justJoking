import React from 'react';
import { SectionList } from 'react-native';
import { connect } from "react-redux";
import ImageTile from '../components/ImageTile';
import TextTile from '../components/TextTile';

class TileList extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false
        }
    }

    renderItem({item}, navigator){
        switch (item.type) {
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
        const { isLoading, onRefresh, onEndReached } = this.props;
		return (
            <SectionList
                refreshing={isLoading}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                initialNumToRender={3}
                renderItem={({item}) => this.renderItem({item}, this.props.navigate)}
                sections={[{key:'tileList', data :this.props.data}]}
                keyExtractor={(item, index) => {
                    return 'item' + index
                }}
            />
		);
	}
}

export default TileList;

