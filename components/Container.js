import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LegalLink from './LegalLink';

export default function Container({
   children, scroll, legal = true, legalDark = false, notice = true, privacy = true, ...props
}) {
   const { sizes } = useTheme();

   const styles = {
      container: {
         flex: 1,
      },
      contentContainer: {
         flex: scroll ? 0 : 1,
         padding: sizes.margin,
         paddingTop: sizes.margin * 2.5,
         paddingBottom: sizes.margin * (legal ? 2.5 : 1) * (scroll ? 0.65 : 1),
      },
   };

   return (
      <View style={[styles.container, props.styles]}>
         {scroll ? (
            <>
               <ScrollView contentContainerStyle={[styles.contentContainer, props.contentStyle]}>
                  {children}
               </ScrollView>
               { legal && <LegalLink />}
            </>
         )
            : (
               <View style={[styles.contentContainer, props.contentStyle]}>
                  {children}
               </View>
            )}
         {legal && <LegalLink dark={legalDark} notice={notice} privacy={privacy} style={styles.legal} />}
      </View>
   );
}
