import React, { useState } from 'react';
import {
   View, StatusBar,
} from 'react-native';
import locale from 'i18n-js';
import { useTheme } from '@react-navigation/native';
import LogoSvg from '../assets/svgs/logo';
import PurpleSvg from '../assets/svgs/circle-purple';
import YellowSvg from '../assets/svgs/circle-yellow';
import ScanSvg from '../assets/svgs/scan';
import DotsSvg from '../assets/svgs/dots';
import {
   StyledButton, Container, ScanModal, StatusModal, Heading,
} from '../components';
import BackgroundSvg from '../assets/svgs/start-background';

export default function StartScreen({ navigation }) {
   const [scanVisible, setScanVisible] = useState(false);
   const [loading, setLoading] = useState(false);
   const [statusVisible, setStatusVisible] = useState();
   const [status, setStatus] = useState();
   const { sizes, colors } = useTheme();

   const styles = {
      container: {
         flex: 1,
      },
      contentContainer: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
      },
      background: {
         position: 'absolute',
      },
      heading: {
         color: colors.textSecondary,
         margin: sizes.margin,
         fontSize: 34,
      },
      logoSvg: {
         left: sizes.margin,
         top: sizes.margin * 2,
      },
      scanSvg: {
      },
      purpleSvg: {
         right: sizes.margin,
         top: sizes.margin * 2.5,
      },
      yellowsvg: {
         bottom: sizes.margin * 2,
         left: -5,
      },
      dotsSvg: {
         bottom: sizes.margin * 2,
         right: sizes.margin,
      },
   };

   function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
   }

   const statuses = [
      'green',
      'amber',
      'red',
   ];

   async function scan() {
      setStatus(statuses[getRandomInt(3)]);
      setScanVisible(true);
   }

   function onRead(barcode) {
      const { data } = barcode;
      if (data && !loading) {
         setScanVisible(false);
         setLoading(true);
         setTimeout(() => {
            setLoading(false);
            setStatus('amber');
            setStatusVisible(true);
         }, 1200);
      }
   }

   return (
      <View style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
         <BackgroundSvg style={styles.background} />
         <LogoSvg style={[{ position: 'absolute' }, styles.logoSvg]} />
         <PurpleSvg style={[{ position: 'absolute' }, styles.purpleSvg]} />
         <YellowSvg style={[{ position: 'absolute' }, styles.yellowsvg]} />
         <DotsSvg style={[{ position: 'absolute' }, styles.dotsSvg]} />
         <Container legal={false}>
            <View style={styles.contentContainer}>
               <ScanSvg style={styles.scanSvg} />
               <Heading bold style={styles.heading}>Scan a QR code</Heading>
               <StyledButton loading={loading} loadingWidth={130} alternative title="Scan" onPress={scan} />
            </View>
         </Container>
         <ScanModal visible={scanVisible} setVisible={setScanVisible} onRead={onRead} />
         <StatusModal status={status} visible={statusVisible} setVisible={setStatusVisible} />
      </View>
   );
}
