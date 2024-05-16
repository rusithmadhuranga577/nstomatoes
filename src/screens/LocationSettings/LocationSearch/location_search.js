import React, {useState, useEffect} from 'react';
import {View, Dimensions} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {LocationView, CustomAlert, CustomAlertButton } from '@components';
import {Colors, Store, Url, Languages} from '@common';
import { showMessage } from "react-native-flash-message";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const QueryString = require('query-string');
const screenHeight = Dimensions.get('window').height;

const SeatchForAddress = ({route}) => {
    useEffect(() => {

    }, [])

    return (
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'YOUR API KEY',
            language: 'en',
          }}
        />
    );
}
export default SeatchForAddress;