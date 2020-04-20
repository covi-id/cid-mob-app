import * as React from 'react';
import {
   Image, View, Dimensions, ActivityIndicator, StatusBar,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';
import remoteConfig from '@react-native-firebase/remote-config';
import RNSplashScreen from 'react-native-splash-screen';
// import * as Localization from 'expo-localization';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {
   getStatus,
} from '../services/storage';
import actions from '../store/actions';
import { useGlobalStore } from '../store/index';
import splash from '../assets/images/splash.png';

const { width, height } = Dimensions.get('screen');

export default function SplashScreen({ navigation }) {
   const { dispatch } = useGlobalStore();
   const { colors, sizes } = useTheme();

   React.useEffect(() => {
      async function init() {
         try {
            // -- load fonts
            await Font.loadAsync({
               ...Ionicons.font,
               ...FontAwesome.font,
               'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
               poppins: require('../assets/fonts/Poppins-Regular.ttf'),
               'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
            });

            RNSplashScreen.hide();

            setTimeout(() => {
               navigation.navigate('Start');
            }, 1000);
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
