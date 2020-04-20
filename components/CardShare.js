import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import SubHeading from './SubHeading';
import StyledText from './StyledText';
import BackgroundSvg from '../assets/svgs/share-background';
import ShareSvg from '../assets/svgs/share';

export default function CardShare({ children, ...props }) {
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
         backgroundColor: colors.secondaryAccent,
         borderRadius: sizes.radius,
         height: 237,
         justifyContent: 'center',
         overflow: 'hidden',
      },
      contentContainer: {
         marginLeft: sizes.margin,
         marginRight: sizes.margin,
      },
      iconContainer: {
         backgroundColor: colors.textPrimary,
         height: 40,
         width: 40,
         borderRadius: 50,
         marginRight: 10,
         marginBottom: 10,
         alignItems: 'center',
         justifyContent: 'center',
      },
      actionContainer: {
         backgroundColor: colors.background,
         height: 30,
         width: 120,
         marginTop: 20,
         justifyContent: 'center',
         alignSelf: 'center',
         borderRadius: 30,
      },
      actionText: {
         fontSize: 12,
         color: colors.secondaryAccent,
      },
      title: {
         color: colors.background,
         flexShrink: 1,
      },
      subTitle: {
         textAlign: 'left',
         color: colors.background,
         fontSize: 14,
      },
      background: {
         position: 'absolute',
         right: 0,
         height: 237,
      },
   };

   return (
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
         <View style={styles.wrapperContainer}>
            <View style={styles.background}>
               <BackgroundSvg />
            </View>
            <View style={styles.contentContainer}>
               <View style={styles.iconContainer}>
                  <ShareSvg />
               </View>
               <StyledText style={styles.subTitle}>{props.subTitle}</StyledText>
               <SubHeading bold style={styles.title}>{props.title}</SubHeading>
               <View style={styles.actionContainer}>
                  <StyledText style={styles.actionText}>{props.actionText}</StyledText>
               </View>
            </View>
         </View>
      </TouchableOpacity>
   );
}
