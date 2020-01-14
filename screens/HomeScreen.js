import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthSession } from 'expo';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              require('../assets/images/meditation.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.informationContainer}>
          <Description />

          <Text style={styles.defaultText}>Today's practice is </Text>

          <View
            style={[styles.codeHighlightContainer, styles.shadowEffectBox]}>
            <Text style={styles.descriptionTextFancy}>30 minutes of </Text>
          </View>

          <Text style={styles.meditationTextFancy}>
            Vipassana
          </Text>

        </View>

      </ScrollView>

        <View style={styles.welcomeNameContainer}>
            <Text style={styles.welcomeNameText}>Welcome, Kiana</Text>
        </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function Description() {
    return (
      <Text style={styles.descriptionText}>
        Find equanamity with your optimized meditation for today.
      </Text>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  descriptionText: {
    marginBottom: 30,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  descriptionTextFancy: {
    margin: 20,
    color: 'rgba(0,0,0,0.8)',
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Baskerville-BoldItalic',
  },
  meditationTextFancy: {
    margin: 10,
    padding: 20,
    color: 'rgba(0,0,0,0.8)',
    fontSize: 30,
    lineHeight: 19,
    textAlign: 'center',
    fontFamily: 'Baskerville-BoldItalic',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  informationContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 10,
  },
  defaultText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  welcomeNameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'red',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 20,
  },
  welcomeNameText: {
    marginVertical: -2,
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Baskerville',
  },
  shaddowEffect: {
    marginVertical: 7,
  },
  shadowEffectBox: {
    marginTop: 10,
  },
});
