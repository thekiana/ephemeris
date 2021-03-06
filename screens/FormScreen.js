import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import Colors from '../constants/Colors';
import { withOrientation } from 'react-navigation';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

export default function FormScreen({ view, focused, resetHandler }) {
  
  const [[name], setName] = useState('');
  const [[label], setLabel] = useState('');

  const { register, setValue, control, handleSubmit, errors } = useForm();
  
  const onChange = args => {
    console.log('args ', args[0].nativeEvent.text);
    return {
      value: args[0].nativeEvent.text,
    };
  };

  const onSubmitBefore = (event) => {
    var url = 'http://127.0.0.1:3000/statsBefore';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(event),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .catch(error => console.log(`Error on submit: ${error}`))
    .then(response => console.log(`Success on submit: ${response}`));
  }

  const onSubmitAfter = (event) => {
    var url = 'http://127.0.0.1:3000/statsAfter';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(event),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .catch(error => console.log(`Error on submit: ${error}`))
    .then(response => console.log(`Success on submit: ${response}`));
  }

  if (view === 'before') {
    return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'flex-end' }}>
          <Button
            title="Back"
            style={{ marginTop: 3 }}
            color={focused ? Colors.tabIconDefault : Colors.tabIconSelected}
            onPress={resetHandler}
          />
          <Text style={styles.label}>Mood</Text>
          <Controller
            as={<TextInput style={styles.input} />}
            control={control}
            name="moodBefore"
            onChange={onChange}
            // rules={{ required: true }}
            defaultValue=""
          />
          {errors.mood && <Text>This is required.</Text>}
          <Text style={styles.label}>Location</Text>
          <Controller as={<TextInput style={styles.input} />} control={control} name="location" onChange={onChange} defaultValue="" />
          <Text style={styles.label}>Time of Day</Text>
          <Controller as={<TextInput style={styles.input} />} control={control} name="timeOfDay" onChange={onChange} defaultValue="" />
          <Text style={styles.label}>Journal Entry</Text>
          <Controller as={<TextInput style={styles.entry} />} control={control} multiline={true} name="journalEntry" onChange={onChange} defaultValue="" />

          <View>
            <Button
              style={styles.send}
              title="Send"
              color={focused ? Colors.tabIconDefault : Colors.tabIconSelected}
              onPress={handleSubmit(onSubmitBefore)} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  } else if (view === 'after') {
    return (
      <KeyboardAvoidingView behavior="position" KeyboardAvoidingView={100}>
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'flex-end' }}>
          <Button
            title="Back"
            style={{ marginTop: 3 }}
            color={focused ? Colors.tabIconDefault : Colors.tabIconSelected}
            onPress={resetHandler}
          />
          <Text style={styles.label}>Mood</Text>
          <Controller
            as={<TextInput style={styles.input} />}
            control={control}
            name="moodAfter"
            onChange={onChange}
            // rules={{ required: true }}
            defaultValue=""
          />
          {errors.mood && <Text>This is required.</Text>}
          <Text style={styles.label}>Location</Text>
          <Controller as={<TextInput style={styles.input} />} control={control} name="location" onChange={onChange} defaultValue="" />
          <Text style={styles.label}>Time of Day</Text>
          <Controller as={<TextInput style={styles.input} />} control={control} name="timeOfDay" onChange={onChange} defaultValue="" />
          <Text style={styles.label}>Meditation Style</Text>
          <Controller as={<TextInput style={styles.input} />} control={control} name="meditationStyle" onChange={onChange} defaultValue="" />
          <Text style={styles.label}>Minutes Spent Meditating</Text>
          <Controller as={<TextInput style={styles.input} />} control={control} name="minutesSpent" onChange={onChange} defaultValue="" />
          <Text style={styles.label}>Journal Entry</Text>
          <Controller as={<TextInput style={styles.entry} />} control={control} multiline={true} name="journalEntry" onChange={onChange} defaultValue="" />

          <View>
            <Button
              style={styles.send}
              title="Send"
              fontWeight="bold"
              color={focused ? Colors.tabIconDefault : Colors.tabIconSelected}
              onPress={handleSubmit(onSubmitAfter)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  send: {
    padding: 200,
  },
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#0e101c',
    zIndex: 0,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  entry: {
    backgroundColor: 'white',
    position: 'relative',
    padding: 10,
    borderRadius: 4,
  },
})