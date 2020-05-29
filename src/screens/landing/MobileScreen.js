import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import crashlytics from '@react-native-firebase/crashlytics';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { StyledButton, Container, Heading, StyledText } from '../../components';
import MobileInput from './components/MobileInput';
import { LogoSvg, DotsSvg, StartBackgroundSvg, PurpleCircleSvg } from '../../assets/svgs';
import { checkInMobile, checkOutMobile } from '../../services/covid';

export default function MobileScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const { profile, organisation, url, loadOrganisation } = route.params;
  const theme = useTheme();
  const styles = styleSheet(theme);

  async function inPress() {
    setLoading(true);
    let message = 'Successfully checked in';
    let messageColor = theme.colors.green;
    try {
      const formatted = parsePhoneNumberFromString(input, 'ZA').formatInternational().replace(/\s/g, '');
      await checkInMobile(organisation.id, formatted, url);
      loadOrganisation();
      navigation.goBack();
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
      const formatted = parsePhoneNumberFromString(input, 'ZA').formatInternational().replace(/\s/g, '');
      await checkOutMobile(organisation.id, formatted, url);
      loadOrganisation();
      navigation.goBack();
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

  function validInput() {
    const valid = parsePhoneNumberFromString(input, 'ZA');
    return valid && valid.isValid();
  }

  function onInputChange(value) {
    const match = /^\+?[0-9]*$/;
    const regex = new RegExp(match);
    const text = !value || regex.test(value) ? value : !input ? '' : input;
    setInput(text);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <StartBackgroundSvg style={styles.background} />
      <DotsSvg style={styles.dotsSvg} />
      <PurpleCircleSvg style={styles.purpleSvg} />
      <Container>
        <View style={styles.logoSvg}>
          <LogoSvg />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentContainer}>
            <View style={{ alignItems: 'center' }}>
              <Heading bold style={styles.heading}>
                Mobile number
              </Heading>
              <StyledText bold style={styles.text}>
                Enter Mobile
              </StyledText>
              <MobileInput placeholder="Enter Number" value={input} max={16} onChange={onInputChange} />
            </View>
            <View style={{ marginTop: theme.sizes.margin }}>
              <StyledButton
                disabled={!validInput()}
                loading={loading}
                loadingWidth={160}
                title="Check-In"
                onPress={inPress}
                backgroundColor={theme.colors.secondary}
              />
              <StyledButton
                loading={loading}
                loadingWidth={160}
                disabled={!validInput()}
                titleColor={theme.colors.background}
                backgroundColor={theme.colors.red}
                alternative
                max={16}
                title="Check-Out"
                onPress={outPress}
              />
            </View>
          </View>
          <StyledButton basic style={styles.button} onPress={() => navigation.goBack()} title="Cancel" />
        </View>
      </Container>
    </View>
  );
}

const styleSheet = ({ sizes, colors }) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: sizes.margin,
  },
  background: {
    position: 'absolute',
  },
  heading: {
    color: colors.primary,
    marginBottom: sizes.margin / 2,
    fontSize: 34,
    alignSelf: 'flex-start',
  },
  text: {
    marginBottom: sizes.margin / 2,
    alignSelf: 'flex-start',
  },
  logoSvg: { marginTop: -10 },
  purpleSvg: {
    right: -sizes.margin,
    top: sizes.margin * 2.5,
    position: 'absolute',
  },
  dotsSvg: {
    bottom: sizes.margin * 2,
    right: sizes.margin,
    position: 'absolute',
  },
  button: {
    alignSelf: 'center',
  },
});
