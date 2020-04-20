import React, { useRef, useLayoutEffect } from 'react';
import {
   View, Modal, Dimensions, Animated, TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import StyledText from './StyledText';
import StyledButton from './StyledButton';

const { width } = Dimensions.get('screen');

export default function StyledModal({
   visible, title, text, setModalVisible,
}) {
   const { colors, sizes } = useTheme();
   const modalSize = width * 0.85;

   const fadeAnim = useRef(new Animated.Value(0)).current;

   useLayoutEffect(() => {
      Animated.timing(fadeAnim, {
         toValue: 1,
         duration: 200,
      }).start();
   });

   const fadeOut = () => {
      Animated.timing(fadeAnim, {
         toValue: 0,
         duration: 0,
      }).start();
   };

   const styles = {
      modalContainer: {
         backgroundColor: 'rgba(0,0,0,0.4)',
         flex: 1,
         position: 'absolute',
         top: 0,
         bottom: 0,
         right: 0,
         left: 0,
         display: visible ? 'flex' : 'none',
         zIndex: visible ? 999 : 0,
         opacity: visible ? fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
         }) : 0,
      },
      container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
      },
      contentContainer: {
         backgroundColor: colors.primary,
         borderRadius: sizes.radius,
         width: modalSize,
         padding: sizes.margin,
         paddingBottom: sizes.margin / 1.5,
      },
      text: {
         fontSize: 14,
         marginTop: sizes.margin / 2,
         marginBottom: sizes.margin / 2,
         marginLeft: sizes.margin / 2,
         marginRight: sizes.margin / 2,
      },
   };

   return (
      <Animated.View style={styles.modalContainer}>
         <Modal visible={visible} transparent animationType="slide" onDismiss={() => fadeOut()}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
               <View style={styles.container}>
                  <View style={styles.contentContainer}>
                     <StyledText dark style={{ fontSize: 20 }} bold>{title}</StyledText>
                     <StyledText dark style={styles.text}>{text}</StyledText>
                     <StyledButton title="Close" flat dark titleColor={colors.primary} onPress={() => setModalVisible(false)} />
                  </View>
               </View>
            </TouchableWithoutFeedback>
         </Modal>
      </Animated.View>
   );
}
