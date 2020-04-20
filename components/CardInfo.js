import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import StyledIcon from './StyledIcon';
import StyledText from './StyledText';
import Heading from './Heading';

export default function CardInfo({
   children, text, title, icon, onPress, ...props
}) {
   const {
      colors, sizes,
   } = useTheme();

   const styles = {
      container: {
         marginLeft: sizes.margin,
         marginRight: sizes.margin,
         marginTop: sizes.margin / 2,
         marginBottom: sizes.margin / 2,
         alignItems: 'center',
         padding: sizes.margin,
         backgroundColor: colors.primaryAccent,
         borderRadius: sizes.radius,
      },
      icon: {
         margin: sizes.margin,
      },
   };

   return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
         <StyledText>{text}</StyledText>
         <StyledIcon dark style={styles.icon} icon={icon} />
         <Heading>{title}</Heading>
      </TouchableOpacity>
   );
}
