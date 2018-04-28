import React from 'react';
import { SectionList, StyleSheet, View, Dimensions } from 'react-native';
import { connect } from "react-redux";
import ImageTile from '../components/ImageTile';
import TextTile from '../components/TextTile';
import { ActivityIndicator, Button} from 'react-native';
import { primaryColor } from '../../asset/style/common';
import string from '../../localization/string';
import EmptyListPage from '../components/EmptyListPage';

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
            listHeaderComponent
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
                ListFooterComponent={this.renderFooter()}
                onEndReachedThreshold={0}
            />
		);
    }
    
    renderFooter() {
        const { isLoading, isBottomLoading, data } = this.props;
        if (isLoading || isBottomLoading) {
            return <ActivityIndicator size="large" color={primaryColor} />
        }

        if (data.length <= 0) {
            return (
                <View style={style.emptyPage}>
                    <EmptyListPage/>
                </View>
            );
        } else {
            return this.renderLoadMoreButton();
        }
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
}

const style = StyleSheet.create({
	emptyPage: {
        paddingTop: Dimensions.get('window').width * 0.3,
	}
});

const mapStateToProps = (state) => {
	return {
        isLoading: state.List.isLoading,
		isBottomLoading: state.List.isBottomLoading
	}
}

export default connect(mapStateToProps, undefined)(TileList);

