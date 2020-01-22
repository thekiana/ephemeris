import React from 'react';
import { Image, Text, StyleSheet, ScrollView, View } from 'react-native';

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
          formData: responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  calcStat() {
    var totals = 0;
    var counter = 0;

    var userStats = this.state.formData;

    for (var i = 0; i < userStats.length; i++) {
      var stat = userStats[i];
      if (stat.moodbefore < stat.moodafter) {
        let maths = (stat.moodafter - stat.moodbefore);
        totals += maths;
        counter++;
      }
    }

    var moodScore = Math.ceil(totals / counter);
    var percentage = (moodScore / 5) * 100;
    return percentage;
  }

  styleStat() {
    var types = {};

    var userStats = this.state.formData;

    for (var i = 0; i < userStats.length; i++) {
      var stat = userStats[i];

      if (types[stat.meditationstyle] === undefined) {
        types[stat.meditationstyle] = 1;
      } else {
        types[stat.meditationstyle]++;
      }
    }

    var typeList = Object.keys(types).slice(0, 3).join(', ');
    return typeList;
  }

  minutesStat() {
    var mins = 0;
    var type = '';
    var optimal;
    var counter = 0;

    var userStats = this.state.formData;

    for (var i = 0; i < userStats.length; i++) {
      var stat = userStats[i];
      var style = this.styleStat();
      var styleArr = style.split(', ');
      
      if (styleArr[0] === stat.meditationstyle) {
        type = stat.meditationstyle;
        mins += stat.minutesspent;
        counter++
      }

      optimal = mins / counter;
      optimal = Math.floor(optimal);
    }
    
    return `${optimal} of ${type}`;
  }

  render() {

    return (
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={styles.stat}>
          Your overall mood enhancement:
        </Text>

        <View style={styles.circle}>
          <Text style={styles.statNums}>
            {this.calcStat()}%
          </Text>
        </View>

        <Text style={styles.stat}>
          Your optimal meditation styles:
        </Text>

        <Text style={styles.smallStat}>
          {this.styleStat()}
        </Text>

        <Text style={styles.stat}>
          Your meditative sweet spot to guide you in entering a calm, equanimous space:
        </Text>

        <Text style={styles.smallStat}>
          {this.minutesStat()}
        </Text>
        {/* <Text style={styles.smallStat}>
          60 of Movement
        </Text> */}
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
  stat: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Baskerville-BoldItalic',
    marginVertical: 30,
    marginTop: 40,
  },
  smallStat: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Baskerville',
    marginVertical: 1,
  }
})

SettingsScreen.navigationOptions = {
  title: 'Stats',
};