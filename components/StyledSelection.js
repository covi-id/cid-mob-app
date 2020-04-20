import * as React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Option from './Option';

export default function StyledSelection({
   children, horizontal, multi, selectedValues, setSelectedValues, disabled, ...props
}) {
   const indexes = [];
   for (let i = 0; i < children.length; i += 1) {
      if (children[i].selected) {
         indexes.push(i);
      }
   }
   const { colors, sizes } = useTheme();

   const styles = {
      container: {
         flexDirection: horizontal ? 'row' : 'column',
         flexWrap: 'wrap',
      },
   };

   return (
      <View
         {...props}
         style={[styles.container, props.style]}
      >
         {children.map((x, i) => (
            <Option
               key={x.value}
               index={i}
               label={x.label}
               value={x.value}
               disabled={disabled}
               selectedValues={selectedValues}
               setSelectedValues={setSelectedValues}
               horizontal={horizontal}
               multi={multi}
            />
         ))}
      </View>
   );
}
