import * as React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function HeadingImage({ children, ...props }) {
   const { colors, sizes } = useTheme();

   const styles = {
      tbd: {

      },
   };

   return <Text {...props} style={[props.style]}>{children}</Text>;
}
