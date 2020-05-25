import React, { useState } from 'react';
import { View, StatusBar, Platform, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
import crashlytics from '@react-native-firebase/crashlytics';
import { checkIn, checkOut } from '../../services/covid';
import { Container, Heading, StyledButton, ProfileImage, StyledText, StyledIcon } from '../../components';

const { width, height } = Dimensions.get('screen');

export default function StatusScreen({ navigation, route }) {
  const [loading, setLoading] = useState();
  const { profile, organisation, walletId, url, loadOrganisation } = route.params;
  const { resultStatus, firstName, lastName, photoUrl } = profile;
  const theme = useTheme();
  const status = resultStatus && (resultStatus.toLowerCase() === 'positive' ? 'red' : 'green');

  const styles = styleSheet(theme, status);
  async function inPress() {
    setLoading(true);
    let message = 'Successfully checked in';
    let messageColor = theme.colors.green;
    try {
      await checkIn(organisation.id, walletId, url);
      loadOrganisation();
      navigation.goBack();
    } catch (err) {
      // display snackbar
      message =
        err.response && err.response.data && err.response.data.meta
          ? err.response.data.meta.message
          : 'Something went wrong.';
      console.log(err);
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
      navigation.goBack();
    } catch (err) {
      // display snackbar
      message =
        err.response && err.response.data && err.response.data.meta
          ? err.response.data.meta.message
          : 'Something went wrong.';
      console.log(err);
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
    <View style={styles.container}>
      <View style={styles.backgroundContainer} />
      <Container padding={null}>
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
          onPress={() => navigation.goBack()}
          title={organisation ? 'Cancel' : 'OK'}
        />
      </Container>
    </View>
  );
}

const styleSheet = ({ colors, sizes }, status) => ({
  container: {
    flex: 1,
    backgroundColor: colors[status],
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
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    borderTopRightRadius: 100,
    borderWidth: 2,
    borderColor: colors.background,
  },
  image: {
    marginTop: 55,
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
