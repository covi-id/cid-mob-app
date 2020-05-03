import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Checkbox({ children, selectedValues, setSelectedValues, horizontal, multi, ...props }) {
  const { colors, sizes } = useTheme();
  const selected = selectedValues && selectedValues.includes(props.value);
  const styles = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: sizes.marginTop,
      paddingTop: sizes.marginTop,
      paddingBottom: sizes.marginTop,
    },
    button: {
      height: 20,
      width: 20,
      backgroundColor: colors.background,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#190a3c',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonCenter: {
      height: 10,
      width: 10,
      borderRadius: 10,
      backgroundColor: selected ? colors.secondary : colors.background,
    },
    text: {
      paddingLeft: sizes.margin / 1.2,
      textAlign: 'center',
      color: colors.text,
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
        <View style={styles.buttonCenter} />
      </View>
      <Text style={[styles.text, props.textStyle]}>{props.label}</Text>
    </TouchableOpacity>
  );
}
