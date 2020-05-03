import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import crashlytics from '@react-native-firebase/crashlytics';
import DeviceInfo from 'react-native-device-info';
import { submitQR, getOrganisationQR, subtractCount } from '../../services/covid';
import { useGlobalStore } from '../../store';
import actions from '../../store/actions';
import ScanModal from './components/ScanModal';
import StatusModal from './components/StatusModal';
import {
  getOrganisation,
  saveOrganisation,
  deleteOrganisation,
  getURL,
  saveURL,
  deleteURL,
} from '../../services/storage';
import { StyledButton, Container, Heading, StyledText, StyledCheckboxSelection, BackButton } from '../../components';
import {
  LogoSvg,
  PurpleCircleSvg,
  YellowCircleSvg,
  ScanSvg,
  DotsSvg,
  StartBackgroundSvg,
  OrganisationBackgroundSvg,
} from '../../assets/svgs';

export default function LandingScreen({ navigation, route }) {
  const [scanVisible, setScanVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusVisible, setStatusVisible] = useState();
  const [userType, setUserType] = useState(
    route && route.params && route.params.userType ? route.params.userType : 'user'
  );
  const [profile, setProfile] = useState({});
  const { dispatch, store } = useGlobalStore();
  const { organisation, url } = store;
  const theme = useTheme();
  const styles = styleSheet(theme);
  const deviceId = DeviceInfo.getUniqueId();

  // -- get organisation from storage
  useEffect(() => {
    loadOrganisation();
  }, []);

  async function loadOrganisation() {
    try {
      const data = await getOrganisation();
      let endpoint = url;
      if (!endpoint) {
        endpoint = await getURL();
        if (endpoint) {
          dispatch(actions.setURL(endpoint));
        }
      }
      if (data && endpoint) {
        const response = await getOrganisationQR(data.id, endpoint);
        if (
          (response && response.data && !organisation) ||
          response.data.total !== organisation.total ||
          response.data.balance !== organisation.balance
        ) {
          saveOrganisation(response.data);
          dispatch(actions.setOrganisation(response.data));
        }
      }
    } catch (err) {
      crashlytics().recordError(err);
    }
  }

  async function logout() {
    setTimeout(() => {
      dispatch(actions.setURL(null));
      dispatch(actions.setOrganisation(null));
      deleteURL();
      deleteOrganisation();
    }, 500);
    navigation.reset({ index: 0, routes: [{ name: 'Landing', params: { reset: true } }] });
  }

  async function scan() {
    setScanVisible(true);
  }

  async function subtract() {
    setLoading(true);
    try {
      await subtractCount(organisation.id, deviceId, url);
      loadOrganisation();
    } catch (err) {
      Snackbar.show({
        text: 'Could not subtract from counter.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: theme.colors.red,
      });
    }
    setLoading(false);
  }

  async function onRead(barcode) {
    const { data } = barcode;
    if (data && !loading) {
      const matches = data.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
      const domain = matches && matches[0];
      const endpoint = `${domain}api/`;
      if (endpoint && (!url || endpoint !== url)) {
        dispatch(actions.setURL(endpoint));
        saveURL(endpoint);
      }

      setScanVisible(false);
      setLoading(true);

      if (userType === 'organisation') {
        try {
          const response = await getOrganisationQR(data);
          dispatch(actions.setOrganisation(response.data));
          saveOrganisation(response.data);
          navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
        } catch (err) {
          Snackbar.show({
            text: 'Could not get organisation information. Please try again.',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: theme.colors.red,
          });
          crashlytics().log(`Could not get organisation information. QR data: ${data}`);
        }
        return;
      }

      try {
        let params;
        if (organisation && organisation.id) {
          params = { organisationId: organisation.id, devideIdentifier: deviceId };
        }
        const response = await submitQR(data, params);
        if (response && response.data && response.data.covidStatus) {
          setProfile(response.data);
          setStatusVisible(true);
          if (organisation && organisation.id) {
            loadOrganisation();
          }
        } else {
          Snackbar.show({
            text: 'Could not get results. Please try again.',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: theme.colors.red,
          });
          crashlytics().log(`Could not get test results. QR data: ${data}`);
        }
      } catch (err) {
        // display snackbar
        console.log(err);
        let message = 'Something went wrong';
        if (err.response && err.response.status === 404) {
          message = 'Could not find individual linked to this organisation.';
        }
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.colors.red,
        });
        crashlytics().log(`Could not get test results. QR data: ${data}`);
        crashlytics().recordError(err);
      } finally {
        setLoading(false);
      }
    }
  }
  const checkboxOptions = [
    { label: 'An Individual', value: 'user' },
    { label: 'An Organisation', value: 'organisation' },
  ];

  function renderUserSelect() {
    return (
      <View style={styles.contentContainer}>
        <Heading bold style={styles.heading}>
          {'What are\nyou?'}
        </Heading>
        <StyledCheckboxSelection
          style={styles.selectionContainer}
          setSelectedValues={setUserType}
          selectedValues={userType}
        >
          {checkboxOptions}
        </StyledCheckboxSelection>
        <StyledButton
          loading={loading}
          loadingWidth={130}
          alternative
          title="Next"
          onPress={() => {
            navigation.push('Landing', { userType: Array.isArray(userType) ? userType[0] : userType });
          }}
        />
      </View>
    );
  }

  function renderScanOrganisation() {
    return (
      <View style={styles.contentContainer}>
        <ScanSvg style={styles.scanSvg} />
        <Heading bold style={styles.headingScanOrganisation}>
          Scan your organisation identifier
        </Heading>
        <StyledButton loading={loading} loadingWidth={130} alternative title="Scan" onPress={scan} />
      </View>
    );
  }

  function renderScanUser() {
    return (
      <View style={styles.contentContainer}>
        <ScanSvg style={styles.scanSvg} />
        <Heading bold style={styles.heading}>
          Scan a QR code
        </Heading>
        <StyledButton loading={loading} loadingWidth={130} alternative title="Scan" onPress={scan} />
      </View>
    );
  }

  function renderOrganisation() {
    return (
      <View style={styles.organisationContainer}>
        <View style={styles.scanContainer}>
          <ScanSvg style={styles.scanSvg} />
          <Heading bold style={styles.headingOrganisation}>
            Scan a QR code
          </Heading>
          <StyledButton loading={loading} loadingWidth={130} alternative title="Scan" onPress={scan} />
        </View>
        <View style={styles.counterContainer}>
          <Heading bold style={styles.headingCounterText}>
            Counter
          </Heading>
          <StyledText style={styles.counterText}>{organisation.balance ?? 0}</StyledText>
          <StyledText bold style={styles.totalText}>{`Total Scans  -  ${organisation.total ?? 0}`}</StyledText>
          <StyledButton
            disabled={(organisation.balance ?? 0) <= 0}
            loading={loading}
            loadingWidth={160}
            title="Subtract"
            onPress={subtract}
          />
        </View>
        <View>
          <StyledText bold>{`Logged into ${organisation.name}`}</StyledText>
          <StyledButton basic title="Log out" onPress={logout} />
        </View>
      </View>
    );
  }
  const showBackButton =
    (route.params && route.params.userType === 'user') || (route.params && route.params.userType === 'organisation');
  const showOrganisationBackground = (!route.params || !route.params.userType) && organisation;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {showOrganisationBackground ? (
        <OrganisationBackgroundSvg style={styles.backgroundOrganisation} />
      ) : (
        <StartBackgroundSvg style={styles.background} />
      )}
      <PurpleCircleSvg style={styles.purpleSvg} />
      <YellowCircleSvg style={styles.yellowsvg} />
      <DotsSvg style={styles.dotsSvg} />
      {showBackButton && <BackButton style={styles.backButton} navigation={navigation} />}
      <Container>
        <View style={styles.logoSvg}>
          <LogoSvg />
        </View>
        {route.params && route.params.userType === 'user'
          ? renderScanUser()
          : route.params && route.params.userType === 'organisation'
          ? renderScanOrganisation()
          : !organisation || (route && route.params && route.params.reset)
          ? renderUserSelect()
          : renderOrganisation()}
      </Container>
      <ScanModal visible={scanVisible} setVisible={setScanVisible} onRead={onRead} />
      <StatusModal profile={profile} visible={statusVisible} setVisible={setStatusVisible} />
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
    justifyContent: 'center',
  },
  selectionContainer: {
    marginBottom: sizes.margin,
  },
  organisationContainer: {
    flex: 1,
    marginTop: sizes.margin * 2,
    alignItems: 'center',
    justifyContent: 'space-around',
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
    margin: sizes.margin * 2,
    fontSize: 28,
  },
  headingCounterText: {
    color: colors.textSecondary,
    fontSize: 24,
  },
  counterText: {
    fontSize: 40,
    color: colors.grey,
  },
  totalText: {
    fontSize: 16,
    color: colors.grey,
  },
  logoSvg: {
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanSvg: {},
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
