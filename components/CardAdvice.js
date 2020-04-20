import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import SubHeading from './SubHeading';
import StyledText from './StyledText';
import InfoSvg from '../assets/svgs/info-background';
import BulbSvg from '../assets/svgs/bulb';

export default function CardAdvice({ children, ...props }) {
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
         backgroundColor: colors.info,
         borderRadius: sizes.radius,
         height: 157,
         justifyContent: 'center',
         overflow: 'hidden',
      },
      contentContainer: {
         marginLeft: sizes.margin,
         marginRight: sizes.margin,
      },
      iconContainer: {
         backgroundColor: '#0D98E6',
         height: 40,
         width: 40,
         borderRadius: 50,
         marginRight: 10,
         marginBottom: 10,
         alignItems: 'center',
         justifyContent: 'center',
      },
      actionContainer: {
         flexDirection: 'row',
         justifyContent: 'space-between',
      },
      arrowContainer: {
         borderRadius: 30,
         backgroundColor: colors.background,
         width: 30,
         height: 30,
         alignItems: 'center',
         justifyContent: 'center',
      },
      title: {
         color: colors.background,
         fontSize: 24,
         lineHeight: 28,
      },
      subTitle: {
         textAlign: 'left',
         color: colors.background,
         fontSize: 14,
      },
      background: {
         position: 'absolute',
         top: 0,
         height: 157,
      },
   };

   return (
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
         <View style={styles.wrapperContainer}>
            <View style={styles.background}>
               <InfoSvg />
            </View>
            <View style={styles.contentContainer}>
               <View style={styles.iconContainer}>
                  <BulbSvg />
               </View>
               <StyledText style={styles.subTitle}>{props.subTitle}</StyledText>
               <View style={styles.actionContainer}>
                  <SubHeading bold style={styles.title}>{props.title}</SubHeading>
                  <View style={styles.arrowContainer}>
                     <FontAwesome name="arrow-right" size={15} color="#40D8FF" />
                  </View>
               </View>
            </View>
         </View>
      </TouchableOpacity>
   );
}
