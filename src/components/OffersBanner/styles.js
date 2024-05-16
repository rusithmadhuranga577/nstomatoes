import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    gridView: {
      marginTop: 5,
      flex: 1,
  
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 2,
      padding: 1,
      height: 100,
      alignItems: 'center',
      borderWidth: .1
  
    },
    itemName: {
      fontSize: 12,
      color: 'red',
      fontWeight: 'bold',
      color: '#707070'
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
});

export default styles;