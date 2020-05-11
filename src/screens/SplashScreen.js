import React, { useEffect } from 'react';
import { Image, View, Dimensions, ActivityIndicator, StatusBar, Platform } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import RNSplashScreen from 'react-native-splash-screen';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { saveOrganisation, getOrganisation, getURL } from '../services/storage';
import actions from '../store/actions';
import { useGlobalStore } from '../store/index';
import splash from '../assets/images/splash.png';
import { getOrganisationQR } from '../services/covid';

const { width, height } = Dimensions.get('screen');
const INTERVAL_ORGANISATION = 10000;

export default function SplashScreen({ navigation }) {
  const { dispatch, store } = useGlobalStore();

  useEffect(() => {
    async function init() {
      try {
        // -- load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          ...FontAwesome.font,
          poppins: require('../assets/fonts/Poppins-Regular.ttf'),
          'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        });

        RNSplashScreen.hide();

        const organisation = await getOrganisation();
        if (organisation) {
          dispatch(actions.setOrganisation(organisation));
        }

        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
        }, 1000);
        setInterval(() => fetchOrganisation(), INTERVAL_ORGANISATION);
      } catch (error) {
        // console.error(error);
        crashlytics().recordError(error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Error' }],
        });
      }
    }
    init();
  }, []);

  async function fetchOrganisation() {
    try {
      const data = await getOrganisation();
      // const url = await getURL();
      if (data) {
        const response = await getOrganisationQR(data.id);
        if (
          (response && response.data && !store.organisation) ||
          response.data.total !== store.organisation.total ||
          response.data.balance !== store.organisation.balance
        ) {
          saveOrganisation(response.data);
          dispatch(actions.setOrganisation(response.data));
        }
      }
    } catch (err) {
      crashlytics().recordError(err);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Image style={styles.splash} source={splash} />
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  splash: {
    width,
    height: height + (Platform.OS === 'android' ? 30 : 0),
    resizeMode: 'cover',
    marginTop: Platform.OS === 'android' ? -60 : 0,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: '22%',
    right: 0,
    left: 0,
  },
};
