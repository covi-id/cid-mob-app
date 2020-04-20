import * as React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GearSvg from '../assets/svgs/gear';
import LockSvg from '../assets/svgs/lock';
import TermsSvg from '../assets/svgs/terms';
import PieSvg from '../assets/svgs/pie';
import HelpSvg from '../assets/svgs/help';
import RateSvg from '../assets/svgs/rate';
import StyledText from './StyledText';

export default function StyledLink({
   dark, title, icon, ...props
}) {
   const { colors, sizes, fonts } = useTheme();

   const styles = {
      container: {
         margin: sizes.margin,
         justifyContent: 'space-between',
         alignItems: 'center',
         flexDirection: 'row',
      },
      contentContainer: {
         flexDirection: 'row',
         alignItems: 'center',
      },
      iconContainer: {
         width: 30,
         height: 30,
         alignItems: 'center',
         justifyContent: 'center',
      },
      text: {
         fontSize: 16,
         color: colors.textPrimary,
         paddingLeft: sizes.margin / 2,
      },
   };

   return (
      <TouchableOpacity {...props}>
         <View style={[styles.container, props.style]}>
            <View style={styles.contentContainer}>
               <View style={styles.iconContainer}>{getSvg(icon)}</View>
               {title && <StyledText bold style={styles.text}>{title}</StyledText>}
            </View>
            <View>
               <FontAwesome name="chevron-right" color={colors.textSecondary} size={15} />
            </View>
         </View>
      </TouchableOpacity>
   );
}

function getSvg(icon) {
   switch (icon) {
      case 'gear': return <GearSvg />;
      case 'lock': return <LockSvg />;
      case 'terms': return <TermsSvg />;
      case 'pie': return <PieSvg />;
      case 'help': return <HelpSvg />;
      case 'rate': return <RateSvg />;
      default: return null;
   }
}
