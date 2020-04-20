import * as React from 'react';
import {
   Text, View,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';

export default function Checkbox({
   children, selectedValues, setSelectedValues, horizontal, multi, ...props
}) {
   const { colors, sizes } = useTheme();
   const selected = selectedValues && selectedValues.includes(props.value);
   const styles = {
      container: {
         flexDirection: 'row',
         paddingRight: 50,
         alignItems: 'center',
      },
      button: {
         height: 40,
         width: 40,
         backgroundColor: selected ? colors.secondaryAccent : colors.secondaryShadow,
         borderRadius: 40,
         shadowColor: colors.secondaryShadow,
         alignItems: 'center',
         justifyContent: 'center',
      },
      text: {
         color: colors.textSecondary,
         paddingLeft: 10,
         textAlign: 'center',
      },
   };

   function onPress() {
      if (setSelectedValues) {
         let values = selectedValues ?? [];
         if (multi) {
            if (selected) {
               values = values.filter((x) => x !== props.value);
            } else {
               values = [...values, props.value];
            }
         } else {
            values = [props.value];
         }
         setSelectedValues(values);
      }
      if (props.onPress) {
         props.onPress();
      }
   }

   return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
         <View style={styles.button}>
            {selected && <FontAwesome name="check" size={20} color={colors.background} />}
         </View>
         <Text
            style={[styles.text, props.textStyle]}
         >
            {props.label}
         </Text>
      </TouchableOpacity>
   );
}
