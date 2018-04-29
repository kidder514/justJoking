import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Modal, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import string from '../../localization/string';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Entypo';
import { primaryColor, greyColor, whiteColor } from '../../asset/style/common';
import { numberFormatter } from '../../util/numberFormatter';
import { likeCall, dislikeCall } from "../../reducer/action/listAction";
import FitImage from 'react-native-fit-image';
import Gallery from 'react-native-image-gallery';

const imageBorderWidth = 1;

class ImageTile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tileWidth: undefined,
            tileHeight: undefined,
            isLongImage: false,
            modalVisible: false,
            imageIndex: undefined
        };
        this.onClickLike = this.onClickLike.bind(this);
        this.onClickDislike = this.onClickDislike.bind(this);
        this.onClickComment = this.onClickComment.bind(this);
        this.onClickShare = this.onClickShare.bind(this);
    }

    componentDidMount() {
        const { images } = this.props.data;
        if (images.length > 1) {
            let layerCount = Math.floor(images.length / 3 + (images.length % 3 > 0 ? 1 : 0));
            const containerHeight = Dimensions.get('window').width / 3 * layerCount + imageBorderWidth * layerCount;
            this.setState({ tileHeight: containerHeight });
        }
    }

    checkSingleImageSize() {
        const { images } = this.props.data;
        Image.getSize(images[0], (width, height) => {
            const windowWidth = Dimensions.get('window').width;
            const windowHeight = Dimensions.get('window').height;
            const scaledImageHeight = height / (width / windowWidth);
            const isLongImage = scaledImageHeight > windowWidth * 0.8;
            if (isLongImage) {
                this.setState({
                    tileHeight: windowHeight * 0.4,
                    isLongImage: true
                });
            }
        });
    }

    openModal(index) {
        this.setState({ modalVisible: true, imageIndex: index});
    }

    closeModal() {
        this.setState({ modalVisible: false, mageIndex: undefined });
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
        const { navigation, isOnDetailPage } = this.props;

        if (navigation && navigation.state.params && navigation.state.params.isFromList) return;
        if (isOnDetailPage) return ;
        
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

    onClickShare() {

    }

    render() {
        const { data } = this.props;    
        return (
            <View style={style.tileContainer}>
                {this.renderHeader()}
                <View style={style.textSection}>
                    <Text style={style.text}>
                        {(data.tag && data.tag !== '') && 
                            <Text style={style.tag}>{'#' + data.tag + "# "}</Text>
                        }
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
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}
                >
                    {this.renderGallery()}
                </Modal>
            </View >
		);
    }

    renderHeader() {
        const { isProfilePage, data, auth,  navigator } = this.props;
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

        const navigationAction = isProfilePage? undefined : action;

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
        return (
            <TouchableHighlight 
                style={{height: this.state.tileHeight}}
                onPress={() => this.openModal(0)}
            >
                <View>
                    {this.state.isLongImage ? <Text style={style.longImageBanner}>{string.LongImage}</Text> : undefined}
                    <FitImage onLoad={this.checkSingleImageSize.bind(this)} overflow='hidden' source={{ uri: imageUrl }} />
                </View>
            </TouchableHighlight>
        );
    }

    renderMultiImages() {
        const containerWidth = Dimensions.get('window').width / 3;
        const { thumbnails, id } = this.props.data;
        let thumbnailList = [];
        thumbnails.map((thumbnail, index) => {
            thumbnailList.push(
                <TouchableHighlight
                    key={id + 'image' + index}
                    onPress={() => this.openModal(index)}
                >
                    <FitImage
                        style={{
                            width: containerWidth,
                            height: containerWidth,
                            borderWidth: imageBorderWidth,
                            borderColor: whiteColor,
                        }}
                        resizeMode={Image.resizeMode.cover}
                        source={{ uri: thumbnail }}
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
        if(this.state.imageIndex !== undefined) {
            let images = [];
            this.props.data.images.map((imageUrl) => {
                images.push({source: { uri: imageUrl }});
            });
            return (
                <Gallery
                    style={{ flex: 1, backgroundColor: 'black' }}
                    images={images}
                    initialPage={this.state.imageIndex}
                />
            );
        } else {
            return undefined;
        }
    }

    renderLike() {
        const { data, auth } = this.props;
        let icon;
        let count;
        const isLiked = data.like.indexOf(auth.uid) >= 0;
        if (isLiked) {
            icon = <Icon style={style.icon} name="thumbs-up" size={15} color={primaryColor}/>;
            count = <Text style={style.textHighlight}>{numberFormatter(data.like.length)}</Text>;
        } else {
            icon = <Icon style={style.icon} name="thumbs-up" size={15}/>;
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
            icon = <Icon style={style.icon} name="thumbs-down" size={15} color={primaryColor}/>;
            count = <Text style={style.textHighlight}>{numberFormatter(data.dislike.length)}</Text>;
        } else {
            icon = <Icon style={style.icon} name="thumbs-down" size={15}/>;
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
        marginBottom: 10,
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
        width: Dimensions.get('window').width,
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

