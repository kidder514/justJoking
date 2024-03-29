import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    CameraRoll
} from 'react-native';
import string from '../../localization/string';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Entypo';
import { primaryColor, whiteColor } from '../../asset/style/common';
import { numberFormatter } from '../../util/numberFormatter';
import ImageViewer from './ImageViewer'
import { likeCall } from "../../reducer/action/listAction";
import LazyImage from './LazyImage';
import RNFetchBlob from 'react-native-fetch-blob'
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { toastAndroid } from '../../reducer/action/appAction';
import { requestExternalStoragePermission } from '../../util/permission';
import config from '../../config';
import { loadEnd, loadOn } from '../../reducer/action/uiAction';

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
            offset: undefined,
            imagePath: '',
            imageBase64: '',
            isDownloading: false
        };
        this.onClickLike = this.onClickLike.bind(this);
        this.onClickComment = this.onClickComment.bind(this);
        this.onClickShare = this.onClickShare.bind(this);
        this.onClickDownload = this.onClickDownload.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onLayout = this.onLayout.bind(this);
        this.onImageLoad = this.onImageLoad.bind(this);
        this.onDownloadOn = this.onDownloadOn.bind(this);
        this.onDownloadEnd = this.onDownloadEnd.bind(this);
    }

    componentDidMount() {
        const { images } = this.props.data;
        if (images.length > 1) {
            let layerCount = Math.floor(images.length / 3 + (images.length % 3 > 0 ? 1 : 0));
            const containerHeight = screenWidth / 3 * layerCount + imageBorderWidth * layerCount;
            this.setState({ tileHeight: containerHeight });
        }
    }

    componentDidUpdate(prevProps) {
        const { viewOffsetY } = this.props;
        const { offset } = this.state;
        if (prevProps.viewOffsetY !== viewOffsetY) {
            if (offset != undefined) {
                if ((offset + screenHeight * 0.4) >= viewOffsetY && offset <= (viewOffsetY + screenHeight)) {
                    this.setState({ shouldLoad: true });
                } else {
                    this.setState({ shouldLoad: false });            
                }
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
        likeCall(data);
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

    onDownloadOn() {
        this.setState({ isDownloading: true });
    }

    onDownloadEnd() {
        this.setState({ isDownloading: false });
    }

    onClickShare() {
        const { data } = this.props;
        const { imagePath, imageBase64 } = this.state;
        let imageUrl = data.images[0].toLowerCase();
        let fileExtension;
        if (imageUrl.indexOf('gif') !== -1) {
            fileExtension = "gif";
        } else if(imageUrl.indexOf('jpg') !== -1 || imageUrl.indexOf('jpeg') !== -1) {
            fileExtension = "jpg";
        } else if (imageUrl.indexOf('png') !== -1) {
            fileExtension = "png";
        } else {
            fileExtension = "png";
        }
        
        if (imagePath !== "") {
            console.log("path");
            console.log("iamge path:" + imagePath);
            console.log("image base 64" + imageBase64);
            console.log("DocumentDirectoryPath" + RNFS.DocumentDirectoryPath);
            console.log(RNFS.CachesDirectoryPath);

            let shareOptions = {
                title: string.FromFunnyThings + " " + config.playStoreUrl,
                type: 'image/' + fileExtension,
                message: string.FromFunnyThings + " " + config.playStoreUrl,
                url: 'data:image/'+fileExtension+';base64,'+imageBase64,
                subject: string.FromFunnyThings + " " + config.playStoreUrl,
                showAppsToView: true
              };
    
            Share.open(shareOptions).catch((err) => { err && console.log(err); })
        } else {

        }
    }

    onClickDownload() {
        const { data, loadEnd, loadOn } = this.props;
        const { imagePath } = this.state;
        if (imagePath !== '') {
            loadOn();
            this.onDownloadOn()
            CameraRoll.saveToCameraRoll(imagePath, 'photo')
            .then(() => {
                loadEnd();
                this.onDownloadEnd();
                toastAndroid(string.ImageHasBeenSaved)
            })
            .catch(err => {
                loadEnd();
                this.onDownloadEnd();
                toastAndroid(string.ImageSavingFailed)
                console.log('err:', err)
            });
        } else {
            let imageUrl = data.images[0].toLowerCase();
            let fileExtension;
            if (imageUrl.indexOf('gif') !== -1) {
                fileExtension = "gif";
            } else if(imageUrl.indexOf('jpg') !== -1 || imageUrl.indexOf('jpeg') !== -1) {
                fileExtension = "jpg";
            } else if (imageUrl.indexOf('png') !== -1) {
                fileExtension = "png";
            } else {
                fileExtension = "png";
            }
    
            const { images } = this.props.data
            loadOn();
            this.onDownloadOn();
            requestExternalStoragePermission()
            .then(() => {
                RNFetchBlob
                .config({
                    fileCache: true,
                    appendExt: fileExtension
                })
                .fetch('GET', images[0])
                .then((res) => {
                    CameraRoll.saveToCameraRoll(res.path(), 'photo')
                        .then(() => {
                            loadEnd();
                            this.onDownloadEnd();
                            toastAndroid(string.ImageHasBeenSaved);
                            this.setState({imagePath: res.path()}, () => {
                                res.base64().then(data => this.setState({imageBase64: data}));
                            });
                        })
                        .catch(err => {
                            loadEnd();
                            this.onDownloadEnd();
                            toastAndroid(string.ImageSavingFailed)
                            console.log('err:', err)
                        })
                })
                .catch(error => {
                    loadEnd();
                    this.onDownloadEnd();
                    toastAndroid(string.ImageSavingFailed)
                    console.log(error);
                })
            });
        }
    }

    onImageLoad = () => {
        const { images } = this.props.data;
        Image.getSize(images[0], (width, height) => {
            const finalHeight = height/(width/screenWidth);
            if (finalHeight > 2 * screenHeight) {
                this.setState({isLongImage: true})
            }
        });
    }

    render() {
        const { data } = this.props;
        const { isModalVisible, isDownloading } = this.state;
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
                    <TouchableOpacity onPress={() => this.onClickComment()} style={style.iconGroup} >
                        <Icon style={style.icon} name="typing" size={15} />
                        <Text>{numberFormatter(data.commentCount)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onClickShare()} style={style.iconGroup} >
                        <Icon style={style.icon} name="share" size={15} />
                        <Text>{numberFormatter(data.share)}</Text>
                    </TouchableOpacity>
                </View>
                {isModalVisible &&
                    <ImageViewer 
                        source={{uri: data.images[0]}}
                        onClose={() => this.closeModal()}
                        onClickComment={() => this.onClickComment()}
                        onClickDownload={() => this.onClickDownload()}
                        onClickShare={() => this.onClickShare()}
                        isDownloading={isDownloading}
                    />
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
                        onImageLoad={this.onImageLoad}
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
        if (thumbnails && thumbnails.length <= 0) return;

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
});

const mapStateToProps = (state) => {
    return {
        auth: state.Auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeCall: (data) => dispatch(likeCall(data)),
        loadOn: () => dispatch(loadOn()),
        loadEnd: () => dispatch(loadEnd())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageTile);
