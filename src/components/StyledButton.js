import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import EditSvg from '../assets/svgs/edit';
import ArrowSvg from '../assets/svgs/arrow';

const { width } = Dimensions.get('screen');

export default function StyledButton({
  onPress,
  loading,
  loadingWidth,
  disabled,
  alternative,
  basic,
  dark,
  auth,
  flat,
  iconLeft,
  iconRight,
  title,
  titleColor,
  backgroundColor,
  ...props
}) {
  const { colors, sizes, fonts } = useTheme();

  const loadingValue = {
    width: useRef(new Animated.Value(loadingWidth)).current,
    borderRadius: useRef(new Animated.Value(50)).current,
    opacity: useRef(new Animated.Value(1)).current,
  };

  const styles = {
    container: {
      margin: sizes.margin / 3,
      height: 60,
    },
    contentContainer: {
      height: iconLeft ? 60 : 50,
      backgroundColor: disabled
        ? '#F1F0F8'
        : backgroundColor ||
          (auth
            ? '#27066B'
            : alternative
            ? colors.secondary
            : dark
            ? colors.background
            : basic
            ? 'transparent'
            : colors.primary),
      width: loading ? loadingValue.width : loadingWidth || (auth ? width / 1.5 : 'auto'),
      borderRadius: loadingValue.borderRadius,
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: auth ? 'flex-start' : 'center',
      alignSelf: 'center',
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    iconLeftContainer: {
      height: 60,
      paddingLeft: sizes.margin / 1.5,
      paddingRight: sizes.margin / 1.5,
      justifyContent: 'center',
      backgroundColor: auth ? colors.secondary : colors.info,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      opacity: loadingValue.opacity,
    },
    iconRightContainer: {
      height: 50,
      width: title ? 'auto' : 50,
      paddingLeft: title ? 5 : 0,
      paddingRight: title ? 25 : 0,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: loadingValue.opacity,
    },
    text: {
      color: titleColor || (basic ? colors.grey : dark || !alternative || disabled ? '#DCDAE9' : colors.primary),
      fontFamily: fonts.primarySemibold,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: sizes.margin / 2,
      paddingBottom: sizes.margin / 2,
      opacity: loadingValue.opacity,
    },
    loader: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      opacity: loading ? 1 : 0,
    },
  };

  if (loading && loadingWidth) {
    loadingAnimation(loadingWidth, 50, 50, 50 / 2, 1, 0);
  } else if (loadingWidth) {
    // loadingAnimation(50, loadingWidth, 50, 50 / 2, 0, 1);
    loadingValue.width.setValue(50);
    loadingValue.opacity.setValue(loadingWidth);
    loadingValue.borderRadius.setValue(50);
  }

  function loadingAnimation(widthStart, widthEnd, borderRadiusStart, borderRadiusEnd, opacityStart, opacityEnd) {
    // eslint-disable-next-line no-underscore-dangle
    // if (loadingValue.width._value !== widthEnd) {
    loadingValue.width.setValue(widthStart);
    loadingValue.opacity.setValue(opacityStart);
    loadingValue.borderRadius.setValue(borderRadiusStart);

    Animated.timing(loadingValue.width, {
      toValue: widthEnd,
      duration: 200,
    }).start();

    Animated.timing(loadingValue.borderRadius, {
      toValue: borderRadiusEnd,
      duration: 200,
    }).start();

    Animated.timing(loadingValue.opacity, {
      toValue: opacityEnd,
      duration: 150,
      useNativeDriver: true,
    }).start();
    // }
  }

  const RootElement = (p) =>
    Platform.OS === 'android' ? (
      <TouchableNativeFeedback
        useForeground
        onPress={onPress}
        style={p.style}
        disabled={p.disabled}
        background={TouchableNativeFeedback.Ripple(dark ? colors.shadow : colors.background, true)}
      >
        {p.children}
      </TouchableNativeFeedback>
    ) : (
      <TouchableOpacity onPress={onPress} style={p.style} disabled={p.disabled}>
        {p.children}
      </TouchableOpacity>
    );

  return (
    <View style={[styles.container, props.style]}>
      <RootElement onPress={onPress} disabled={disabled || loading}>
        <Animated.View style={styles.contentContainer}>
          {iconLeft && (
            <Animated.View style={styles.iconLeftContainer}>
              {getSvg(iconLeft, dark ? colors.primary : colors.background)}
            </Animated.View>
          )}
          {title && <Animated.Text style={styles.text}>{title}</Animated.Text>}
          {iconRight && (
            <Animated.View style={styles.iconRightContainer}>
              {getSvg(iconRight, dark ? colors.primary : colors.background)}
            </Animated.View>
          )}
          {loading && <ActivityIndicator style={styles.loader} color={colors.background} />}
        </Animated.View>
      </RootElement>
    </View>
  );
}

function getSvg(icon, color) {
  switch (icon) {
    case 'edit':
      return <EditSvg color={color} />;
    case 'arrow':
      return <ArrowSvg color={color} />;
    default:
      return null;
  }
}
