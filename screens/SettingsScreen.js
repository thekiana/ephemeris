import React from 'react';
import { Image, Text, StyleSheet, ScrollView, View } from 'react-native';
import userStats from '../userStats.js';
import { min } from 'moment';

export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: []
    }
  }

  componentDidMount() {
    return fetch('http://127.0.0.1:3000', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          formData: JSON.stringify(responseJson)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  calcStats() {
    var totals = 0;
    var counter = 0;

    for (var i = 0; i < userStats.length; i++) {
      var stat = userStats[i];
      if (stat.moodBefore < stat.moodAfter) {
        let maths = (stat.moodAfter - stat.moodBefore);
        totals += maths;
        counter++;
      }
    }

    var moodScore = Math.ceil(totals / counter);
    var percentage = (moodScore / 5) * 100;
    return percentage;
  }

  styleStats() {
    var types = {};

    for (var i = 0; i < userStats.length; i++) {
      var stat = userStats[i];

      if (types[stat.meditationStyle] === undefined) {
        types[stat.meditationStyle] = 1;
      } else {
        types[stat.meditationStyle]++;
      }
    }

    var typeList = Object.keys(types).slice(0, 3).join(', ');
    return typeList;
  }

  minutesStats() {
    var mins = 0;
    var type = '';
    var optimal;
    var counter = 0;

    for (var i = 0; i < userStats.length; i++) {
      var stat = userStats[i];
      var style = this.styleStats();
      var styleArr = style.split(', ');
      
      if (styleArr[0] === stat.meditationStyle) {
        type = stat.meditationStyle;
        mins += stat.minutesSpent;
        counter++
      }

      optimal = mins / counter;
      optimal = optimal + 15;
    }
    
    return `${optimal} of ${type}`;
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={styles.stats}>
          Your overall mood enhancement:
        </Text>

        <View style={styles.circle}>
          <Text style={styles.statNums}>
            {this.calcStats()}%
          </Text>
        </View>

        <Text style={styles.stats}>
          Your optimal meditation styles:
        </Text>

        <Text style={styles.smallStats}>
          {this.styleStats()}
        </Text>

        <Text style={styles.stats}>
          Your meditative sweet spot to guide you in entering a calm, equanimous space:
        </Text>

        <Text style={styles.smallStats}>
          {this.minutesStats()}
        </Text>
        <Text style={styles.smallStats}>
          60 of Movement
        </Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  statNums: {
    textAlign: 'center',
    fontFamily: 'Baskerville-BoldItalic',
    color: 'black',
    fontSize: 60,
  },
  circle: {
    alignItems: 'center',
    backgroundColor: '#ffe599',
    borderColor: '#ffe599',
    borderRadius: 100,
    borderWidth: 50,
    maxWidth: 300,
  },
  stats: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Baskerville-BoldItalic',
    marginVertical: 30,
    marginTop: 40,
  },
  smallStats: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Baskerville',
    marginVertical: 1,
  }
})

SettingsScreen.navigationOptions = {
  title: 'Stats',
};