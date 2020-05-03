import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const defaultColors = {
  ...DefaultTheme.colors,
  primary: '#654CF0',
  primaryShadow: '#00CBFFCC',
  primaryAccent: '#5840DD',
  secondary: '#03F5A9',
  secondaryAccent: '#2E0382',
  secondaryShadow: '#CCBFE6',
  tertiary: '#FF5700',
  textPrimary: '#1A0B3D',
  textSecondary: '#513CC5',
  grey: '#B6B3C9',
  background: '#FFF',
  backgroundAccent: '#F5F5F6',
  red: '#FF4870',
  redAccent: '#FFB6C6',
  redBackground: '#F27493',
  green: '#03CE8E',
  greenAccent: '#9AEBD2',
  greenBackground: '#64E0A0',
  amber: '#FBD928',
  amberAccent: '#FBEFAF',
  amberBackground: '#FDEC93',
};

const sizes = {
  heading: 28,
  headingImage: 70,
  subHeading: 20,
  body: 16,
  radius: 30,
  margin: 30,
  marginTop: 10,
  marginBottom: 10,
};

const fonts = {
  primary: 'poppins',
  primarySemibold: 'poppins-semibold',
};

const shadow = {
  shadowColor: '#190a3c',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  elevation: 5,
};

const defaultTheme = {
  ...DefaultTheme,
  colors: defaultColors,
  sizes,
  fonts,
  shadow,
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...defaultColors,
  },
  sizes,
  fonts,
  shadow,
};

export default function getTheme(theme) {
  switch (theme) {
    default:
    case 'default':
      return defaultTheme;
    case 'dark':
      return darkTheme;
  }
}
