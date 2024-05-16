import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
    },
    noordercontainer : {
        width: '100%', 
        height: '100%',
        backgroundColor: Colors.white,
        justifyContent : 'center',
        alignItems : 'center'
    },
    noorderstext : {
        fontSize : 25,
        fontFamily : Constants.fontFamilybold,
        alignSelf : 'center',
        color : Colors.darkgray,
        opacity : 0.5,
    },
    addresstext : {
        fontSize : 12,
        fontFamily : Constants.fontFamilybold,
        marginTop : 5,
        alignSelf : 'center',
    },
    containerview : {
        width : '95%',
        alignSelf : 'center',
        backgroundColor : Colors.white,
        elevation : 5,
        borderRadius : 10,
        marginBottom : 10,
        marginTop : 10,
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
    },
    imageholder : {
        width : '100%',
        height : 110,
        backgroundColor : Colors.darkgray,
        borderRadius : 10,
        elevation : 5
    },
    restaurantname : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 15,
        marginBottom : 15
    },
    subtext : {
        fontFamily : Constants.fontFamilynormal,
        color : Colors.darkgray,
        fontSize : 12,
    },
    pricetext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.black,
        fontSize : 18,
        marginRight : 10,
        alignSelf : 'flex-end',
        marginTop : 5
    },
    orderstatuscontainer : {
        backgroundColor : Colors.alertyellow,
        width : '100%',
        height : 40,
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 15
    },
    orderstatustext : {
        fontFamily : Constants.fontFamilybold,
        color : Colors.white,
        fontSize : 15,
    },
    subtextholder : {
        marginLeft : 12, 
        width : '100%', 
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 5
    }
})

export default styles;