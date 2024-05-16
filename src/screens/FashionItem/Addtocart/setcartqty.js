import AsyncStorage from '@react-native-community/async-storage';

const SetCartQty = (qty) => {
    AsyncStorage.getItem('cartqty', (result) => {
        if(!result){
            AsyncStorage.setItem('cartqty', qty + '');
        }else{
            const oldqty = Number(result);
            const newqty = Number(qty); 
            var finaltotalqty = 0;
            finaltotalqty = oldqty + newqty;
            AsyncStorage.setItem('cartqty', finaltotalqty + '');
            console.log(finaltotalqty)
        }

        return {status : 'success'}
    })
}

export default SetCartQty;
