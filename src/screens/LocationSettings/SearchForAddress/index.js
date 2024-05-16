import React, {useState, useEffect} from 'react';
import {View, Dimensions, Text} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import {LocationView, CustomAlert, CustomAlertButton } from '@components';
import {Colors, Store, Url, Languages} from '@common';
import { showMessage } from "react-native-flash-message";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const QueryString = require('query-string');
const screenHeight = Dimensions.get('window').height;
const maps_api = Store.mapsapi;

const SeatchForAddress = ({route}) => {
  
  const navigation = useNavigation();
  useEffect(() => {

  }, [])

  onPress = (fetched_data) => {
    navigation.push('SetLocation', {data: fetched_data})
  }

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Search for address'
        onPress={(data, details = null) => {
          onPress(data);
        }}
        query={{
          key: maps_api,
          language: 'en',
        }}
        textInputProps={{
          autoFocus: true,
        }}
        styles={styles.textInput}
        renderRow={(rowData) => {
          const title = rowData.structured_formatting.main_text;
          const address = rowData.structured_formatting.secondary_text;
          return (
           <View style={styles.textInput.row}>
            <Icon name="map-marker" size={20} style={styles.icon} />
            <View>
              <Text style={styles.rowTitleText}>{title}</Text>
              <Text style={styles.rowSubTitleText}>{address}</Text>
            </View>
           </View>
           );
          }}
      />
    </View>
  );
}
export default SeatchForAddress;