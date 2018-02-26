import React from 'react';
import { SectionList } from 'react-native';
import ImageTile from '../components/ImageTile';
import TextTile from '../components/TextTile';

class TileList extends React.PureComponent {

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

	render(){
		return (
            <SectionList
                renderItem={this.renderItem}
                sections={[{key:'tileList', data : this.props.data}]}
                keyExtractor={(item, index) => {
                    return 'item' + index
                }}
            />
		);
	}
}

export default TileList;
