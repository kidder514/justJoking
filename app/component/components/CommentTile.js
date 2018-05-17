import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import string from '../../localization/string';
import { primaryColor, greyColor, whiteColor } from '../../asset/style/common';
import Icon from 'react-native-vector-icons/Entypo';
import { commentLikeCall, commentDislikeCall } from "../../reducer/action/listAction";
import { numberFormatter } from '../../util/numberFormatter';

class CommentTile extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onClickLike = this.onClickLike.bind(this);
        this.onClickDislike = this.onClickDislike.bind(this);
    }

    onClickLike() {
        const { data, likeCall, auth, commentLikeCall } = this.props;
        if (data.dislike.indexOf(auth.uid) >= 0) return;
        commentLikeCall(data);
    }

    onClickDislike() {
        const { data, dislikeCall, auth, commentDislikeCall } = this.props;
        if (data.like.indexOf(auth.uid) >= 0) return;
        commentDislikeCall(data);
    }

	render(){
        const { data } = this.props;
		return (
            <View style={style.tileContainer}>
                {this.renderHeader()}
                <Text style={style.text}>
                    {data.comment}
                </Text>
                <View style={style.tileBanner}>
                    {this.renderLike()}
                    {this.renderDislike()}                 
                </View>
            </View>
		);
    }

    renderHeader() {
        const { isProfilePage, data, auth,  navigator } = this.props;
        let pressAction = undefined;
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
        
        return (
            <TouchableOpacity onPress={pressAction}>
                <View style={style.tileBanner}>
                    <Image style={style.authorPhoto} source={{ uri: data.authorPhoto }} />
                    <Text>{data.authorName}</Text>
                </View>
            </TouchableOpacity>
        )
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
    textHighlight : {
        fontSize: 16,
        color: primaryColor
    },
	tag: {
        color: primaryColor,
    },
    icon: {
        marginRight: 5,
    }, 
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    }
});

const mapStateToProps = (state) => {
	return {
		auth: state.Auth
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		commentLikeCall: (data) => dispatch(commentLikeCall(data)),
		commentDislikeCall: (data) => dispatch(commentDislikeCall(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentTile);
