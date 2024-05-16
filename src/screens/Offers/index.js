import React , { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    FlatList 
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Languages, Url, Colors } from '@common';
import { LoadingComponent } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import styles from './styles';
import axios from 'axios'; 

const QueryString = require('query-string');

function Offers(){

    const [loading, setloading] = useState(true);
    const [items, setItems] = useState([]);
    const isFocused = useIsFocused();
    const [location, setlocation] =  useState([]);
    const navigation = useNavigation();

    
  const [appliedpromoid, setappliedpromoid] = useState('');
  const [alreadyapplied, setalreadyapplied] = useState(false);
  const [clickedpromo, setclickedpromo] = useState([]);

    useEffect(() => {
        initFunction();
    }, [isFocused]);

    const initFunction = () => {
        setloading(true);
        axios.post(Url.getalloffersurl, 
        QueryString.stringify({  
        }),
        {
            headers: {"Content-Type": "application/x-www-form-urlencoded",}
        })
        .then(response => {
            setItems(response.data.offers);
            setloading(false);
        }).catch(error => {
            console.log(error);
            setloading(false);
        })
        
        AsyncStorage.getItem('appliedpromo', (err, promo) => {
            const appliedpromo = JSON.parse(promo);
            if(appliedpromo){
            setappliedpromoid(appliedpromo.id);
            }
        });
    }

    const RemovePromo = () => {
        AsyncStorage.removeItem('appliedpromo');
        setappliedpromoid('');
        showMessage({
          message: "Promotion successfully removed !",
          type: "warning",
          icon : 'warning',
          duration : 2500
        });
      }
    
      const ApplyPromoCode = (selectedpromo) => {
        AsyncStorage.getItem('appliedpromo', (promo) => {
          if(!promo){
            setappliedpromoid(selectedpromo.id);
            const promoforapply = JSON.stringify(selectedpromo);
            AsyncStorage.setItem('appliedpromo', promoforapply);
            showMessage({
              message: "Promotion successfully added !",
              type: "success",
              icon : 'success',
              duration : 2500
            });
          }else{
            setclickedpromo(selectedpromo);
            setalreadyapplied(true);
          }
        })
      }

    return(
        <View style={[styles.container]}>
            <LoadingComponent visibility={loading}/>
            <FlatList
                itemDimension={80}
                data={items}
                style={styles.gridView}
                spacing={3}
                renderItem={({ item }) => (
                    <View onPress={()=>OnClickFunction(item.type, item.restaurant_id)} style={styles.itemcontainer} >
                        <View>
                            <View>
                                <View style={[styles.promocodecontainer]}>
                                    <Text style={[styles.name]} numberOfLines={1}>{item.promo_code}</Text>
                                </View>
                                <Image style={styles.imagecontainer} source={{uri: item.image}}></Image>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style={[styles.secondline, {marginTop : 5}]} numberOfLines={2}>{item.name}</Text>
                                </View>

                                <View style={{flexDirection: 'row', height: 20, alignContent: 'center', justifyContent: 'flex-start', marginTop : 5}}>
                                    <Text style={[styles.validto]} numberOfLines={3}>{Languages.Validtill} {item.valid_to}</Text>
                                </View>
                                <Text numberOfLines={2} style={[styles.description]}>{item.description}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=> appliedpromoid == item.id ? RemovePromo() : ApplyPromoCode(item)} style={[styles.applybutton, {backgroundColor : appliedpromoid == item.id ? Colors.alertred : '#183051'}]}>
                            <Text style={[styles.applytext]}>{appliedpromoid == item.id ? Languages.Remove : Languages.Apply}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>

    );
}

export default Offers;