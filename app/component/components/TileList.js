import React from 'react';
import { SectionList } from 'react-native';
import { connect } from "react-redux";
import ImageTile from '../components/ImageTile';
import TextTile from '../components/TextTile';
import { ActivityIndicator, Button} from 'react-native';
import { primaryColor } from '../../asset/style/common';
import string from '../../localization/string';

class TileList extends React.PureComponent {
    renderItem({item}, navigator) {
        const { isProfilePage } = this.props;

        switch (item.postType) {
            case 'image':
                return <ImageTile data={item} navigator={navigator} isProfilePage={isProfilePage}/>;
            case 'text':
                return <TextTile data={item} navigator={navigator} isProfilePage={isProfilePage}/>;
            case 'video':
                return null;
            default:
                return null;
        }
    }

	render() {
        const { 
            isLoading, 
            onRefresh, 
            onEndReached, 
            navigate, 
            data, 
            listHeaderComponent, 
            isBottomLoading
        } = this.props;
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
                ListHeaderComponent={listHeaderComponent}
                ListFooterComponent={isBottomLoading ? this.renderSpinner() : this.renderLoadMoreButton()}
                onEndReachedThreshold={0}
            />
		);
    }
    
	renderLoadMoreButton() {
		return (
			<Button
				onPress={this.props.loadMore}
				title={string.LoadMore}
				accessibilityLabel={string.LoadMore}
				color={primaryColor}
			/>
		)
	}

	renderSpinner() {
        return <ActivityIndicator key='spinner' size="large" color={primaryColor} />;
	}
}

const mapStateToProps = (state) => {
	return {
		isBottomLoading: state.List.isBottomLoading
	}
}

export default connect(mapStateToProps, undefined)(TileList);

