import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import SubHeading from './SubHeading';
import StyledText from './StyledText';
import BellSvg from '../assets/svgs/bell';
import CheckSvg from '../assets/svgs/check';

export default function CardExposure({
   children, alert, title, subTitle, description, actionText, onPress, ...props
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
         ...shadow,
      },
      wrapperContainer: {
         backgroundColor: colors.background,
         borderRadius: sizes.radius,
         justifyContent: 'center',
         overflow: 'hidden',
      },
      contentContainer: {
         marginTop: sizes.margin,
         marginLeft: sizes.margin,
         marginRight: sizes.margin,
      },
      iconContainer: {
         backgroundColor: alert ? colors.alert : colors.success,
         height: 40,
         width: 40,
         borderRadius: 50,
         marginRight: sizes.margin / 1.5,
         alignItems: 'center',
         justifyContent: 'center',
      },
      actionContainer: {
         backgroundColor: colors.primary,
         marginBottom: sizes.margin,
         height: 30,
         width: 120,
         justifyContent: 'center',
         alignSelf: 'center',
         borderRadius: 30,
      },
      titleContainer: {
         flexDirection: 'row',
         marginBottom: sizes.margin,
         alignItems: 'center',
         marginRight: sizes.margin,
      },
      actionText: {
         fontSize: 12,
         color: colors.background,
      },
      title: {
      },
      subTitle: {
         textAlign: 'left',
         fontSize: 14,
      },
      description: {
         textAlign: 'left',
         marginBottom: sizes.margin,
         fontSize: 14,
         color: colors.textPrimary,
      },
   };

   return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
         <View style={styles.wrapperContainer}>
            <View style={styles.contentContainer}>
               <View style={styles.titleContainer}>
                  <View style={styles.iconContainer}>
                     {alert ? <BellSvg /> : <CheckSvg /> }
                  </View>
                  <View>
                     <StyledText style={styles.subTitle}>{subTitle}</StyledText>
                     <SubHeading bold style={styles.title}>{title}</SubHeading>
                  </View>
               </View>
               <StyledText style={styles.description}>{description}</StyledText>
               {actionText && (
                  <View style={styles.actionContainer}>
                     <StyledText bold style={styles.actionText}>{actionText}</StyledText>
                  </View>
               ) }
            </View>
         </View>
      </TouchableOpacity>
   );
}
