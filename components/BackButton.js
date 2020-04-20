import * as React from 'react';
import {
   View, TouchableOpacity, Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import BackSvg from '../assets/svgs/backbutton';

export default function BackButton({ navigation }) {
   const {
      colors, sizes, shadow,
   } = useTheme();

   const styles = {
      container: {
         zIndex: 99,
         position: 'absolute',
         borderRadius: 20,
         overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
      },
      circle: {
         backgroundColor: colors.primary,
         width: 40,
         height: 40,
         borderRadius: 20,
         ...shadow,
         alignItems: 'center',
         justifyContent: 'center',
      },
      button: {
         padding: sizes.margin,
         paddingTop: sizes.margin * 1.3,
         paddingLeft: sizes.margin / 1.5,
      },
   };

   const RootElement = (props) => (Platform.OS === 'android' ? (
      <TouchableNativeFeedback
         useForeground
         style={props.style}
         onPress={() => navigation.goBack()}
         background={TouchableNativeFeedback.Ripple(colors.background, true)}
      >
         {props.children}
      </TouchableNativeFeedback>
   ) : (
      <TouchableOpacity style={props.style} onPress={() => navigation.goBack()}>
         {props.children}
      </TouchableOpacity>
   ));

   return (
      <View style={styles.container}>
         <RootElement style={styles.button}>
            <View style={styles.circle}>
               <BackSvg />
            </View>
         </RootElement>
      </View>
   );
}
