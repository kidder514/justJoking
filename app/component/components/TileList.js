import React from 'react';
import { FlatList, StyleSheet, View, Button, Dimensions, RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import ImageTile from '../components/ImageTile';
import TextTile from '../components/TextTile';
import { primaryColor } from '../../asset/style/common';
import string from '../../localization/string';
import EmptyListPage from '../components/EmptyListPage';
import { BannerView } from 'react-native-fbads';
import Config from 'react-native-config'

const AD_GAP = 5;

class TileList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            offsetY: 0
        }
        this.handleScroll = this.handleScroll.bind(this)      
    }

    handleScroll(event, node) {
        this.setState({ offsetY: event.nativeEvent.contentOffset.y });
    }

    render() {
        const {
            isLoading,
            onRefresh,
            navigate,
            listHeaderComponent
        } = this.props;
        return (
            <ScrollView
                onScrollEndDrag={(e) => this.handleScroll(e)}
                onMomentumScrollEnd={(e) => this.handleScroll(e)}
                onRefresh={onRefresh}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                        tintColor={primaryColor}
                    />
                }
            >
                {listHeaderComponent}
                {this.renderContent()}
                {this.renderFooter()}
            </ScrollView>
        );
    }

    renderContent() {
        const { isLoading, data } = this.props;
        if (data && data.length > 0) {
            return this.renderList();
        } else {
            return (
                <View style={style.emptyPage}>
                    <EmptyListPage />
                </View>
            );
        }
    }

    renderList() {
        const { data } = this.props;

        let dataAds = [];
        data.forEach((item, index) => {
            dataAds.push(this.renderItem(item, index));
            if (index % AD_GAP === 0) {
                dataAds.push(
                    <View style={style.adBanner} key={'ad' + index}>
                        <BannerView
                            placementId={Config.fbPlacementId}
                            type="standard"
                            onError={(err) => console.log('error', err.nativeEvent)}
                        />
                    </View>
                );
            }
        });

        return dataAds;
    }

    renderItem(item, index) {
        const { isProfilePage, navigate } = this.props;
        const { offsetY } = this.state;

        switch (item.postType) {
            case 'image':
                return <ImageTile
                    key={'index' + index}
                    data={item}
                    navigator={navigate}
                    isProfilePage={isProfilePage}
                    viewOffsetY={offsetY}
                />;
            case 'text':
                return <TextTile key={'index' + index} data={item} navigator={navigate} isProfilePage={isProfilePage} />;
            case 'video':
                return null;
            default:
                return null;
        }
    }

    renderFooter() {
        const { isBottomLoading, data } = this.props;
        if (isBottomLoading) {
            return <ActivityIndicator size="large" color={primaryColor} />
        } else {
            if (data && data.length > 0) {
                return this.renderLoadMoreButton();
            } else {
                return;
            }
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
    },
    adBanner: {
        marginBottom: 5
    }
});

const mapStateToProps = (state) => {
    return {
        isLoading: state.List.isLoading,
        isBottomLoading: state.List.isBottomLoading
    }
}

export default connect(mapStateToProps, undefined)(TileList);

