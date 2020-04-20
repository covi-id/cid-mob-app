import * as React from 'react';
import { View, Linking, TouchableOpacity } from 'react-native';
import locale from 'i18n-js';
import iid from '@react-native-firebase/iid';
import { useTheme } from '@react-navigation/native';
import {
   Heading, Container, StyledButton, StyledText,
} from '../components';
import { deleteFirebaseUser, deleteSession } from '../services/storage';

export default function ErrorScreen({ navigation }) {
   const { sizes } = useTheme();

   const styles = {
      headingContainer: {
         flex: 1,
         justifyContent: 'center',
      },
      contentContainer: {
         flex: 1,
      },
      heading: {
         marginBottom: sizes.margin,
      },
      text: {
         margin: sizes.margin,
         fontSize: 12,
      },
      button: {
         marginTop: sizes.margin,
      },
   };

   async function reset() {
      await Promise.all([
         await deleteFirebaseUser(),
         await deleteSession(),
         await iid().delete(),
      ]);
   }

   async function navigate() {
      await reset();
      navigation.reset({
         index: 0,
         routes: [{ name: 'Splash' }],
      });
   }

   return (
      <Container>
         <View style={styles.headingContainer}>
            <Heading style={styles.heading}>{locale.t('error_title')}</Heading>
         </View>
         <View style={styles.contentContainer}>
            <StyledButton style={styles.button} loadingWidth={250} title={locale.t('error_cta')} onPress={navigate} />
            <TouchableOpacity onPress={() => Linking.openURL('mailto:tbd@waitingfor.support')}>
               <StyledText style={styles.text}>{locale.t('error_copy')}</StyledText>
            </TouchableOpacity>
         </View>
      </Container>
   );
}
