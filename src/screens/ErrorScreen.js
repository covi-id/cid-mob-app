import * as React from 'react';
import { View, Linking, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Heading, Container, StyledButton, StyledText } from '../components';
import { clearStorage } from '../services/storage';

export default function ErrorScreen({ navigation }) {
  const theme = useTheme();
  const styles = styleSheet(theme);

  async function reset() {
    await clearStorage();
  }

  async function navigate() {
    await reset();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    });
  }

  return (
    <Container>
      <View style={styles.headingContainer}>
        <Heading style={styles.heading}>Oops, something went wrong.</Heading>
      </View>
      <View style={styles.contentContainer}>
        <StyledButton style={styles.button} loadingWidth={250} title="Reset the app" onPress={navigate} />
        <TouchableOpacity onPress={() => Linking.openURL('mailto:info@coviid.me')}>
          <StyledText style={styles.text}>If this issue persists please contact us on info@coviid.me</StyledText>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styleSheet = ({ sizes }) => ({
  headingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  heading: {
    marginBottom: sizes.margin,
  },
  text: {
    margin: sizes.margin,
    fontSize: 12,
  },
  button: {
    marginTop: sizes.margin,
  },
});
