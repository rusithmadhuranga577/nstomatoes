import React from 'react';
import Video from 'react-native-video';
import TopBarVideo from "../../../assets/header.mp4";

const HomeTopBar = () => {
    return (
        <Video 
            source={TopBarVideo}
            resizeMode="cover"
            style={{
                height: 60
            }}
            repeat={true}
        />
    )
    // return (
    //     <View style={[styles.container]}>
    //         <Image source={Images.topbarimage} style={{width: '100%', height: 67}}/>
    //     </View>
    // )
}

export default HomeTopBar;