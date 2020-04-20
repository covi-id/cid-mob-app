import * as React from 'react';
import {
   Dimensions, View, TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import StyledText from './StyledText';

const initialLayout = { width: Dimensions.get('window').width };

export default function Tabs({
   children,
}) {
   const [index, setIndex] = React.useState(0);
   const [routes] = React.useState(children.map((x) => ({ key: x.key, title: x.title })));

   const {
      colors, sizes, shadow,
   } = useTheme();

   const scenes = {};
   for (let i = 0; i < children.length; i += 1) {
      const item = children[i];
      scenes[item.key] = item.render;
   }

   const renderScene = SceneMap(scenes);

   const styles = {
      container: {
         flexDirection: 'row',
         justifyContent: 'center',
         marginLeft: sizes.margin,
         marginRight: sizes.margin,
         marginTop: sizes.margin / 2,
         marginBottom: sizes.margin / 2,
      },
      indicatorContainer: {
         backgroundColor: colors.primary,
         borderRadius: 50,
         ...shadow,
         padding: sizes.margin,
         paddingTop: sizes.margin / 2,
         paddingBottom: sizes.margin / 2,
      },
      indicatorContainerInactive: {
         backgroundColor: 'transparent',
         elevation: 0,
      },
      indicator: {
         fontSize: 14,
         color: colors.background,
      },
      indicatorInactive: {
         color: colors.primary,
      },
   };

   const renderTabBar = ({ navigationState, jumpTo }) => (
      <View style={styles.container}>
         {navigationState.routes.map((route, i) => (
            <TouchableOpacity
               key={route.key}
               style={[styles.indicatorContainer, index !== i && styles.indicatorContainerInactive]}
               onPress={() => jumpTo(route.key)}
            >
               <StyledText
                  bold
                  style={[styles.indicator, index !== i && styles.indicatorInactive]}
               >
                  {route.title}
               </StyledText>
            </TouchableOpacity>
         ))}
      </View>
   );

   return (
      <TabView
         navigationState={{ index, routes }}
         renderScene={renderScene}
         renderTabBar={renderTabBar}
         onIndexChange={setIndex}
         initialLayout={initialLayout}
         tabStyle={{ width: 'auto' }}
         indicatorContainerStyle={styles.indicatorContainer}
      />
   );
}
