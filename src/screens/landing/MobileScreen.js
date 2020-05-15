import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import crashlytics from '@react-native-firebase/crashlytics';
import { StyledButton, Container, Heading, BackButton } from '../../components';
import MobileInput from './components/MobileInput';
import { LogoSvg, ScanSvg, DotsSvg, StartBackgroundSvg } from '../../assets/svgs';
import { checkInMobile, checkOutMobile } from '../../services/covid';

export default function MobileScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState();
  const { profile, organisation, url, loadOrganisation } = route.params;
  const theme = useTheme();
  const styles = styleSheet(theme);

  async function inPress() {
    setLoading(true);
    let message = 'Successfully checked in';
    let messageColor = theme.colors.green;
    try {
      await checkInMobile(organisation.id, input, url);
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
      await checkOutMobile(organisation.id, input, url);
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
    const match = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const regex = new RegExp(match);
    return input && input.length >= 10 && regex.test(input);
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
      <BackButton style={styles.backButton} navigation={navigation} />
      <Container>
        <View style={styles.logoSvg}>
          <LogoSvg />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentContainer}>
            <View style={{ alignItems: 'center' }}>
              <ScanSvg style={styles.scanSvg} />
              <Heading bold style={styles.heading}>
                Enter mobile
              </Heading>
            </View>
            <MobileInput placeholder="Mobile Entry" value={input} max={16} onChangeText={onInputChange} />
            <View style={{ marginTop: theme.sizes.margin }}>
              <StyledButton
                disabled={!validInput()}
                loading={loading}
                loadingWidth={160}
                title="In"
                onPress={inPress}
              />
              <StyledButton
                loading={loading}
                loadingWidth={160}
                disabled={!validInput()}
                titleColor={theme.colors.background}
                backgroundColor={theme.colors.red}
                alternative
                max={16}
                title="Out"
                onPress={outPress}
              />
            </View>
          </View>
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
  selectionContainer: {
    marginBottom: sizes.margin,
  },
  scanContainer: {
    alignItems: 'center',
  },
  counterContainer: {
    marginTop: sizes.margin / 2,
    marginBottom: sizes.margin / 2,
  },
  background: {
    position: 'absolute',
  },
  backgroundOrganisation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  heading: {
    color: colors.textSecondary,
    marginTop: sizes.margin,
    marginBottom: sizes.margin,
    fontSize: 34,
  },
  headingOrganisation: {
    margin: sizes.margin,
  },
  headingScanOrganisation: {
    color: colors.textSecondary,
    margin: sizes.margin,
    fontSize: 28,
  },
  headingCounterText: {
    color: colors.textSecondary,
    fontSize: 24,
  },
  counterText: {
    fontSize: 70,
    color: colors.grey,
  },
  totalText: {
    fontSize: 18,
    color: colors.grey,
  },
  logoSvg: {
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanSvg: {
    marginTop: sizes.margin,
  },
  purpleSvg: {
    right: -sizes.margin,
    top: sizes.margin * 2.5,
    position: 'absolute',
  },
  yellowsvg: {
    bottom: sizes.margin * 2,
    left: -5,
    position: 'absolute',
  },
  dotsSvg: {
    bottom: sizes.margin * 2,
    right: sizes.margin,
    position: 'absolute',
  },
});
