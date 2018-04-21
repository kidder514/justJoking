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

        this.onClickDislike = this.onClickDislike.bind(this);
        this.onClickComment = this.onClickComment.bind(this);
        this.onClickShare = this.onClickShare.bind(this);
    }

    componentWillMount() {
        const { images } = this.props.data;
        if (images.length === 1) {
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
        } else if (images.length > 1) {
            let layerCount = Math.floor(images.length / 3 + (images.length % 3 > 0 ? 1 : 0));
            const containerHeight = Dimensions.get('window').width / 3 * layerCount + imageBorderWidth * layerCount;
            this.setState({ tileHeight: containerHeight });
        }
    }

    openModal(index) {
        this.setState({ modalVisible: true, imageIndex: index});
    }

    closeModal() {
        this.setState({ modalVisible: false, mageIndex: undefined });
    }

    onlikeClick() {
        const { data, likeCall } = this.props;
        likeCall(data);
    }

    onClickDislike() {
        const { data, dislikeCall } = this.props;
        dislikeCall(data);
    }

    onClickComment() {
        
    }

    onClickShare() {

    }

    render() {
        const { data, navigator } = this.props;
        return (
            <View style={style.tileContainer}>
                <TouchableOpacity onPress={() => navigator('AuthorProfile')}>
                    <View style={style.tileBanner}>
                        <Image style={style.authorPhoto} source={{ uri: data.authorPhoto }} />
                        <Text>{data.authorName}</Text>
                    </View>
                </TouchableOpacity>
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
                    <TouchableOpacity onPress={() => this.onClickDislike()} style={style.iconGroup} >
                        <Icon style={style.icon} name="thumbs-down" size={15} />
                        <Text>{numberFormatter(data.dislike.length)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onClickComment()} style={style.iconGroup} >
                        <Icon style={style.icon} name="typing" size={15} />
                        <Text>{numberFormatter(data.comment.length)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onClickShare()} style={style.iconGroup} >
                        <Icon style={style.icon} name="share" size={15} />
                        <Text>{numberFormatter(data.share.length)}</Text>
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
                    <FitImage overflow='hidden' source={{ uri: imageUrl }} />
                </View>
            </TouchableHighlight>
        );
    }

    renderMultiImages() {
        const containerWidth = Dimensions.get('window').width / 3;
        const { images, id } = this.props.data;
        let imageList = [];
        images.map((image, index) => {
            imageList.push(
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
                        source={{ uri: image }}
                    />
                </TouchableHighlight>
            );
        });
        return (
            <View style={{
                height: this.state.tileHeight,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {imageList}
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
            <TouchableOpacity onPress={isLiked ? undefined : this.onlikeClick.bind(this)} style={style.iconGroup} >
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

