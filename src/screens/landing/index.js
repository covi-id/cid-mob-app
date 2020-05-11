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
  const [walletId, setWalletId] = useState();
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

  // organisation = { url: '', name: 'Old Mutual' };
  // url = 'asd';

  // -- get organisation from storage
  useEffect(() => {
    loadOrganisation();
  }, []);

  async function loadOrganisation() {
    try {
      const data = await getOrganisation();
      // let endpoint = url;
      // if (!endpoint) {
      //   endpoint = await getURL();
      //   if (endpoint) {
      //     dispatch(actions.setURL(endpoint));
      //   }
      // }
      if (data) {
        const response = await getOrganisationQR(data.id);
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
      // dispatch(actions.setURL(null));
      dispatch(actions.setOrganisation(null));
      // deleteURL();
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
      // const matches = data.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
      // const domain = matches && matches[0];
      // const endpoint = `${domain}api/`;
      // if (endpoint && (!url || endpoint !== url)) {
      //   dispatch(actions.setURL(endpoint));
      //   saveURL(endpoint);
      // }

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
        } finally {
          setTimeout(() => setLoading(false), 500);
        }
        return;
      }

      try {
        // let params;
        // if (organisation && organisation.id) {
        //   params = { organisationId: organisation.id, devideIdentifier: deviceId };
        // }
        const parsed = JSON.parse(data);
        const response = await submitQR(parsed.walletId, parsed.key);
        if (response && response.data && response.data.resultStatus) {
          setWalletId(data.wallet);
          setProfile(response.data);
          navigation.navigate('Status', { profile: response.data, organisation, url, walletId, loadOrganisation });

          // setStatusVisible(true);
          // if (organisation && organisation.id) {
          //   loadOrganisation();
          // }
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
        setTimeout(() => setLoading(false), 500);
      }
    }
  }

  function renderScanUser() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.contentContainer}>
          <ScanSvg style={styles.scanSvg} />
          <Heading bold style={styles.heading}>
            Scan a QR code
          </Heading>
        </View>
        <StyledButton
          loading={loading}
          loadingWidth={150}
          alternative
          title="Scan"
          style={{ marginBottom: 100, marginTop: -100 }}
          onPress={scan}
        />
        <StyledButton
          loading={loading}
          loadingWidth={150}
          basic
          titleColor={theme.colors.primary}
          title="Log In"
          onPress={() => {
            navigation.push('Landing', { userType: 'organisation' });
          }}
        />
      </View>
    );
  }

  function renderScanOrganisation() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.contentContainer}>
          <ScanSvg style={styles.scanSvg} />
          <Heading bold style={styles.headingScanOrganisation}>
            {'Scan Organisation\nQR Code'}
          </Heading>
        </View>
        <StyledButton
          loading={loading}
          loadingWidth={130}
          alternative
          title="Scan"
          onPress={scan}
          style={{ marginBottom: 100, marginTop: -100 }}
        />
      </View>
    );
  }

  function renderOrganisation() {
    return (
      <View style={styles.container}>
        <View style={styles.organisationContainer}>
          <View style={styles.counterContainer}>
            <Heading bold style={styles.headingCounterText}>
              Counter
            </Heading>
            <StyledText style={styles.counterText}>{organisation.balance ?? 0}</StyledText>
            <StyledText bold style={styles.totalText}>{`Total Scans  -  ${organisation.total ?? 0}`}</StyledText>
          </View>
          <StyledButton loading={loading} loadingWidth={130} alternative title="Scan" onPress={scan} />
        </View>
        <View>
          <StyledText style={{ color: theme.colors.grey }} bold>{`Logged into ${organisation.name}`}</StyledText>
          <StyledButton titleColor={theme.colors.primary} basic title="Log out" onPress={logout} />
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
        {(route && route.params && route.params.reset) ||
        ((!route.params || (route.params && route.params.userType !== 'organisation')) && !organisation)
          ? renderScanUser()
          : route.params && route.params.userType === 'organisation'
          ? renderScanOrganisation()
          : renderOrganisation()}
      </Container>
      <ScanModal visible={scanVisible} setVisible={setScanVisible} onRead={onRead} userType={userType} />
      {/* <StatusModal
        profile={profile}
        organisation={organisation}
        url={url}
        walletId={walletId}
        visible={statusVisible}
        loadOrganisation={loadOrganisation}
        setVisible={setStatusVisible}
      /> */}
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
    paddingBottom: sizes.margin,
  },
  selectionContainer: {
    marginBottom: sizes.margin,
  },
  organisationContainer: {
    flex: 1,
    marginTop: sizes.margin,
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