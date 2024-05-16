import { StyleSheet, Dimensions } from "react-native";
import { Colors, Constants } from '@common';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        width: '100%',
        backgroundColor : Colors.gray,
    },
    itemcontainer: {
        // height: 300,
        width: '95%',
        marginTop: 10,
        backgroundColor : Colors.white,
        marginBottom : 20,
        padding : 10,
        borderRadius : 5,
        alignSelf : 'center',
        elevation : 8,
        paddingBottom : 50
    },
    placeholdercontainer: {
        height: 240,
        width: 250,
        marginLeft: 8,
        marginTop: 10,
    },
     imagecontainer: {
         marginRight: 7,
         width: '100%',
         height: 150,
         borderRadius : 5
     },
     DistextStyle: {
        fontWeight: '100',
        fontSize: 12,
        marginRight: 1,
        paddingBottom: 5
    },
     TitletextStyle: {
        color: '#000',
        paddingTop: 5,
        fontWeight: '700',
        paddingBottom: 3,
        fontSize: 16,
        marginRight: 1
    },
    name : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white
    },
    promocode : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white
    },
    secondline : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
        color : Colors.black,
    },
    validto : {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal,
        color : Colors.primary
    },
    description : {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal,
        color : Colors.darkgray
    },
    promocodecontainer : {
        width: 150, 
        height: 25, 
        backgroundColor: Colors.primary, 
        paddingRight: 10, 
        position: 'absolute', 
        top: 15, 
        zIndex: 3, 
        borderTopRightRadius: 15, 
        borderBottomRightRadius: 15, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    applybutton : {
        width : 80,
        height : 30,
        borderRadius : 100,
        elevation : 8,
        backgroundColor : Colors.black,
        position : 'absolute',
        bottom : 10,
        right : 10,
        alignItems : 'center',
        justifyContent : 'center',
        zIndex : 99
    },
    applytext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 15,
    },
    gridView : {
        paddingBottom: 100
    }
})

export default styles;