import * as React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import StyledText from './StyledText';
import Heading from './Heading';

export default function CardStatistic({
   text, title,
}) {
   const {
      colors, sizes, fonts, shadow,
   } = useTheme();

   const styles = {
      container: {
         marginLeft: sizes.margin,
         marginRight: sizes.margin,
         marginTop: sizes.margin / 2,
         marginBottom: sizes.margin / 2,
         padding: sizes.margin,
         backgroundColor: colors.background,
         borderRadius: sizes.radius,
      },
      text: {
         fontSize: 14,
         textAlign: 'left',
      },
      heading: {
         color: colors.primary,
         textAlign: 'left',
         fontFamily: fonts.primary,
      },
   };

   return (
      <View style={styles.container}>
         <StyledText bold style={styles.text}>{title}</StyledText>
         <Heading style={styles.heading}>{text}</Heading>
      </View>
   );
}
