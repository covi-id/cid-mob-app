import * as React from 'react';
import { Picker } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function StyledDropdown({ children, ...props }) {
   const [selectedValue, setSelectedValue] = React.useState();

   const { colors, sizes } = useTheme();

   const styles = {
      tbd: {

      },
   };

   return (
      <Picker
         {...props}
         style={[props.style]}
         selectedValue={selectedValue}
         onValueChange={(itemValue, itemIndex) => {
            // eslint-disable-next-line no-unused-expressions
            props.onChange && props.onChange(itemValue, itemIndex);
            setSelectedValue(itemValue);
         }}
      >
         {children.map((x) => <Picker.Item key={x.name} label={x.name} value={x.value} />)}
      </Picker>
   );
}
