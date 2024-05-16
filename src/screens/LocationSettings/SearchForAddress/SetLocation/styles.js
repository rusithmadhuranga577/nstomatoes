import { StyleSheet, backgroundColor } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20, // Half of the icon width
        marginTop: -40, // Half of the icon height
        zIndex: 1, // Ensure the icon is above the map
    },
});

export default styles;