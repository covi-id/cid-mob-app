import React, { useState } from 'react';
import { View, StatusBar, Platform, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
import crashlytics from '@react-native-firebase/crashlytics';
import { checkIn, checkOut } from '../../../services/covid';
import { Container, Heading, StyledButton, ProfileImage, StyledText, StyledIcon } from '../../../components';

const { width, height } = Dimensions.get('screen');

export default function StatusModal({ profile, organisation, walletId, url, visible, setVisible, loadOrganisation }) {
  const [loading, setLoading] = useState();
  const { resultStatus, firstName, lastName, photoUrl } = profile;
  const theme = useTheme();
  const status =
    resultStatus &&
    (resultStatus.toLowerCase() === 'positive'
      ? 'red'
      : resultStatus.toLowerCase() === 'negative' || resultStatus.toLowerCase() === 'untested'
      ? 'amber'
      : 'green');

  const styles = styleSheet(theme, status);
  async function inPress() {
    setLoading(true);
    let message = 'Successfully checked in';
    let messageColor = theme.colors.green;
    try {
      await checkIn(organisation.id, walletId, url);
      loadOrganisation();
      setVisible(false);
    } catch (err) {
      // display snackbar
      console.log(err);
      message = 'Something went wrong';
      messageColor = theme.colors.red;
      crashlytics().log(`Could not check in user. ${JSON.stringify(profile)}`);
      crashlytics().recordError(err);
    } finally {
      setLoading(false);
    }
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: messageColor,
    });
    setLoading(false);
  }

  async function outPress() {
    setLoading(true);
    let message = 'Successfully checked out';
    let messageColor = theme.colors.green;
    try {
      await checkOut(organisation.id, walletId, url);
      loadOrganisation();
      setVisible(false);
    } catch (err) {
      // display snackbar
      console.log(err);
      message = 'Something went wrong';
      messageColor = theme.colors.red;
      crashlytics().log(`Could not check out user. ${JSON.stringify(profile)}`);
      crashlytics().recordError(err);
    } finally {
      setLoading(false);
    }
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: messageColor,
    });
    setLoading(false);
  }

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
      <View style={styles.backgroundContainer} />
      <Container padding={null}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={visible ? theme.colors.primary : theme.colors.background}
          translucent
        />
        <View>
          <View style={styles.titleContainer}>
            <Heading dark bold>{`${firstName} ${lastName}`}</Heading>
            <View style={styles.iconContainer}>
              <StyledIcon status={status} />
              <StyledText bold dark style={styles.text}>
                {status && status.toUpperCase()}
              </StyledText>
            </View>
          </View>
          <ProfileImage style={styles.image} status={status} source={photoUrl} />
        </View>
        <View style={styles.buttonContainer}>
          {organisation && (
            <>
              <StyledButton loading={loading} loadingWidth={160} title="In" onPress={inPress} />
              <StyledButton
                loading={loading}
                loadingWidth={160}
                titleColor={theme.colors.background}
                backgroundColor={theme.colors.red}
                alternative
                title="Out"
                onPress={outPress}
              />
            </>
          )}
        </View>
        <StyledButton
          basic
          style={styles.button}
          onPress={() => setVisible(false)}
          title={organisation ? 'Cancel' : 'OK'}
        />
      </Container>
    </Modal>
  );
}

const styleSheet = ({ colors, sizes }, status) => ({
  container: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizes.margin / 3,
  },
  buttonContainer: {
    marginTop: sizes.margin,
  },
  backgroundContainer: {
    backgroundColor: colors.background,
    height: height / 1.6,
    width,
    position: 'absolute',
    left: -20,
    right: 0,
    bottom: -20,
    overflow: 'hidden',
    borderTopRightRadius: 105,
    borderWidth: 2,
    borderColor: colors.background,
  },
  image: {
    marginTop: 65,
  },
  button: {
    alignSelf: 'center',
  },
  titleContainer: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  text: {
    color: status === 'amber' ? colors.background : colors[`${status}Accent`],
    fontSize: 20,
  },
});
