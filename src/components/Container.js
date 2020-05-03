import React, { useState } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

export default function Container({ children, scroll, padding = true, ...props }) {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { sizes } = useTheme();

  const styles = {
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: padding && sizes.margin,
      paddingTop: padding && sizes.margin * 2.5,
      paddingBottom: 0,
      flexGrow: 1,
      justifyContent: 'space-between',
    },
  };

  return (
    <View style={[styles.container, props.style]}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.contentContainer, props.contentStyle]}
        onContentSizeChange={(width, contentHeight) => {
          if (contentHeight <= height) {
            setScrollEnabled(false);
          }
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
}
