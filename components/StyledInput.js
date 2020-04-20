import * as React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

export default function StyledInput({ children, disabled, ...props }) {
   const { colors } = useTheme();

   const styles = {
      container: {
         marginTop: 8,
         marginBottom: 8,
      },
      input: {
         backgroundColor: colors.background,
      },
   };

   return (
      <View style={styles.container}>
         <TextInput
            {...props}
            style={[styles.input, props.style]}
            onChangeText={props.onChange}
            onChange={null}
            label={props.title}
         />
      </View>
   );
}
