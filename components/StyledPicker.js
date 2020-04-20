import * as React from 'react';
import { View, TouchableOpacity, Picker } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

export default function StyledPicker({ children, disabled, ...props }) {
   const { colors, sizes } = useTheme();

   const styles = {
      container: {
         marginTop: 8,
         marginBottom: 8,
      },
      input: {
         backgroundColor: colors.background,
      },
   };

   const onChange = () => {


   };

   return (
      <View style={styles.container}>
         <TextInput
            value={props.value && children.find((x) => x.value === props.value).label}
            editable={false}
            style={[styles.input, props.style]}
            label={props.title}
         />
         <TouchableOpacity
            style={{
               position: 'absolute', right: 0, top: 0, bottom: 0, left: 0,
            }}
         />
         <Picker
            {...props}
            setSelectedValue={onChange}
         />
      </View>
   );
}
