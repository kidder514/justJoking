import React from 'react';
import { SectionList } from 'react-native';
import ImageTile from '../components/ImageTile';
import TextTile from '../components/TextTile';

class TileList extends React.Component {

    renderItem({item}){
        switch (item.type) {
            case 'image':
                return <ImageTile data={item}/>;
            case 'text':
                return <TextTile data={item}/>;
            case 'video':
                return;
            default:
                return;
        }
    }

    handleData

	render(){
		return (
            <SectionList
                renderItem={this.renderItem}
                sections={[{data : this.props.data}]}
            />
		);
	}
}

export default TileList;
