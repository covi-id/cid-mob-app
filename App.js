import * as React from 'react';
import {
   Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { enableScreens } from 'react-native-screens';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './store';
import getTheme from './styling/theme';
import navigator from './navigation';
import localization from './localization';

enableScreens();
localization();

export default function App() {
   const [initialNavigationState, setInitialNavigationState] = React.useState();
   const containerRef = React.useRef();
   const scheme = useColorScheme();

   const theme = getTheme(scheme === 'dark' ? 'dark' : 'default');
   const styles = StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: theme.colors.background,
      },
   });

   return (
      <GlobalProvider>
         <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppearanceProvider>
               <NavigationContainer theme={theme} ref={containerRef} initialState={initialNavigationState}>
                  {navigator}
               </NavigationContainer>
            </AppearanceProvider>
         </View>
      </GlobalProvider>
   );
}
