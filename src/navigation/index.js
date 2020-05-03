import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/landing';
import SplashScreen from '../screens/SplashScreen';
import ErrorScreen from '../screens/ErrorScreen';

const MainStack = createStackNavigator();

const INITIAL_ROUTE_NAME = 'Splash';

function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <MainStack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <MainStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardStyle: {
            opacity: 1,
          },
        }}
      />
      <MainStack.Screen name="Error" component={ErrorScreen} options={{ headerShown: false, gestureEnabled: false }} />
    </MainStack.Navigator>
  );
}

export default MainStackScreen();
