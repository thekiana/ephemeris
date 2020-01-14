import React from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import JournalScreen from './JournalScreen';
import { StackActions, NavigationActions } from 'react-navigation';


export default function LinksScreen({ navigation }) {

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Links' })],
  });

  return (
    <ScrollView style={styles.container}>
      <JournalScreen resetHandler={() => navigation.dispatch(resetAction)} />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Journal',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});