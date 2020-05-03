import React, { useState } from 'react';
import { View, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import placeholder from '../assets/images/profile-placeholder.png';
import StyledIcon from './StyledIcon';

export default function ProfileImage({ status = 'red', source, ...props }) {
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  const { width } = Dimensions.get('window');

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      width: width / 1.6,
      height: width / 1.6,
    },
    imageContainer: {
      overflow: 'hidden',
      borderRadius: width / 3,
      borderWidth: 2,
      borderColor: colors.background,
    },
    image: {
      resizeMode: 'cover',
      width: width / 1.6,
      height: width / 1.6,
    },
    icon: {
      position: 'absolute',
      bottom: 8,
      left: 22,
    },
    background: {
      height: width / 2.6,
      width,
      backgroundColor: colors[`${status}Background`],
    },
    topBackground: {
      borderTopRightRadius: width / 3,
    },
    bottomBackground: {
      borderBottomLeftRadius: width / 3,
    },
    backgroundContainer: {
      flex: 1,
      position: 'absolute',
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };

  return (
    <View {...props} style={[styles.container, props.style]}>
      <View style={styles.backgroundContainer}>
        <View style={[styles.background, styles.topBackground]} />
        <View style={[styles.background, styles.bottomBackground]} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={source ? { uri: source } : placeholder}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
          {loading && <ActivityIndicator style={styles.loading} color={colors.background} />}
        </View>
        <StyledIcon status={status} alternative style={styles.icon} />
      </View>
    </View>
  );
}
