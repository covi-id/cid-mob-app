import * as React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function SubHeading({ children, bold, ...props }) {
  const { colors, sizes, fonts } = useTheme();

  const styles = {
    text: {
      fontSize: sizes.subHeading,
      color: props.dark ? colors.background : colors.textPrimary,
      fontFamily: bold ? fonts.primarySemibold : fonts.primary,
    },
  };

  return (
    <Text {...props} style={[styles.text, props.style]}>
      {children}
    </Text>
  );
}
