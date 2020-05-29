import React, { useState } from 'react';
import { View, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import placeholder from '../assets/images/profile-placeholder.png';
import StyledIcon from './StyledIcon';

const { width } = Dimensions.get('window');

export default function ProfileImage({ status = 'red', source, ...props }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { colors } = useTheme();

  const styles = {
    container: {
      alignItems: 'center',
    },
    imageContainer: {
      overflow: 'hidden',
    },
    image: {
      resizeMode: 'cover',
      borderWidth: 2,
      borderColor: colors.background,
      borderRadius: width / 2,
      width: width / 1.6,
      height: width / 1.6,
    },
    icon: {
      position: 'absolute',
      bottom: '4%',
      right: '22%',
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
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={source && !error ? { uri: source } : placeholder}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => setError(true)}
        />
        {loading && <ActivityIndicator style={styles.loading} color={colors.background} />}
      </View>
    </View>
  );
}
