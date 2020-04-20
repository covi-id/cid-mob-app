import * as React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function StyledIcon({
   alternative, title, status, ...props
}) {
   const {
      colors, sizes, fonts, shadow,
   } = useTheme();
   const shadowProps = alternative ? shadow : {};
   const styles = {
      container: {
         marginRight: 10,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: colors[status + (alternative ? 'Background' : 'Accent')],
         borderRadius: 50,
         width: alternative ? 40 : 20,
         height: alternative ? 40 : 20,
         borderWidth: alternative && 2,
         borderColor: colors.background,
         ...shadowProps,
      },
   };

   return (
      <View {...props} style={[styles.container, props.style]}>
         <FontAwesome
            name={status === 'green' ? 'check' : status === 'red' ? 'exclamation' : 'minus'}
            size={alternative ? 20 : 10}
            color={alternative ? colors.background : colors[status]}
         />
      </View>
   );
}
