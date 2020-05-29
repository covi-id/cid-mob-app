import React, { useState } from 'react';
import { View, TextInput, Text, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import countries from '../../../utils/countries';

export default function MobileInput({ placeholder, max, onChange, ...props }) {
  const { colors, sizes, fonts } = useTheme();
  const [country, setCountry] = useState('+27');
  const [input, setInput] = useState();
  const countriesOrdered = countries.sort((a, b) => a.name > b.name);
  const styles = {
    container: {
      flexDirection: 'row',
    },
    pickerOverlay: {
      backgroundColor: '#C9C0FA',
      height: 55,
      width: 70,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
    },
    pickerIOS: {
      height: 55,
      width: 70,
      marginRight: sizes.margin / 1.5,
    },
    pickerIOSText: {
      color: 'transparent',
    },
    pickerAndroid: {
      fontSize: sizes.body,
      marginRight: sizes.margin / 1.5,
      height: 55,
      width: 70,
      color: 'transparent',
    },
    input: {
      fontSize: sizes.body,
      height: 55,
      width: 160,
      backgroundColor: '#C9C0FA',
      borderRadius: 60,
      paddingLeft: sizes.margin / 1.5,
      paddingRight: sizes.margin / 1.5,
      paddingBottom: 5,
      paddingTop: Platform.OS === 'android' ? 8 : 5,
      color: props.dark ? colors.background : '#110A37',
      fontFamily: fonts.primary,
    },
    text: {
      fontSize: sizes.body,
      color: colors.text,
    },
  };

  const onChangeText = (value) => {
    const match = /^\+?[0-9]*$/;
    const regex = new RegExp(match);
    const text = !value || regex.test(value) ? value : !input ? '' : input;
    setInput(text);
    onChange(country + text);
  };

  const onCountryChange = (value) => {
    setCountry(value);
    onChange(value + input);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.pickerOverlay}>
          <Text style={styles.text}>{country}</Text>
        </View>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          style={{
            inputIOSContainer: styles.pickerIOS,
            inputIOS: styles.pickerIOSText,
            inputAndroid: styles.pickerAndroid,
          }}
          value={country}
          placeholder={{}}
          onValueChange={(value) => onCountryChange(value)}
          items={countriesOrdered.map((item) => ({ label: item.name, value: item.dial_code }))}
        />
      </View>
      <TextInput
        value={input}
        placeholderTextColor="#110A37"
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={[styles.input, props.style]}
        maxLength={max}
      />
    </View>
  );
}
