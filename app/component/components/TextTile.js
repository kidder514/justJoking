import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import string from '../../localization/string';
import { primaryColor, greyColor, whiteColor } from '../../asset/style/common';
import Icon from 'react-native-vector-icons/Entypo';
import { numberFormatter } from '../../util/numberFormatter';

class TextTile extends React.Component {

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
        marginBottom: 10
	},
	tileBanner: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
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

export default TextTile;