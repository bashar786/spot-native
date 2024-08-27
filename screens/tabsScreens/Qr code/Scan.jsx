import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Colors } from '@/screens/constants/constants';

const Scan = () => {
  const [scannedData, setScannedData] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  // Request for camera permission
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to scan QR codes',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
      }
    } else {
      // iOS automatically prompts for permission
      setHasPermission(true);
    }
  };

  React.useEffect(() => {
    requestCameraPermission();
  }, []);

  const handleBarCodeRead = (e) => {
    setScannedData(e.data);
    console.log('Scanned QR code data:', e.data);
  };

  return (
    <View style={styles.container}>
          <Text style={styles.instructionText}>
          Position all four corners of the QR code in the frame to scan.
        </Text>
      <View style={styles.greyContainer}>
    
        {hasPermission ? (
          <View style={styles.qrFrame}>
            <RNCamera
              style={styles.camera}
              onBarCodeRead={handleBarCodeRead}
              captureAudio={false}
            />
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
        ) : (
          <Text style={styles.permissionText}>Camera permission is required to scan QR codes.</Text>
        )}
        {scannedData && (
          <Text style={styles.scannedText}>Scanned Data: {scannedData}</Text>
        )}
      </View>
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  greyContainer: {
    backgroundColor: '#FBFBFB',
    width: '100%',
    alignItems: 'center',
    padding: 12,
    marginTop: 16,
    height: 396,
    justifyContent: 'center'
  },
  instructionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: Colors.dark,
    paddingHorizontal: 20,
    marginTop: -20,
  },
  qrFrame: {
    width: 203,
    height: 195,
    position: 'relative',
    marginTop: 20,
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 45,
    height: 45,
    borderLeftWidth: 5,
    borderTopWidth: 5,
    borderColor: Colors.lightGreen,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 45,
    height: 45,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderColor: Colors.lightGreen,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 45,
    height: 45,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: Colors.lightGreen,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 45,
    height: 45,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderColor: Colors.lightGreen,
  },
  permissionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.red,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  scannedText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.green,
    textAlign: 'center',
    marginTop: 20,
  },
});
