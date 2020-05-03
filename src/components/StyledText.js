import * as React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function StyledText({ children, bold, ...props }) {
  const { colors, sizes, fonts } = useTheme();

  const styles = {
    text: {
      fontSize: sizes.body,
      color: props.dark ? colors.background : colors.textSecondary,
      textAlign: 'center',
      fontFamily: bold ? fonts.primarySemibold : fonts.primary,
    },
  };

  return (
    <Text {...props} style={[styles.text, props.style]}>
      {children}
    </Text>
  );
}
