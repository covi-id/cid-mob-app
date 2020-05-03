import * as React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Option({
  children,
  selected,
  selectedValues,
  setSelectedValues,
  horizontal,
  disabled,
  multi,
  ...props
}) {
  const { colors, fonts } = useTheme();
  const isSelected = selected ?? (selectedValues && selectedValues.includes(props.value));
  const styles = {
    container: {
      height: horizontal ? 40 : 50,
      width: horizontal ? 'auto' : 210,
      justifyContent: 'center',
      margin: horizontal ? 5 : 15,
      paddingLeft: horizontal ? 20 : 0,
      paddingRight: horizontal ? 20 : 0,
      backgroundColor: disabled || !isSelected ? colors.primaryAccent : colors.primary,
      borderRadius: 40,
    },
    text: {
      color: disabled || isSelected ? colors.background : colors.primary,
      textAlign: 'center',
      fontFamily: fonts.primarySemibold,
    },
  };

  function onPress() {
    if (setSelectedValues) {
      let values = selectedValues ?? [];
      if (multi) {
        if (isSelected) {
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
    <TouchableOpacity disabled={disabled} style={[styles.container, props.style]} onPress={onPress}>
      <Text style={[styles.text, props.textStyle]}>{props.label}</Text>
    </TouchableOpacity>
  );
}
