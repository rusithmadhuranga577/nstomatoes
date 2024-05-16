/** @format */

import React, { useEffect, useState  } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  LogBox
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import { Colors, Url } from '@common';
import { Button } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';

const ImageUpload = ({userid}) => {

  const [filePath, setFilePath] = useState({});
  const [singleFile, setSingleFile] = useState(null);
  const [image, setImage] = useState('');
  const [uploading, setuploading] = useState(false); // 27836

  useEffect(() => {
    LogBox.ignoreAllLogs();
  })

    const uploadImage = async () => {
      setuploading(true);
        const fileToUpload = singleFile;
        const data = new FormData();
        data.append('userid', userid);
        data.append('file_attachment', fileToUpload);
        let res = await fetch(
          Url.imageuploadurl,
          {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data; ',
            },
          }
        );
        let responseJson = await res.json();
        if (responseJson.status == 1) {
          setuploading(false);
            const photo = responseJson.filename;
            AsyncStorage.setItem("userPhoto",responseJson.filename +'');
            navigation.replace('UserProfile', {photo: photo});
        }else if(res.status == 0){
          setuploading(false);
          alert(responseJson.msg);
        }else{
          setuploading(false);
          alert('Something went wrong, please try again');
        }
    }

  const SelectImageFunction = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      var selected = JSON.stringify(res);
      selected = JSON.stringify(res);
      setFilePath(selected);
      setSingleFile(res);
      setImage(res[0].uri);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  return(
      <View style={[styles.placeholder]}>
        <Image style={[styles.image]} source={{uri: image}}/>
        <TouchableOpacity style={[styles.cameraiconcontainer]} onPress={()=>SelectImageFunction()}>
          <Icon name={'camera'} size={20} color={Colors.black}/>
        </TouchableOpacity>
        <View>
          <Button action={uploadImage}/>
        </View>
      </View>
  );
}
export default ImageUpload;