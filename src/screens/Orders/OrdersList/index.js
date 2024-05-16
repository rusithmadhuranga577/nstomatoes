import React, { useEffect, useState } from 'react';
import {
  Text,
  FlatList,
  View,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import Container from './container';
import { Languages } from '@common';

const OrdersList = () => {

    const [orderslist, setorderslist] = useState([]);

    useEffect(()=>{
        getFirestoreData();
    }, [])

    const getFirestoreData = () => {
        AsyncStorage.getItem('userid', (err, userid) => {
            const uid = Number(userid);
            firestore()
            .collection('orders')
            .where('customer_id', '==', userid.toString())
            // .orderBy('status')
            // .orderBy('order_id' , 'DESC')
            .onSnapshot(documentSnapshot => {
                if(documentSnapshot != null){
                    setorderslist(documentSnapshot._docs);
                }
            })  
        });
    }
    return(
        <View style={[orderslist.length  == 0 ? styles.noordercontainer : styles.container]}>
            <ScrollView>
                {orderslist.length == 0 ?
                    <Text style={[styles.noorderstext]}>{Languages.YouHaveNOrders}</Text>
                :
                <FlatList
                    itemDimension={80}
                    data={orderslist}
                    spacing={3}
                    renderItem={({ item }) => (
                        <Container data={item}/>
                    )}
                />}
                <View style={{marginBottom : 150}}/>
            </ScrollView>
        </View>
    );
}

export default OrdersList;