import React, { useEffect, useState, Component } from 'react';
import {
  Text,
  View,
  Platform,
  Vibration,
  StyleSheet,
  Linking,
  Dimensions
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Colors, Constants } from '@common';
import { ModernQRScanner } from 'react-native-modern-qrscanner';
import ModernQRScannerView from './ModernQRScannerView';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

class QrScaningScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        scanning: false,
        barCodeSize: {},
        scan: true,
        wrongUrl: false
      };
    }

    isShowCode = false;

    componentDidMount() {
      // let { appsettings } = this.props.appsettings;
    }

    checkDomainInUrl = (url, domain) => {
      const regex = new RegExp(domain, 'i');
      return regex.test(url);
    };

    onSuccess = (url) => {
      const appsettings = this.props.route.params.appsettings;
      const domain = appsettings.qr_restaurant_url;
      const isDomainIncluded = this.checkDomainInUrl(url.data, domain);
      console.log(url);
      console.log(domain);
      console.log(isDomainIncluded);

      if(isDomainIncluded) {
        Linking.openURL(url.data).catch(err =>
            console.log.error('An error occured', err)
        );
      } else {
        this.setState({
          wrongUrl: true
        });
        setTimeout(() => {
          this.setState({ wrongUrl: false });
        }, 2000);
      }
    };

    _handleBarCodeRead = e => {
      switch (Platform.OS) {
        case "ios":
          this.iosBarCode(e);
          break;
        case "android":
          this.androidBarCode(e);
          break;
        default:
          break;
      }
    };

    iosBarCode = e => {
      let x = Number(e.bounds.origin.x);
      let y = Number(e.bounds.origin.y);
      let width = e.bounds.size.width;
      let height = e.bounds.size.height;

      if (this.state.scan) {
        this.setState({
          scan: false
        })
        Vibration.vibrate();
        const newTimer = setTimeout(() => {
          this.setState({ scan: true });
        }, 1000);
        this.setState({ timer: newTimer });
        this.onSuccess(e);
      }

      // if (x > viewMinX && y > viewMinY && x < viewMaxX && y < viewMaxY) {

      //   if (this.state.scan) {
      //     this.setState({
      //       scan: false
      //     })
      //     if (this.props.vibrate) {
      //       Vibration.vibrate();
      //     }
      //     console.log(e);
      //   }

      //   if (this.props.isRepeatScan) {
      //     if (this.props.vibrate) {
      //       Vibration.vibrate();
      //     }
      //     console.log(e);
      //   } else {
      //     if (!this.isShowCode) {
      //       this.isShowCode = true;
      //       if (this.props.vibrate) {
      //         Vibration.vibrate();
      //       }
      //       console.log(e);
      //     }
      //   }
      // }
    };
  
    androidBarCode = e => {

      if (this.state.scan) {
        this.setState({
          scan: false
        })
        Vibration.vibrate();
        const newTimer = setTimeout(() => {
          this.setState({ scan: true });
        }, 1000);
        this.setState({ timer: newTimer });
        this.onSuccess(e);
      }
    
      // if (this.props.isRepeatScan) {
      //   Vibration.vibrate();
      //   console.log(e);
      // } else {
      //   if (!this.isShowCode) {
      //     this.isShowCode = true;
      //     Vibration.vibrate();
      //     console.log(e);
      //   }
      // }
    };

    renderCameraContent = () => (
      <>
        <ModernQRScannerView {...this.props} returnSize={this.barCodeSize} />
      </>
    );

    renderWrongUrlContent = () => (
      <>
        {this.state.wrongUrl ? <View style={[styles.wrongUrl]}>
          <Text style={[styles.wrongUrlText]}>Apologies, QR code does not align with our hotel's offerings.</Text>
        </View> : <View></View>}
      </>
    );

    render() {
      return <RNCamera
        style={styles.cameraStyle}
        captureAudio={false}
        onBarCodeRead={this._handleBarCodeRead}
        androidCameraPermissionOptions={null}
        androidRecordAudioPermissionOptions={null}
        notAuthorizedView={() => (
            <View style={styles.authorizationContainer}>
              <Text style={styles.notAuthorizedText}>Camera not authorized</Text>
            </View>
          )
        }
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        flashMode={RNCamera.Constants.FlashMode.off}
        zoom={0}
        type={"back"}
      >
        {/* {this.renderCameraContent()} */}
        {this.renderWrongUrlContent()}
        {this.renderCameraContent()}
      </RNCamera>
    }
}

const styles = StyleSheet.create({
    cameraStyle: {
      flex: 1,
    },
    centerText: {
      fontSize: 22,
      color: Colors.black,
      fontFamily : Constants.fontFamilybold
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    },
    wrongUrl: {
      width: screenWidth/1.5,
      backgroundColor: Colors.alertred,
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 10,
      zIndex: 2,
      position: 'absolute',
      top: 50,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'centerx'
    },
    wrongUrlText: {
      fontSize: 14,
      color: Colors.white
    }
  });

export default QrScaningScreen;