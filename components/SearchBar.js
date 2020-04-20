import * as React from 'react';
import { TextInput, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function SearchBar({ children, ...props }) {
   const { colors, sizes, shadow } = useTheme();

   const styles = {
      container: {
         ...shadow,
         borderRadius: sizes.radius,
         backgroundColor: colors.background,
         justifyContent: 'center',
         height: 50,
         margin: sizes.margin / 2,
         paddingLeft: sizes.margin,
      },
   };

   return (
      <View>
         <TextInput style={styles.container} {...props} />
      </View>
   );
}
