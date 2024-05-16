import { StyleSheet } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mapView: {
      ...StyleSheet.absoluteFillObject,
    },
    fullWidthContainer: {
      position: 'absolute',
      width: '100%',
      top: 20,
      alignItems: 'center',
    },
    input: {
      width: '80%',
      padding: 5,
    },
    currentLocBtn: {
      backgroundColor: '#000',
      padding: 5,
      borderRadius: 5,
      position: 'absolute',
      bottom: 70,
      right: 10,
    },
    actionButton: {
      backgroundColor: '#000',
      height: 50,
      position: 'absolute',
      bottom: 10,
      left: 10,
      right: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    actionText: {
      color: 'white',
      fontSize: 20,
      fontFamily : Constants.fontFamilybold
    },
    row: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      paddingLeft: 8,
      paddingRight: 5,
    },
    list: {
      backgroundColor: 'white',
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      maxHeight: 220,
    },
    listContainer: {
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 2,
      shadowOpacity: 0.24,
      backgroundColor: 'transparent',
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    primaryText: {
      color: '#545961',
      fontSize: 14,
    },
    secondaryText: {
      color: '#A1A1A9',
      fontSize: 13,
    },
  });

export default styles;