import AsyncStorage from '@react-native-community/async-storage';

const AddItemsToCart = (items) => {
    const parsedItems = items;
    AsyncStorage.setItem('cartrestaurantid', parsedItems[0].restaurant_id+'');
    console.log('cartrestaurantid', parsedItems[0].restaurant_id)
    AsyncStorage.getItem('cartitems', (err, olditems) => {
        console.log(olditems)
        if (olditems == null) {
          AsyncStorage.setItem('cartitems', JSON.stringify(parsedItems));
        } else {
          const concactedObject = JSON.parse(olditems).concat(parsedItems);
          AsyncStorage.setItem('cartitems', JSON.stringify(concactedObject));
        }
    })
}

export default AddItemsToCart;