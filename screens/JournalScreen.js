import React, { useState, useRef, useCallback } from 'react';
import FormScreen from './FormScreen';
import { Platform, Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function JournalScreen({ resetHandler }) {
  const [view, renderView] = useState('');
  const viewRef = useRef();

  const handleClick = useCallback((value) => {
    renderView({ view: [value] });
    viewRef.current = value;
  });

  if (view === '') {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Text style={styles.text}>Log your mood before sitting down to meditate.</Text>
          <Ionicons.Button
            style={{ justifyContent: 'center' }}
            name={
              Platform.OS === 'ios'
                ? `ios-add-circle`
                : 'md-add-circle'
            }
            size={50}
            color='black'
            backgroundColor='transparent'
            onPress={() => { handleClick('before') }} />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Log your mood after your practice.</Text>
          <Ionicons.Button
            style={{ justifyContent: 'center' }}
            name={
              Platform.OS === 'ios'
                ? `ios-add-circle`
                : 'md-add-circle'
            }
            size={50}
            color='black'
            backgroundColor='transparent'
            onPress={() => { handleClick('after') }} />
        </View>
      </View>
    )
  } else {
    return (
      <FormScreen view={viewRef.current} resetHandler={resetHandler} />
    )
  };
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    marginHorizontal: 90,
  },
  container: {
    marginTop: 100,
    marginBottom: 50,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
  },
});