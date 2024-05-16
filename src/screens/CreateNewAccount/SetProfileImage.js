// /** @format */

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   LogBox,
//   AsyncStorage
// } from 'react-native';
// import styles from './styles';
// import { useNavigation } from '@react-navigation/native';
// import { Languages} from '@common';
// import { Colors, Url } from '@common';
// import { Button, LoadingComponent, CustomAlert, CustomAlertButton } from '@components';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import DocumentPicker from 'react-native-document-picker';
// import { showMessage } from "react-native-flash-message";

// const SetProfileImage = ({route}) => {

//   const navigation = useNavigation();
//   const [filePath, setFilePath] = useState({});
//   const [singleFile, setSingleFile] = useState(null);
//   const [image, setImage] = useState('');

//   const [uploading, setuploading] = useState(false);
//   const [erroralert, seterroralert] = useState(false);
//   const [noimagealert, setnoimagealert] = useState(false);
//   const [logged, setlogged] = useState(false);

//   var userid = '';

//   useEffect(() => {
//     LogBox.ignoreAllLogs();
//     AsyncStorage.multiGet(['userid', 'userPhoto', 'logged'], (err, user) => {
//       userid = user[0];
//       if(user[1] == 'null'){
//         null
//       }else{
//         setImage(user[1]);
//       }
//       if(user[2] == 1){
//         setlogged(true);
//       }else{
//         setlogged(false);
//       }
//     })
//   }, [])

//   const showpopup = () => {
//     showMessage({
//       message: "Profile picture updated !",
//       type: "success",
//       icon : 'success',
//       duration : 2500
//     });
//   }

//   const uploadImage = async () => {
//     if(singleFile){
//       setuploading(true);
//       const fileToUpload = singleFile;
//       const data = new FormData();
//       data.append('userid', userid);
//       data.append('file_attachment', fileToUpload);
//       let res = await fetch(
//         Url.imageuploadurl,
//         {
//           method: 'post',
//           body: data,
//           headers: {
//             'Content-Type': 'multipart/form-data; ',
//           },
//         }
//       );
//       let responseJson = await res.json();
//       if (responseJson.status == 1) {
//         const photo = responseJson.filename;
//         AsyncStorage.setItem("userPhoto",responseJson.filename +'');
//         AsyncStorage.setItem('createaccountstep', 3+'');
//         showpopup();
//         AsyncStorage.getItem('logged', (err, logged) => {
//           if(logged == null){
//             setTimeout(() => {
//               setuploading(false);
//               navigation.replace('LocationSettings', {logged : 0});
//             }, 1500)
//           }else{
//             navigation.goBack();
//           }
//         })
//       }else if(res.status == 0){
//         setuploading(false);
//         seterroralert(true);
//       }else{
//         setuploading(false);
//         seterroralert(true);
//       }
//     }else{
//       setnoimagealert(true);
//     }
//   }

//   const SelectImageFunction = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.images],
//       });
//       var selected = JSON.stringify(res);
//       selected = JSON.stringify(res);
//       setFilePath(selected);
//       setSingleFile(res[0]);
//       setImage(res[0].uri);
//     } catch (err) {
//       setSingleFile(null);
//       if (DocumentPicker.isCancel(err)) {
//       } else {
//         alert('Unknown Error: ' + JSON.stringify(err));
//         throw err;
//       }
//     }
//   }

//   return(
//     <View>
//     <LoadingComponent visibility={uploading}/>
//       <View style={[styles.container, {padding : 10}]}>
//         {logged ? null : <Text onPress={()=>navigation.replace('LocationSettings', {logged : 0})} style={[styles.skiptext]}>{Languages.Skip}</Text>}
//         <View style={[styles.placeholder]}>
//           <Image style={[styles.image]} source={{uri: image}}/>
//           <TouchableOpacity style={[styles.cameraiconcontainer]} onPress={()=>SelectImageFunction()}>
//             <Icon name={'camera'} size={20} color={Colors.white}/>
//           </TouchableOpacity>
//         </View>
//         {singleFile == null ? null : 
//         <View style={[styles.button]}>
//           <Button title={Languages.Update} action={uploadImage}/>
//         </View>}
//       </View>

//       {/* Something Went Wrong*/}
//       <CustomAlert
//         displayMode={'error'}
//         displayMsg={Languages.SomethingWentWrong}
//         displaymsgtitle={'Error'}
//         visibility={erroralert}
//         dismissAlert={seterroralert}
//         cancellable={true}
//         buttons={(
//           <>
//             <CustomAlertButton buttontitle={'Ok'} theme={'error'} buttonaction={()=>seterroralert(false)}/>
//           </>
//         )}
//       />

//       {/* No Image Found Alert*/}
//       <CustomAlert
//         displayMode={'alert'}
//         displayMsg={Languages.NoImageSelected}
//         displaymsgtitle={'Alert'}
//         visibility={noimagealert}
//         dismissAlert={setnoimagealert}
//         cancellable={true}
//         buttons={(
//           <>
//             <CustomAlertButton buttontitle={Languages.Ok} theme={'inverse'} buttonaction={()=>setnoimagealert(false)}/>
//           </>
//         )}
//       />


//     </View>
//   );
// }
// export default SetProfileImage;