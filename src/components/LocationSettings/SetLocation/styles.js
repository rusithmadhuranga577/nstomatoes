import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const screenheight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        height: screenheight - (screenheight/1.45),
        padding: 15,
        backgroundColor: Colors.white
    },
    title: {
        fontSize: 25,
        color: Colors.black,
        fontWeight: 'bold'
    },
    iconcontainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressrow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addressrowtitletext: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'bold'
    },
    addressrowsubtitletext: {
        fontSize: 14,
        color: Colors.darkgray,
        fontWeight: 'bold'
    },
    inputContainer: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 50,
        marginTop: 20
    },
});

export default styles;