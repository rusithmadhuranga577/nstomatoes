import { StyleSheet, backgroundColor } from "react-native"
import { Colors, Constants } from '@common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    textInput: {
        container: {
            flex: 1,
        },
        textInputContainer: {
            flexDirection: 'row',
        },
        textInput: {
            backgroundColor: '#FFFFFF',
            height: 60,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
            ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                },
                android: {
                  elevation: 5,
                },
            }),
        },
        poweredContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: '#c8c7cc',
            borderTopWidth: 0.5,
        },
        powered: {},
        listView: {},
        row: {
            backgroundColor: '#fdfdfd',
            height: 60,
            flexDirection: 'row',
            alignItems: 'center'
        },
        separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
        },
        description: {},
        loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
        },
    },
    row: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    rowTitleText: {
        fontSize: 14,
        color: Colors.black
    },
    rowSubTitleText: {
        fontSize: 12,
        color: Colors.darkgray
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        color: Colors.black
    },
});

export default styles;