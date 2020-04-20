import * as React from 'react';
import {
   View, Text, TouchableOpacity, Linking,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import locale from 'i18n-js';
import * as WebBrowser from 'expo-web-browser';
import StyledText from './StyledText';

export default function Legal({
   notice = true, privacy = true, dark,
}) {
   const { sizes } = useTheme();

   const styles = {
      container: {
         position: 'absolute',
         bottom: 0,
         right: 0,
         left: 0,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         margin: sizes.margin,
      },
      text: {
         fontSize: 12,
      },
      divider: {
         position: 'absolute',
         alignSelf: 'center',
         paddingRight: 8,
      },
      button: {
         padding: sizes.marginTop,
      },
   };

   return (
      <View style={styles.container}>
         {notice && (
            <TouchableOpacity
               style={styles.button}
               onPress={() => WebBrowser.openBrowserAsync(locale.t('app_legal_notice'))}
            >
               <StyledText dark={dark} style={styles.text}>{locale.t('footer_legal')}</StyledText>
            </TouchableOpacity>
         )}
         {notice && privacy && <StyledText dark={dark} style={[styles.text, styles.divider]}>|</StyledText> }
         {privacy && (
            <TouchableOpacity
               style={styles.button}
               onPress={() => WebBrowser.openBrowserAsync(locale.t('app_privacy_policy'))}
            >
               <StyledText dark={dark} style={styles.text}>{locale.t('footer_privacy policy')}</StyledText>
            </TouchableOpacity>
         )}
      </View>
   );
}
