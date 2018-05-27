import React from 'react';
import { Dimensions, View, Text } from 'react-native'
import { primaryColor, greyColor, whiteColor } from '../../asset/style/common';
import { BannerView } from 'react-native-fbads';
import Config from 'react-native-config'
import firebase from 'react-native-firebase';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');

class AdBannerComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            useFb: true,
            useGAdmob: false,
        }
        this.onFbLoadError = this.onFbLoadError.bind(this);
    }

    onFbLoadError(err) {
        console.log('error', err.nativeEvent);
        this.setState({useFb: false, useGAdmob: true});
    }

    render() {
        const { useFb, useGAdmob } = this.state;
        if (useFb) {
            return (
                <BannerView
                    placementId={Config.fbBannerPlacementId}
                    type="standard"
                    onError={(err) => this.onFbLoadError(err)}
                />
            )
        } else {
            return (
                <Banner
                    unitId={Config.gAdmobUnitId}
                    size={"SMART_BANNER"}
                    request={request.build()}
                />
            )
        }
    }
}


export default AdBannerComponent;
