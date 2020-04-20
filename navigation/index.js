import * as React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import SplashScreen from '../screens/SplashScreen';
import ErrorScreen from '../screens/ErrorScreen';

const MainStack = createStackNavigator();

const INITIAL_ROUTE_NAME = 'Splash';

function MainStackScreen() {
   return (
      <MainStack.Navigator
         initialRouteName={INITIAL_ROUTE_NAME}
      >
         <MainStack.Screen name="Start" component={StartScreen} options={{ headerShown: false, gestureEnabled: false }} />
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

export default
(
   MainStackScreen()
);
