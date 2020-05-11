import React, { useState, useEffect } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import { BarcodeMask } from '@nartc/react-native-barcode-mask';
import Modal from 'react-native-modal';
import { checkLocationPermission } from '../../services/location';
import { SubHeading, StyledButton } from '../../components';
import { PurpleCircleSvg, LogoAlternativeSvg, CameraSvg, FadedDotsSvg } from '../../assets/svgs';

const { width, height } = Dimensions.get('window');

export default function ScanModal({ navigation, userType }) {
  const [locationPermission, setLocationPermission] = useState();
  const theme = useTheme();
  const styles = styleSheet(theme);

  useEffect(() => {
    async function checkPermission() {
      const granted = await checkLocationPermission();
      setLocationPermission(granted);
    }
    checkPermission();
  }, []);

  const notAuthorized = () => (
    <View style={styles.permissionContainer}>
      <SubHeading bold dark style={styles.text}>
        {userType === 'organisation'
          ? 'COVI-ID requires camera permissions to log into an organisation'
          : 'COVI-ID requires camera permissions to verify a COVI-ID status'}
      </SubHeading>
    </View>
  );

  const locationNotAuthorized = () => (
    <View style={styles.permissionContainer}>
      <SubHeading bold dark style={styles.text}>
        COVI-ID requires location permissions to verify a COVI-ID status
      </SubHeading>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={visible ? theme.colors.primary : theme.colors.background}
        translucent
      />
      <FadedDotsSvg style={styles.dots} />
      <PurpleCircleSvg style={styles.circle} />
      <CameraSvg style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <LogoAlternativeSvg />
        </View>
        <View style={styles.container}>
          {!locationPermission && userType !== 'organisation' ? (
            locationNotAuthorized()
          ) : (
            <RNCamera
              style={styles.camera}
              onBarCodeRead={onRead}
              type={RNCamera.Constants.Type.back}
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              pendingAuthorizationView={notAuthorized()}
              captureAudio={false}
              notAuthorizedView={notAuthorized()}
            >
              <BarcodeMask
                height={width * 0.7}
                width={width * 0.7}
                maskOpacity={0.4}
                animatedLineColor={theme.colors.secondary}
                animatedLineThickness={4}
                edgeWidth={25}
                edgeHeight={25}
                edgeRadius={2}
              />
            </RNCamera>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <StyledButton style={styles.button} onPress={() => setVisible(false)} title="Close" />
        </View>
      </View>
    </View>
  );
}

const styleSheet = ({ sizes, colors }) => ({
  container: {
    background: colors.primary,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: sizes.margin,
    flex: 0.2,
  },
  buttonContainer: {
    flex: 0.2,
  },
  permissionContainer: {
    width: width * 0.85,
    height: width * 0.85,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    margin: sizes.margin,
  },
  camera: {
    overflow: 'hidden',
    height: width * 0.85,
    width,
  },
  background: {
    position: 'absolute',
    top: -20,
  },
  loader: {
    margin: sizes.margin,
  },
  circle: {
    position: 'absolute',
    left: 0,
    bottom: (width * 0.85) / 2.2,
  },
  dots: {
    position: 'absolute',
    bottom: -15,
    left: -25,
  },
});
