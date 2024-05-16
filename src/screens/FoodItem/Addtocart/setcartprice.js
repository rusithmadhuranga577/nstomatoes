import AsyncStorage from '@react-native-community/async-storage';

const SetCartPrice = (total) => {
    AsyncStorage.getItem('cartprice', (err, result) => {
        if(!result){
            AsyncStorage.setItem('cartprice', total + '');
        }else{
            const oldtotal = Number(result);
            const newtotal = Number(total); 
            var finaltotal = 0;
            finaltotal = oldtotal + newtotal;
            AsyncStorage.setItem('cartprice', finaltotal + '');
        }
        return {status : 'success'}
    })
}

export default SetCartPrice;
