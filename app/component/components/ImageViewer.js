import React from 'react';
import { Dimensions, View, Text, StyleSheet, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'
import { primaryColor, greyColor, whiteColor, blackColor } from '../../asset/style/common';
import PhotoView from 'react-native-photo-view';
import string from '../../localization/string';
import Icon from 'react-native-vector-icons/Entypo';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class ImageViewer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { source } = this.props;
        let content;
        if (!source || !source.uri) {
            content = this.renderMessage();
        } else {
            content = this.renderPhotoView();
        }
        
        const { onClose } = this.props;
        return (         
            <Modal
                animationType={'fade'}
                onRequestClose={onClose}
            >
                {content}
                {this.renderFooter()}
            </Modal>    
        );
    }

    renderMessage() {
        return (
            <View style={style.emptyView}>
                <Text style={style.emptyViewText}>
                    {string.NoImageSource}
                </Text>
            </View>
        );
    }

    renderPhotoView() {
        const { source, onTap, onViewTap, onClose } = this.props;
        return (
            <PhotoView
                source={{uri: source.uri}}
                minimumZoomScale={0.5}
                maximumZoomScale={10}
                androidScaleType="fitStart"
                onTap={onClose}
                onViewTap={onClose}
                style={style.photoView} 
                loadingIndicatorSource={<ActivityIndicator style={style.galleryLoadingSpinner} size={30} color={primaryColor} />}
            />
        );
    }
    
    renderFooter() {
        const { onClickComment } = this.props;
        return (
            <View style={style.galleryFooter}>
                {this.renderDownloadButton()}
                {/* <TouchableOpacity
                    onPress={() => this.onClickShare()}
                    style={style.galleryButton}
                >
                    <Icon name="share" size={25} color={whiteColor} />
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => onClickComment()}
                    style={style.galleryButton}
                >
                    <Icon name="typing" size={35} color={whiteColor} />
                </TouchableOpacity>
            </View>
        )
    }

    renderDownloadButton() {
        const { isDownloading, onClickDownload } = this.props;

        if (isDownloading) {
            return <ActivityIndicator size="small" color={whiteColor} />;
        } else {
            return (
                <TouchableOpacity
                    onPress={() => onClickDownload()}
                    style={style.galleryButtonLeft}
                >
                    <Icon name="download" size={35} color={whiteColor} />
                </TouchableOpacity>
            )
        }
    }
}


const style = StyleSheet.create({
    emptyView: {
		flex: 1,
		paddingLeft: 30,
		paddingRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: blackColor,
    },
    emptyViewText: {
        color: whiteColor
    },
    photoView: {
        width: screenWidth,
        height: screenHeight,
        backgroundColor: blackColor
    },
    galleryFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 0,
        height: 50,
        paddingLeft: 30,
        paddingRight: 30,
        width: screenWidth,
        backgroundColor: 'rgba(0,0,0, 0.6)',
    },
    galleryButton: {
        marginLeft: 20
    },
    gallerRightFooter: {
        flexDirection: 'row'
    },
    galleryLoadingSpinner: {
        position: 'absolute',
        left: screenWidth / 2 - 15,
        top: screenHeight / 2 - 30
    }
});

export default ImageViewer;
