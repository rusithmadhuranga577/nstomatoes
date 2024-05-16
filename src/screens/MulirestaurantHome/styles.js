import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.gray,
    },
    addressbar : {
        width: '100%', 
        height : 90,
        backgroundColor : Colors.white,
        justifyContent : 'space-between',
        elevation : 8,
        paddingTop : 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row'
    },
    addressbartitle : {
        fontSize : 16,
        fontFamily : Constants.fontFamilynormal,
        color : Colors.black,
    },
    addresstext : {
        fontSize : 16,
        fontFamily : Constants.fontFamilybold,
    },
    namebar : {
        width: '100%', 
        height : 70,
        padding : 10,
        marginTop : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingBottom : 15,
        backgroundColor: Colors.white
    },
    nametitle : {
        fontSize : 23,
        fontFamily : Constants.fontFamilybold,
        width : '95%'
    },
    namestrip : {
        width : '90%'
    },
    namesubtitle : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
    },
    categoryimagecontainer : {
        width : 70,
        height : 70,
        backgroundColor : '#aaaa',
        borderRadius : 100,
        alignSelf : 'center'
    },
    categoryitemcontainer : {
        justifyContent: 'flex-end',
        borderRadius: 2,
        height: 100,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    gridcontainer : {
        width : '100%',
        marginTop : 15,
        alignItems : 'center',
        flex: 1,
        backgroundColor : '#aaa'
    },
    titlebar : {
        width : '100%',
        height : 50,
        backgroundColor : Colors.primary,
        marginTop : 10,
        marginBottom : 10,
        alignItems : 'center',
        padding : 10,
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    titlebartext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 18
    },
    categorytitle : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 15,
        alignSelf : 'center'
    },
    gridView: {
        marginTop: 5,
        flex: 1,
    },
    latestoffertext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 16,
        marginLeft : 10
    },
    bestdealstext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 12,
        marginLeft : 10
    },
    viewallbutton : {
        padding : 5, 
        backgroundColor : Colors.primary, 
        marginRight : 10, 
        marginTop : 30, 
        borderRadius : 5
    },
    viewalltext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 12,
    },
    ongoingordercontainer : {
        padding : 5,
        paddingLeft : 15,
        paddingRight : 15,
        alignSelf : 'center',
        backgroundColor : Colors.alertred,
        alignItems : 'center',
        justifyContent : 'center',
        position : 'absolute',
        bottom  : 90,
        borderRadius : 15,
        elevation : 5
    },
    ongoingordertext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 15
    }
})

export default styles;