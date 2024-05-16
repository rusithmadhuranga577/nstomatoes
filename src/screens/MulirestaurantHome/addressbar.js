/** @format */

import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { CustomAlert, CustomAlertButton } from '@components';
import styles from './styles';
import { Languages, Icons } from '@common';

const AddressBar =(props) => {

  const [loginpopup, setloginpopup] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [address, setaddress] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('address', (err, address) => {
      setaddress(address);
    });
  }, [isFocused])

  const onPressFunction = () => {
    AsyncStorage.getItem('userid', (err, userid) => {
      if(userid == '0'){
        openLoginPopup();
      }else{
        navigation.navigate('LocationSettings', {logged : 1, cart : 0})
      }
    });
  }

  const closeLoginPopup = () => {
    setloginpopup(false);
  }
  
  const openLoginPopup = () => {
    setloginpopup(true);
  }

  const LogoutFunction = () => {
    closeLoginPopup(false);
    AsyncStorage.clear();
    navigation.replace('LoginMethods')
  }

  const renderAlerts = () => {
    return(
      <>
      <CustomAlert
        displayMode={'login'}
        displayMsg={Languages.LoginOrCreateAnAccountForContinue}
        displaymsgtitle={Languages.PleaseLogin}
        visibility={loginpopup}
        dismissAlert={closeLoginPopup}
        cancellable={false}
        buttons={(
          <>
            <CustomAlertButton buttontitle={Languages.LoginSignIn} theme={'success'} buttonaction={LogoutFunction}/>
            <CustomAlertButton buttontitle={Languages.Cancel} theme={'alert'} buttonaction={closeLoginPopup}/>
          </>
        )}
      />   
      </>
    );
  }

  return(
    <TouchableOpacity onPress={onPressFunction} style={[styles.addressbar]}>
        <View  style={{width: '76%'}}>
            <View style={{alignSelf : 'flex-start', alignContent: 'center'}}>
                <Text style={[styles.addressbartitle]}>{Languages.DeliverNow}</Text>
            </View>
            <View>
              <Text style={[styles.addresstext]} numberOfLines={1}>{address}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('QrScaningScreen', {appsettings: props.appsettings})}>
            <Image source={Icons.qrbtn} style={{width: 40, height: 40}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL(`tel:${props.appsettings.main_hotline}`)}>
            <Image source={Icons.callbtn} style={{width: 40, height: 40}}/>
          </TouchableOpacity>
        </View>
        {/* {renderAlerts()} */}
    </TouchableOpacity>
  );
}
export default AddressBar;



// /** @format */

// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity
// } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { useIsFocused } from '@react-navigation/native';
// import { CustomAlert, CustomAlertButton } from '@components';
// import styles from './styles';
// import { Languages } from '@common';

// const AddressBar =() => {

//   const [loginpopup, setloginpopup] = useState(false);
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();
//   const [address, setaddress] = useState('');

//   useEffect(() => {
//     AsyncStorage.getItem('address', (err, address) => {
//       setaddress(address);
//     });
//   }, [isFocused])

//   const onPressFunction = () => {
//     AsyncStorage.getItem('userid', (err, userid) => {
//       if(userid == '0'){
//         openLoginPopup();
//       }else{
//         navigation.navigate('LocationSettings', {logged : 1, cart : 0})
//       }
//     });
//   }

//   const closeLoginPopup = () => {
//     setloginpopup(false);
//   }
  
//   const openLoginPopup = () => {
//     setloginpopup(true);
//   }

//   const LogoutFunction = () => {
//     closeLoginPopup(false);
//     AsyncStorage.clear();
//     navigation.replace('LoginMethods')
//   }

//   const renderAlerts = () => {
//     return(
//       <>
//       <CustomAlert
//         displayMode={'login'}
//         displayMsg={Languages.LoginOrCreateAnAccountForContinue}
//         displaymsgtitle={Languages.PleaseLogin}
//         visibility={loginpopup}
//         dismissAlert={closeLoginPopup}
//         cancellable={false}
//         buttons={(
//           <>
//             <CustomAlertButton buttontitle={Languages.LoginSignIn} theme={'success'} buttonaction={LogoutFunction}/>
//             <CustomAlertButton buttontitle={Languages.Cancel} theme={'alert'} buttonaction={closeLoginPopup}/>
//           </>
//         )}
//       />   
//       </>
//     );
//   }

//   return(
//     <TouchableOpacity onPress={onPressFunction} style={[styles.addressbar]}>
//         <View>
//             <View style={{alignSelf :'center'}}>
//                 <Text style={[styles.addressbartitle]}>{Languages.DeliveringFood}</Text>
//             </View>
//             <Text style={[styles.addresstext]} numberOfLines={1}>{address}</Text>
//         </View>
//         {renderAlerts()}
//     </TouchableOpacity>
//   );
// }
// export default AddressBar;