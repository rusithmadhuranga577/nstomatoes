import { StyleSheet, Dimensions } from "react-native"
import { Colors, Constants } from '@common';

const width = Dimensions.get('screen').width;
const itemlength = 60;
// const itemlength = width/5.5

const styles = StyleSheet.create({
    container : {
        width: '100%', 
        height: 80,
        backgroundColor: Colors.white,
        paddingTop: 10
    },
})

export default styles;