import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMachine } from '@xstate/react';
import { trafficLightMachine } from '../machines/trafficLightMachine';

const TrafficLight = () => {
  const [state, send] = useMachine(trafficLightMachine);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traffic Light</Text>
      <Text style={styles.description}>
        A simple state machine that cycles through traffic light states automatically.
      </Text>
      
      <View style={styles.trafficLight}>
        <View 
          style={[
            styles.light, 
            styles.redLight,
            state.matches('red') && styles.activeLight
          ]} 
        />
        <View 
          style={[
            styles.light, 
            styles.yellowLight,
            state.matches('yellow') && styles.activeLight
          ]} 
        />
        <View 
          style={[
            styles.light, 
            styles.greenLight,
            state.matches('green') && styles.activeLight
          ]} 
        />
      </View>
      
      <Text style={styles.stateLabel}>
        Current state: <Text style={styles.stateValue}>{state.value}</Text>
      </Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => send('TIMER')}
      >
        <Text style={styles.buttonText}>Next State</Text>
      </TouchableOpacity>
      
      <Text style={styles.note}>
        Note: The traffic light automatically changes state every few seconds.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  trafficLight: {
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  light: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 8,
    opacity: 0.3,
  },
  redLight: {
    backgroundColor: '#FF0000',
  },
  yellowLight: {
    backgroundColor: '#FFFF00',
  },
  greenLight: {
    backgroundColor: '#00FF00',
  },
  activeLight: {
    opacity: 1,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  stateLabel: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  stateValue: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default TrafficLight;
