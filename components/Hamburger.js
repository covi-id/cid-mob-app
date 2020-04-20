import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import HamburgerSvg from '../assets/svgs/hamburger';

export default function Hamburger({ children, navigation, ...props }) {
   const {
      colors, sizes, fonts, shadow,
   } = useTheme();

   const styles = {
      container: {
         zIndex: 99,
         position: 'absolute',
         right: 0,
         height: 'auto',
         margin: sizes.margin * 0.7,
         marginTop: sizes.margin * 1.8,
         backgroundColor: colors.secondary,
         borderRadius: 40,
         padding: 10,
         ...shadow,
      },
   };

   return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Menu')}>
         <HamburgerSvg />
      </TouchableOpacity>
   );
}
