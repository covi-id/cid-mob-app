import * as React from 'react';
import { Text, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function MobileInput({ placeholder, max, ...props }) {
  const { colors, sizes, fonts } = useTheme();

  const styles = {
    input: {
      fontSize: sizes.body,
      height: 55,
      width: 260,
      backgroundColor: '#E5EEFE',
      borderRadius: 60,
      color: props.dark ? colors.background : colors.textSecondary,
      textAlign: 'center',
      fontFamily: fonts.primary,
    },
  };

  return <TextInput {...props} placeholder={placeholder} style={[styles.input, props.style]} maxLength={max} />;
}
