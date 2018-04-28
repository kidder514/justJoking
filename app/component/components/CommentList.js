import React from 'react';
import { SectionList } from 'react-native';
import { connect } from "react-redux";
import CommentTile from '../components/CommentTile';
import { ActivityIndicator, Button} from 'react-native';
import { primaryColor } from '../../asset/style/common';
import string from '../../localization/string';

class CommentList extends React.PureComponent {

    renderItem({item}, navigator) {
        const { isProfilePage } = this.props;
        return <CommentTile data={item} navigator={navigator} isProfilePage={isProfilePage}/>;
    }

	render() {
        const {
            isLoading, 
            isBottomLoading,
            loadMore,
            navigate,
            data
        } = this.props;

        let header;
        if (isLoading) header = this.renderSpinner();

        let footer;
        if (isLoading) {
            footer = undefined;
        } else if(isBottomLoading) {
            footer = this.renderSpinner();
        } else {
            footer = this.renderLoadMoreButton();
        }

		return (
            <SectionList
                refreshing={true}
                initialNumToRender={10}
                renderItem={({item}) => this.renderItem({item}, navigate)}
                sections={[{key:'commentList', data:data}]}
                keyExtractor={(item, index) => {
                    return 'item' + index
                }}
                ListHeaderComponent={header}
                ListFooterComponent={footer}
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
        isLoading: state.List.isCommentLoading,
        isBottomLoading: state.List.isCommentBottomLoading
	}
}

export default connect(mapStateToProps, undefined)(CommentList);

