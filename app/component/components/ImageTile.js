import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import string from '../../localization/string';
import Icon from 'react-native-vector-icons/Entypo';
import { primaryColor, greyColor, whiteColor } from '../../asset/style/common';
import { numberFormatter } from '../../util/numberFormatter';
import FitImage from 'react-native-fit-image';

const imageBorderWidth = 1;

class ImageTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tileWidth: undefined,
            tileHeight: undefined,
            isLongImage: false,
        };
        
    }

    componentWillMount(){
        const images = this.props.data.imageUrls;
        if (images.length === 1){
            Image.getSize(images[0], (width, height) => {
                const windowWidth = Dimensions.get('window').width;
                const windowHeight = Dimensions.get('window').height;                 
                const scaledImageHeight = height / (width/windowWidth);
                const isLongImage = scaledImageHeight > windowWidth * 0.8;
                if (isLongImage){
                    this.setState({
                        tileHeight: windowHeight * 0.4,
                        isLongImage: true
                    });
                }
            });
        } else if (images.length > 1){
            let layerCount = Math.floor(images.length / 3 + (images.length % 3 > 0 ? 1 : 0));
            const containerHeight = Dimensions.get('window').width / 3 * layerCount+  imageBorderWidth * layerCount;
            this.setState({tileHeight: containerHeight});
        }
    }

    renderImages(){
        const images = this.props.data.imageUrls;
        if (images.length <= 0){
            return undefined;
        } else if (images.length === 1 ){
            return this.renderOneImage(images[0]);
        } else {
            return this.renderMoreImages();
        }
    }
    renderOneImage(imageUrl){
        return (
            <View style={{
                height: this.state.tileHeight,
            }}>
                <View>
                    {this.state.isLongImage?<Text style={style.longImageBanner}>{string.LongImage}</Text>: null}
                    <FitImage overflow='hidden' source={{uri: imageUrl}}/>                
                </View>
            </View>
        );
    }

    renderMoreImages(){
        const containerWidth = Dimensions.get('window').width / 3;
        const images = this.props.data.imageUrls;
        let imageList = [];
        images.map((image, index) => {
            imageList.push(
                <View key={this.props.data.id + 'image' + index}>
                    <FitImage
                        style={{
                            width: containerWidth,
                            height: containerWidth,
                            borderWidth: imageBorderWidth,
                            borderColor: whiteColor,
                        }}
                        resizeMode={Image.resizeMode.cover}
                        source={{uri: image}} 
                    />
                </View>
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

	render(){
        const { data } = this.props;
		return (
            <View style={style.tileContainer}>
                <View style={style.tileBanner}>
                    <Image style={style.authorPhoto} source={{uri: data.authorPhoto}}/>
                    <Text>{data.authorName}</Text>
                </View>
                <View style={style.textSection}>
                    <Text style={style.text}>
                        <Text style={style.tag}>{'#' + data.tag + "# "}</Text>
                        {data.textContent}
                    </Text>
                </View>
                {this.renderImages()}
                <View style={style.tileBanner}>
                    <View style={style.iconGroup} >
                        <Icon style={style.icon} name="thumbs-up" size={15}/>
                        <Text>{numberFormatter(data.likesCount)}</Text>
                    </View>
                    <View style={style.iconGroup} >
                        <Icon style={style.icon} name="thumbs-down" size={15}/>
                        <Text>{numberFormatter(data.dislikesCount)}</Text>
                    </View>
                    <View style={style.iconGroup} >
                        <Icon style={style.icon} name="typing" size={15}/>
                        <Text>{numberFormatter(data.commentCount)}</Text>
                    </View>
                    <View style={style.iconGroup} >
                        <Icon style={style.icon} name="share" size={15}/>
                        <Text>{numberFormatter(data.shareCount)}</Text>
                    </View>                    
                </View>
            </View>
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
        color: greyColor
    }, 
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    shareGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 10
    }
});

export default ImageTile;
