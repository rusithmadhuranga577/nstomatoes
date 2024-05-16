import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TransitionPresets } from '@react-navigation/stack';

import { Colors, Constants } from '@common'

import HomeTabNavigator from './HomeTabNavigator';

import {Splash} from '@screens';
import {Login} from '@screens';
import {PhoneNumberInput} from '@screens';
import {UsernamepassowrdLogin} from '@screens';
import {VerifyOtp} from '@screens';
import {CreateNewAccount} from '@screens';
import {LocationSettings} from '@screens';
import {LocationSearch} from '@screens';
import {SelectNowLocation} from '@screens';
import {Home} from '@screens';
import {MenuList} from '@screens';
import {FoodItem} from '@screens';
import {CartPage} from '@screens';
import {Promotion} from '@screens';
import {PhoneNumberChange} from '@screens';
import {UpdateUserInfo} from '@screens';
import {WebViewPage} from '@screens';
import {RateOrder} from '@screens';
import {OrderStatus} from '@screens';
import {MulirestaurantHome} from '@screens';
import {RestaurantList} from '@screens';
import {SearchPage} from '@screens';
import {OrderView} from '@screens';
import {OrdersScreen} from '@screens';
// import {MenuListFashion} from '@screens';
import {FashionItemsCart} from '@screens';
import {AddAddress} from '@screens';
import {MenuListGrocery} from '@screens';
import {RestaurantInfoPage} from '@screens';
import {MerchantInfo} from '@screens';
import {FashionItem} from '@screens';
import {OrderViewFashion} from '@screens';
import {EmptyScreen} from '@screens';
import {ForgetPassword} from '@screens';
import {OrderCanceledScreen} from '@screens';
import {MenuListCategories} from '@screens';
import {SearchForAddress} from '@screens';
import {SetLocation} from '@screens';
import {QrScaningScreen} from '@screens';

const Stack = createStackNavigator();

function App() {

  const Back = () => {
    return(
      <View style={{marginLeft : 10}}>
        <Icon name={'chevron-left'} size={18} color={Colors.black}/>
      </View>
    );
  }

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  
  return (
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { height: 50, elevation: 10} ,
        headerBackTitleVisible: false,
        animationEnabled : true,
        ...TransitionPresets.SlideFromRightIOS ,
        headerTitleStyle : {fontFamily : Constants.fontFamilybold, fontSize : 17, width : '100%', alignSelf : 'center', color : Colors.black},
        headerBackImage: ()=>(<Back/>),
      }}
      >
        <Stack.Screen name="Splash" component={Splash} options={{headerShown : false}}/>
        <Stack.Screen name="LoginMethods" component={Login} options={{headerShown : false}}/>
        <Stack.Screen name="PhoneInput" component={PhoneNumberInput} options={{headerShown : true, title : 'Login With Phone Number'}}/>
        <Stack.Screen name="UsernamepassowrdLogin" component={UsernamepassowrdLogin} options={{headerShown : true, title : 'Login'}}/>
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} options={{headerShown : true, title : 'Verify Your Phone Number'}}/>
        <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} options={{headerShown : true, title : 'Create Account'}}/>
        <Stack.Screen name="LocationSettings" component={LocationSettings} options={{headerShown : true, title : 'Location Settings'}}/>
        <Stack.Screen name="SearchForAddress" component={SearchForAddress} options={{headerShown : true, title : 'Search For Address'}}/>
        <Stack.Screen name="SetLocation" component={SetLocation} options={{headerShown : true, title : 'Set Delivery Location'}}/>
        <Stack.Screen name="LocationSearch" component={LocationSearch} options={{headerShown : true, title : 'Search Address'}}/>
        <Stack.Screen name="SelectNowLocation" component={SelectNowLocation} options={{headerShown : true, title : 'Set My Location Now'}}/>
        <Stack.Screen name="HomeTabNavigator" component={HomeTabNavigator} options={{headerShown : false}}/>
        <Stack.Screen name="MenuList" component={MenuList} options={{headerShown : false, title : 'Foods'}}/>
        <Stack.Screen name="MenulistCategory" component={MenuListCategories} options={{headerShown : false, title : 'Foods'}}/>
        <Stack.Screen name="FoodItem" component={FoodItem} options={{headerShown : false}}/>
        <Stack.Screen name="FashionItem" component={FashionItem} options={{headerShown : false}}/>
        <Stack.Screen name="CartPage" component={CartPage} options={{headerShown : true, title : 'Cart'}}/>
        <Stack.Screen name="Promotion" component={Promotion} options={{headerShown : true, title : 'Promotion Page'}}/>
        <Stack.Screen name="PhoneNumberChange" component={PhoneNumberChange} options={{headerShown : true, title : 'Set Delivery Phone Number'}}/>
        <Stack.Screen name="UpdateUserInfo" component={UpdateUserInfo} options={{headerShown : true, title : 'Update Profile'}}/>
        <Stack.Screen name="WebViewPage" component={WebViewPage} options={({ route })=>({headerShown : true, title : route.params.title})}/>
        <Stack.Screen name="RateOrder" component={RateOrder} options={({ route })=>({headerShown : false, title : route.params.title})}/>
        <Stack.Screen name="OrderStatus" component={OrderStatus} options={({ route })=>({headerShown : true, title : route.params.title})}/>
        <Stack.Screen name="MulirestaurantHome" component={MulirestaurantHome} options={({ route })=>({headerShown : true, title : route.params.title})}/>
        <Stack.Screen name="RestaurantList" component={RestaurantList} options={{headerShown : false}}/>
        <Stack.Screen name="SearchPage" component={SearchPage} options={({ route })=>({headerShown : true, title : route.params.title})}/>
        <Stack.Screen name="OrderView" component={OrderView} options={({ route })=>({headerShown : true, title : route.params.title})}/>
        <Stack.Screen name="OrderViewFashion" component={OrderViewFashion} options={({ route })=>({headerShown : true, title : route.params.title})}/>
        <Stack.Screen name="OrdersPage" component={OrdersScreen} options={{headerShown : true, title : 'Orders'}}/>
        {/* <Stack.Screen name="MenuListFashion" component={MenuListFashion} options={{headerShown : false}}/> */}
        <Stack.Screen name="MenuListGrocery" component={MenuListGrocery} options={{headerShown : false}}/>
        <Stack.Screen name="FashionItemsCart" component={FashionItemsCart} options={{headerShown : true, title : 'Cart'}}/>
        <Stack.Screen name="AddAddress" component={AddAddress} options={{headerShown : true, title : 'Add Address'}}/>
        <Stack.Screen name="MerchantInfo" component={MerchantInfo} options={({ route })=>({headerShown : true, title : route.params.title})}/>
        <Stack.Screen name="EmptyScreen" component={EmptyScreen} options={({ route })=>({headerShown : false})}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={({ route })=>({headerShown : true, title : 'Forget Password'})}/>
        <Stack.Screen name="OrderCanceledScreen" component={OrderCanceledScreen} options={({ route })=>({headerShown : true, title : 'Order Canceled'})}/>
        <Stack.Screen name="QrScaningScreen" component={QrScaningScreen} options={({ route })=>({headerShown : true, title : 'QR Scanner'})}/>
        <Stack.Screen name="WebviewPage" component={WebViewPage} options={({ route })=>({headerShown : true, title : ''})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;