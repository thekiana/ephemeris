import React from 'react';
import { Text } from 'react-native';

export default function SettingsScreen() {
  return (
    <Text style={{
      textAlign: 'center',
      fontSize: 20,
      fontFamily: 'Baskerville-BoldItalic',
      marginVertical: 300}}> 
      Loading... 
    </Text>
  )
}

SettingsScreen.navigationOptions = {
  title: 'Stats',
};
