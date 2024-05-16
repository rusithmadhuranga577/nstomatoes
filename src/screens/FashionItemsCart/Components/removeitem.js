
const RemoveItem = (id) => {
    console.log(cartitems);
    var newArray = cartitems.filter((item) => item.food_items_id !== food_items_id);
    console.log(newArray);
    setcartitems(newArray)
}

export default RemoveItem;