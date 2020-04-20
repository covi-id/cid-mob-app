import * as React from 'react';
import {
   View, StatusBar, SafeAreaView, Platform, Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Heading from './Heading';
import StyledButton from './StyledButton';
import ProfileImage from './ProfileImage';
import StyledSelection from './StyledSelection';
import StyledText from './StyledText';
import StyledIcon from './StyledIcon';

export default function StatusModal({
   status, visible, setVisible,
}) {
   const { colors, sizes } = useTheme();
   const { height } = Dimensions.get('screen');

   const styles = {
      container: {
         marginTop: Platform.OS === 'ios' ? 60 : 40,
         flex: 1,
      },
      titleContainer: {
         flex: 0.10,
         // marginTop: sizes.margin,
      },
      iconContainer: {
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      profileContainer: {
         flex: 0.58,
      },
      bottomContainer: {
         flex: 0.20,
      },
      button: {
         position: 'absolute',
         bottom: 0,
         alignSelf: 'center',
      },
      text: {
         color: status === 'amber' ? colors.background : colors[`${status}Accent`],
         fontSize: 20,
      },
   };

   return (
      <Modal
         backdropOpacity={1}
         backdropColor={colors[status]}
         isVisible={visible}
         style={styles.container}
         onBackButtonPress={() => setVisible(false)}
         animationIn="fadeInRight"
         animationOut="fadeOutRight"
         coverScreen={false}
         deviceHeight={height}
      >
         <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <View style={styles.titleContainer}>
               <Heading dark bold>Jack Matthews</Heading>
               <View style={styles.iconContainer}>
                  <StyledIcon status={status} />
                  <StyledText bold dark style={styles.text}>{status && status.toUpperCase()}</StyledText>
               </View>
            </View>
            <View style={styles.profileContainer}>
               <ProfileImage status={status} />
            </View>
            <View style={styles.bottomContainer}>
               {/* <StyledText bold dark style={styles.text}>Tested & Verified by</StyledText>
               <Heading dark bold>{'National Health\nLaboratory Service'}</Heading> */}
            </View>
            <StyledButton style={styles.button} onPress={() => setVisible(false)} title="OK" />

         </View>
      </Modal>
   );
}
