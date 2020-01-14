import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import Colors from '../constants/Colors';

export default function FormScreen({ view, focused, resetHandler }) {

  const { register, setValue, control, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    Alert.alert('Submit data ', data);
  };
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  if (view === 'before') {
    return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'flex-end' }}>
          <Button
            title="Back"
            style={{marginTop: 3}}
            color={focused ? Colors.tabIconDefault : Colors.tabIconSelected}
            onPress={resetHandler}
          />
        <Text style={styles.label}>Mood</Text>
        <Controller
          as={<TextInput style={styles.input} />}
          control={control}
          name="mood"
          onChange={onChange}
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.mood && <Text>This is required.</Text>}
        <Text style={styles.label}>Location</Text>
        <Controller as={<TextInput style={styles.input} />} control={control} name="location" defaultValue="" />
        <Text style={styles.label}>Time of Day</Text>
        <Controller as={<TextInput style={styles.input} />} control={control} name="time-of-day" defaultValue="" />
        <Text style={styles.label}>Journal Entry</Text>
        <Controller as={<TextInput style={styles.entry} />} control={control} multiline={true} name="journal-entry" defaultValue="" />
        
        <View>
          <Button
          style={styles.send}
          title="Send"
          color={focused ? Colors.tabIconDefault : Colors.tabIconSelected}
          onPress={handleSubmit(onSubmit)} />
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
          style={{marginTop: 3}}
          color={focused ? Colors.tabIconDefault : Colors.tabIconSelected}
          onPress={resetHandler}
        />
        <Text style={styles.label}>Mood</Text>
        <Controller
          as={<TextInput style={styles.input} />}
          control={control}
          name="mood"
          onChange={onChange}
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.mood && <Text>This is required.</Text>}
        <Text style={styles.label}>Location</Text>
        <Controller as={<TextInput style={styles.input} />} control={control} name="location" defaultValue="" />
        <Text style={styles.label}>Time of Day</Text>
        <Controller as={<TextInput style={styles.input} />} control={control} name="time-of-day" defaultValue="" />
        <Text style={styles.label}>Meditation Style</Text>
        <Controller as={<TextInput style={styles.input} />} control={control} name="meditation-style" defaultValue="" />
        <Text style={styles.label}>Minutes Spent Meditating</Text>
        <Controller as={<TextInput style={styles.input} />} control={control} name="minutes-spent" defaultValue="" />
        <Text style={styles.label}>Journal Entry</Text>
        <Controller as={<TextInput style={styles.entry} />} control={control} multiline={true} name="journal-entry" defaultValue="" />
        
        <View>
          <Button
          style={styles.send}
          title="Send"
          fontWeight="bold"
          color={focused ? Colors.tabIconDefault : Colors.tabIconSelected}
          onPress={handleSubmit(onSubmit)} />
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