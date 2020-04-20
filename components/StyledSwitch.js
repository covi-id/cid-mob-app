import * as React from 'react';
import { View, Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';
import StyledText from './StyledText';

export default function StyledSwitch({
   onChange, disabled, title, ...props
}) {
   const { colors, sizes, shadow } = useTheme();

   const styles = {
      container: {
         margin: sizes.margin,
         marginTop: sizes.margin / 2,
         marginBottom: sizes.margin / 2,
         flexDirection: 'row',
         justifyContent: 'space-between',
      },
      switch: {
         backgroundColor: colors.background,
         ...shadow,
      },
   };

   return (
      <View style={styles.container}>
         <StyledText>{title}</StyledText>
         <Switch
            {...props}
            style={props.style}
            onValueChange={onChange}
            disable={disabled}
            trackColor={{ true: colors.primary }}
         />
      </View>
   );
}
