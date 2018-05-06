import React from 'react';
import { Dimensions, View } from 'react-native'
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import { primaryColor } from '../../asset/style/common';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class LazyImage extends React.PureComponent {

    renderPlaceholder() {
        const { height, width, isSingleImage } = this.props;
        const placeholderSmallPath = require('../../asset/image/placeholdersmall.jpg');
        const placeholderLargePath = require('../../asset/image/placeholderlarge.jpg');
        return(
            <View style={{height, width}}>
                <Image 
                    source={isSingleImage? placeholderSmallPath : placeholderLargePath}
                    style={{height, width}}
                    overflow='hidden'
                    resizeMode={'cover'}
                />
            </View>
        )
    }
    render() {
        const { imageUrl, height, width, shouldLoad } = this.props;
        if (shouldLoad) {
            return <Image 
                source={{uri: imageUrl}}
                style={{height, width}}
                overflow='hidden'                
                resizeMode={'cover'}
                indicator={ProgressCircle}
                indicatorProps={{
                  size: 40,
                  borderWidth: 0,
                  color: primaryColor
                }}
            />
        }
        return this.renderPlaceholder()
    }
}
export default LazyImage;
