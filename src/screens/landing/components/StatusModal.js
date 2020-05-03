import * as React from 'react';
import { View, StatusBar, Platform, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Heading from '../../../components/Heading';
import StyledButton from '../../../components/StyledButton';
import ProfileImage from '../../../components/ProfileImage';
import StyledText from '../../../components/StyledText';
import StyledIcon from '../../../components/StyledIcon';

export default function StatusModal({ profile, visible, setVisible }) {
  const { height } = Dimensions.get('screen');
  const { covidStatus, name, surname, picture } = profile;
  const theme = useTheme();
  const status =
    covidStatus &&
    (covidStatus.toLowerCase() === 'positive'
      ? 'red'
      : covidStatus.toLowerCase() === 'negative' || covidStatus.toLowerCase() === 'untested'
      ? 'amber'
      : 'green');

  const styles = styleSheet(theme, status);

  return (
    <Modal
      backdropOpacity={1}
      backdropColor={theme.colors[status]}
      isVisible={visible}
      style={styles.container}
      onBackButtonPress={() => setVisible(false)}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      deviceHeight={height}
      useNativeDriver
      // enable this for RN 0.62 and remove StatusBar: statusBarTranslucent
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
    >
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={visible ? theme.colors.primary : theme.colors.background}
          translucent
        />
        <View style={styles.titleContainer}>
          <Heading dark bold>{`${name} ${surname}`}</Heading>
          <View style={styles.iconContainer}>
            <StyledIcon status={status} />
            <StyledText bold dark style={styles.text}>
              {status && status.toUpperCase()}
            </StyledText>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <ProfileImage status={status} source={picture} />
        </View>
        <View style={styles.bottomContainer} />
        <StyledButton style={styles.button} onPress={() => setVisible(false)} title="OK" />
      </View>
    </Modal>
  );
}

const styleSheet = ({ colors }, status) => ({
  container: {
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    flex: 1,
  },
  titleContainer: {
    flex: 0.1,
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
    flex: 0.2,
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
});
