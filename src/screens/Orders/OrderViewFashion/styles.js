import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
        padding : 10
    },
    appname : {
        fontSize : 25,
        fontFamily : Constants.fontFamilybold
    },
    thanksfororder : {
        fontSize : 20,
        fontFamily : Constants.fontFamilynormal,
        marginTop : 30
    },
    hereisyour : {
        fontSize : 15,
        fontFamily : Constants.fontFamilynormal,
        marginTop : 5
    },
    subtextholder : {
        width : '100%', 
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 2
    },
    subtext : {
        fontFamily : Constants.fontFamilynormal,
        color : Colors.darkgray,
        fontSize : 12,
    },
    row : {
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    vectorimage : {
        width: 150,
        height : 50
    },
    total : {
        fontSize : 20,
        fontFamily : Constants.fontFamilybold
    },
    orderchargeinforow : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    orderchargeinfotext : {
        fontFamily : Constants.fontFamilynormal,
        fontSize : 15,
        color : Colors.black
    },
    separator : {
        width : '100%',
        height : 1.5,
        backgroundColor : Colors.darkgray,
        marginTop : 15,
        marginBottom : 15
    },
    paidby : {
        fontSize : 15,
        fontFamily : Constants.fontFamilybold
    },
    infotext : {
        fontSize : 12,
        fontFamily : Constants.fontFamilynormal
    },
    infotextbold : {
        fontSize : 12,
        fontFamily : Constants.fontFamilybold
    },

    // Item List Styles
    orderitemcontainer : {
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    orderitemqtyholder : {
        width : 30,
        height : 30,
        backgroundColor : Colors.gray,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        marginRight : 10
    },
    itemseparator : {
        width : '90%',
        alignSelf : 'center',
        height : 1.5,
        backgroundColor : Colors.gray,
        marginTop : 8,
        marginBottom : 8
    },
    
    populerbadge : {
        padding : 3,
        paddingLeft : 20,
        paddingRight : 20,
        backgroundColor : '#FF5617',
        alignItems : 'center',
        borderRadius : 30,
        marginTop : 10,
        marginLeft : 10
      },
      populerbadgetext : {
        fontSize : 14,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white
      },
      orderstatusbadge : {
          paddingLeft : 15,
          paddingRight : 15,
          padding : 5,
          alignItems : 'center',
          justifyContent : 'center',
          backgroundColor : Colors.primary,
          borderRadius : 15,
          marginTop : 10,
          marginBottom : 5
      },
      orderstatusbadgetext : {
        fontSize : 18,
        fontFamily : Constants.fontFamilybold,
        color : Colors.white
      }
})

export default styles;