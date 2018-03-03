import React from 'react';
import { SectionList } from 'react-native';
import { connect } from "react-redux";
import ImageTile from '../components/ImageTile';
import TextTile from '../components/TextTile';

class TileList extends React.PureComponent {

    renderItem({item}, navigator){
        switch (item.type) {
            case 'image':
                return <ImageTile data={item} navigator={navigator}/>;
            case 'text':
                return <TextTile data={item} navigator={navigator}/>;
            case 'video':
                return;
            default:
                return;
        }
    }

	render(){
		return (
            <SectionList
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

