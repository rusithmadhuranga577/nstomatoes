import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
    },
    button : {
        width : '100%',
        height : 55,
        backgroundColor : Colors.gray,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : 10,
        marginBottom : 10
    },
    description : {
        flexDirection : 'row',
        alignItems : 'center',
        width : '85%'
    },
    buttontitle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 15
    },
    buttonsubtitle : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 12,
        width : '100%'
    },
    sectiontitle : {
        fontFamily : Constants.fontFamilybold,
        fontSize : 13,
        marginBottom : 8,
        marginTop : 8
    },
    topalertcontainer : {
        width : '100%',
        backgroundColor : Colors.alertred,
    },
    alerttext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 15,
        marginLeft : 5,
        marginRight : 5,
        marginTop : 15
    },
    settingstext : {
        fontSize : 13,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        position : 'absolute',
        bottom : 5,
        right : 10,
        paddingBottom : 50
    },
    alertbutton : {
        padding : 5,
        width : 40,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        position : 'absolute',
        right : 5,
        bottom : 5
    },
    recentlocationitemcontainer : {
        flexDirection : 'row',
        padding : 10,
        alignItems : 'center',
        marginBottom : 5,
        marginTop : 5,
        justifyContent : 'space-between'
    },
    recentlocationtitle : {
        fontSize : 12,
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        marginLeft : 15,
    },
    recentlocationsubtitle : {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal,
        color : Colors.black,
        marginLeft : 15
    },
    separator : {
        width: '100%',
        height : 1,
        backgroundColor : Colors.gray
    },
    selecttext : {
        fontSize : 10,
        fontFamily : Constants.fontFamilybold,
        color : Colors.darkgray,
        justifyContent : 'flex-end'
    }
})

export default styles;