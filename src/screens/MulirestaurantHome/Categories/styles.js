import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const width = Dimensions.get('screen').width;
const itemlength = 50;
// const itemlength = width/5.5

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        backgroundColor: Colors.white,
        justifyContent : 'center',
        alignSelf : 'center',
        padding : 5,
        alignItems : 'center',
    },
    itemcontainer : {
        width: itemlength+15, 
        borderRadius : 10,
        alignItems : 'center',
        marginBottom : 10,
        margin : 13,
    },
    itemtitlestyle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 12,
        color : Colors.black,
        marginTop : 3,
    },
    image : {
        width: itemlength, 
        height: itemlength,
        borderRadius : 10,
        // backgroundColor : Colors.gray
    },
    gridView: {
        marginTop: 5,
        alignSelf : 'center',
    },
})

export default styles;