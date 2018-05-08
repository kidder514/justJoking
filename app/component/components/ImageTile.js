import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    Modal,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator,
    CameraRoll
} from 'react-native';
import string from '../../localization/string';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Entypo';
import { primaryColor, greyColor, whiteColor, blackColor } from '../../asset/style/common';
import { numberFormatter } from '../../util/numberFormatter';
import { likeCall, dislikeCall } from "../../reducer/action/listAction";
import ImageViewer from 'react-native-image-zoom-viewer';
import LazyImage from './LazyImage';
import RNFetchBlob from 'react-native-fetch-blob'
import { toastAndroid } from '../../reducer/action/appAction';
import { requestExternalStoragePermission } from '../../util/permission';

const imageBorderWidth = 1;
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class ImageTile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tileWidth: undefined,
            tileHeight: undefined,
            isLongImage: false,
            isModalVisible: false,
            imageIndex: undefined,
            shouldLoad: false,
            offset: undefined
        };
        this.onClickLike = this.onClickLike.bind(this);
        this.onClickDislike = this.onClickDislike.bind(this);
        this.onClickComment = this.onClickComment.bind(this);
        this.onClickShare = this.onClickShare.bind(this);
        this.onClickDownload = this.onClickDownload.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onLayout = this.onLayout.bind(this);
    }

    componentDidMount() {
        const { images } = this.props.data;
        if (images.length > 1) {
            let layerCount = Math.floor(images.length / 3 + (images.length % 3 > 0 ? 1 : 0));
            const containerHeight = screenWidth / 3 * layerCount + imageBorderWidth * layerCount;
            this.setState({ tileHeight: containerHeight });
        }
    }

    componentWillUpdate(nextProps) {
        const { viewOffsetY } = this.props;
        const { shouldLoad, offset } = this.state;

        if (!shouldLoad && viewOffsetY !== nextProps.viewOffsetY) {
            if (offset && nextProps.viewOffsetY > (offset - screenHeight)) {
                this.setState({ shouldLoad: true });
            }
        }
    }

    openModal(index) {
        this.setState({ isModalVisible: true, imageIndex: index });
    }

    closeModal() {
        this.setState({ isModalVisible: false, mageIndex: undefined });
    }

    onClickLike() {
        const { data, likeCall, auth } = this.props;
        if (data.dislike.indexOf(auth.uid) >= 0) return;
        likeCall(data);
    }

    onClickDislike() {
        const { data, dislikeCall, auth } = this.props;
        if (data.like.indexOf(auth.uid) >= 0) return;
        dislikeCall(data);
    }

    onClickComment() {
        this.closeModal();
        const { navigation, isOnDetailPage } = this.props;

        if (navigation && navigation.state.params && navigation.state.params.isFromList) return;
        if (isOnDetailPage) return;

        const { data, navigator, isProfilePage } = this.props;
        navigator({
            routeName: 'Detail',
            params: {
                isFromList: true,
                navigator,
                data,
                isProfilePage
            }
        });
    }

    onLayout(event) {
        if (event.nativeEvent.layout.y < screenHeight) {
            this.setState({ shouldLoad: true });
        }
        this.setState({ offset: event.nativeEvent.layout.y });
    }

    onClickShare() {

    }

    onClickDownload() {
        const { images } = this.props.data
        requestExternalStoragePermission()
        .then(() => {
            RNFetchBlob
            .config({
                fileCache: true,
            })
            .fetch('GET', images[0])
            .then((res) => {
                CameraRoll.saveToCameraRoll(res.path())
                    .then(toastAndroid(string.ImageHasBeenSaved))
                    .catch(err => console.log('err:', err))
            });
        });
    }

    render() {
        const { data } = this.props;
        const { isModalVisible } = this.state;
        return (
            <View style={style.tileContainer} onLayout={(e) => this.onLayout(e)} >
                {this.renderHeader()}
                <View style={style.textSection}>
                    <Text style={style.text}>
                        {/* {(data.tag && data.tag !== '') && 
                            <Text style={style.tag}>{'#' + data.tag + "# "}</Text>
                        } */}
                        {data.text}
                    </Text>
                </View>
                {this.renderImages()}
                <View style={style.tileBanner}>
                    {this.renderLike()}
                    {this.renderDislike()}
                    <TouchableOpacity onPress={() => this.onClickComment()} style={style.iconGroup} >
                        <Icon style={style.icon} name="typing" size={15} />
                        <Text>{numberFormatter(data.comment)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onClickShare()} style={style.iconGroup} >
                        <Icon style={style.icon} name="share" size={15} />
                        <Text>{numberFormatter(data.share)}</Text>
                    </TouchableOpacity>
                </View>
                {isModalVisible &&
                    <Modal
                        // visible={true}
                        animationType={'fade'}
                        onRequestClose={() => this.closeModal()}
                    >
                        {this.renderGallery()}
                    </Modal>
                }
            </View >
        );
    }

    renderHeader() {
        const { isProfilePage, data, auth, navigator } = this.props;
        let action = undefined;
        if (data.author !== auth.uid) {
            action = () => navigator({
                routeName: 'AuthorProfile',
                params: {
                    isAuthor: true,
                    uid: data.author,
                    name: data.authorName,
                    photoURL: data.authorPhoto,
                    tagline: data.authorTagline
                }
            });
        }

        const navigationAction = isProfilePage ? undefined : action;

        return (
            <TouchableOpacity onPress={navigationAction}>
                <View style={style.tileBanner}>
                    <Image style={style.authorPhoto} source={{ uri: data.authorPhoto }} />
                    <Text>{data.authorName}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderImages() {
        const { images } = this.props.data;
        if (images.length <= 0) return undefined;

        if (images.length === 1) {
            return this.renderOneImage(images[0]);
        } else {
            return this.renderMultiImages();
        }
    }

    renderOneImage(imageUrl) {
        const { isLongImage, shouldLoad } = this.state;
        const height = screenHeight * 0.4;
        return (
            <TouchableHighlight
                style={{
                    height,
                    width: screenWidth
                }}
                onPress={() => this.openModal(0)}
            >
                <View>
                    {isLongImage ? <Text style={style.longImageBanner}>{string.LongImage}</Text> : undefined}
                    <LazyImage
                        height={height}
                        imageUrl={imageUrl}
                        isSingleImage={true}
                        shouldLoad={shouldLoad}
                    />
                </View>
            </TouchableHighlight>
        );
    }

    renderMultiImages() {
        const containerWidth = screenWidth / 3;
        const { thumbnails, id } = this.props.data;
        const { shouldLoad } = this.state;
        let thumbnailList = [];
        thumbnails.map((thumbnail, index) => {
            thumbnailList.push(
                <TouchableHighlight
                    key={id + 'image' + index}
                    onPress={() => this.openModal(index)}
                    style={{
                        width: containerWidth,
                        height: containerWidth,
                        borderWidth: imageBorderWidth,
                        borderColor: whiteColor,
                    }}
                >
                    <LazyImage
                        width={containerWidth}
                        height={containerWidth}
                        imageUrl={thumbnail}
                        isSingleImage={false}
                        shouldLoad={shouldLoad}
                    />
                </TouchableHighlight>
            );
        });
        return (
            <View style={{
                height: this.state.tileHeight,
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {thumbnailList}
            </View>
        );
    }

    renderGallery() {
        if (this.state.imageIndex !== undefined) {
            const images = this.props.data.images.map((imageUrl) => {
                return { url: imageUrl };
            });
            return (
                <ImageViewer
                    imageUrls={images}
                    enableImageZoom={true}
                    index={this.state.imageIndex}
                    failImageSource={{ uri: require('../../asset/image/placeholdersmall.jpg') }}
                    loadingRender={() => <ActivityIndicator size="large" color={primaryColor} />}
                    onClick={() => this.closeModal()}
                    renderIndicator={() => { }}
                    renderFooter={() => this.renderFooter()}
                />
            );
        } else {
            return undefined;
        }
    }

    renderFooter() {
        return (
            <View style={style.galleryFooter}>
                <TouchableOpacity
                    onPress={() => this.onClickDownload()}
                    style={style.galleryButtonLeft}
                >
                    <Icon name="download" size={25} color={whiteColor} />
                </TouchableOpacity>
                <View style={style.gallerRightFooter}>
                    <TouchableOpacity
                        onPress={() => this.onClickShare()}
                        style={style.galleryButton}
                    >
                        <Icon name="share" size={25} color={whiteColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onClickComment()}
                        style={style.galleryButton}
                    >
                        <Icon name="typing" size={25} color={whiteColor} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderLike() {
        const { data, auth } = this.props;
        let icon;
        let count;
        const isLiked = data.like.indexOf(auth.uid) >= 0;
        if (isLiked) {
            icon = <Icon style={style.icon} name="thumbs-up" size={15} color={primaryColor} />;
            count = <Text style={style.textHighlight}>{numberFormatter(data.like.length)}</Text>;
        } else {
            icon = <Icon style={style.icon} name="thumbs-up" size={15} />;
            count = <Text>{numberFormatter(data.like.length)}</Text>;
        }

        return (
            <TouchableOpacity onPress={this.onClickLike} style={style.iconGroup} >
                {icon}
                {count}
            </TouchableOpacity>
        );
    }

    renderDislike() {
        const { data, auth } = this.props;
        let icon;
        let count;
        const isDisliked = data.dislike.indexOf(auth.uid) >= 0;
        if (isDisliked) {
            icon = <Icon style={style.icon} name="thumbs-down" size={15} color={primaryColor} />;
            count = <Text style={style.textHighlight}>{numberFormatter(data.dislike.length)}</Text>;
        } else {
            icon = <Icon style={style.icon} name="thumbs-down" size={15} />;
            count = <Text>{numberFormatter(data.dislike.length)}</Text>;
        }

        return (
            <TouchableOpacity onPress={this.onClickDislike} style={style.iconGroup} >
                {icon}
                {count}
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    tileContainer: {
        backgroundColor: whiteColor,
        marginBottom: 5,
    },
    tileBanner: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: whiteColor,
    },
    authorPhoto: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    textSection: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        flexWrap: 'wrap',
    },
    text: {
        fontSize: 16
    },
    textHighlight: {
        fontSize: 16,
        color: primaryColor
    },
    tag: {
        color: primaryColor,
    },
    longImageBanner: {
        position: 'absolute',
        zIndex: 10,
        textAlign: 'center',
        backgroundColor: 'rgba(42, 44, 44, 0.7)',
        color: whiteColor,
        width: screenWidth,
    },
    icon: {
        marginRight: 5,
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    shareGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 10
    },
    galleryFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        paddingLeft: 30,
        paddingRight: 30,
        width: screenWidth,
        backgroundColor: 'rgba(0,0,0, 0.6)',
    },
    galleryButton: {
        marginLeft: 15
    },
    gallerRightFooter: {
        flexDirection: 'row'
    }
});

const mapStateToProps = (state) => {
    return {
        auth: state.Auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeCall: (data) => dispatch(likeCall(data)),
        dislikeCall: (data) => dispatch(dislikeCall(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageTile);

