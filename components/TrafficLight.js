import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { trafficLightMachine } from '../machines/trafficLightMachine';

const TrafficLight = () => {
  // Use simple React state instead of XState
  const [currentState, setCurrentState] = useState(trafficLightMachine.initial);
  const [autoAdvance, setAutoAdvance] = useState(true);
  
  // Function to move to next state
  const goToNextState = () => {
    if (currentState && trafficLightMachine.states[currentState]) {
      setCurrentState(trafficLightMachine.states[currentState].next);
    }
  };
  
  // Auto-advance timer
  useEffect(() => {
    let timer;
    if (autoAdvance) {
      const delay = currentState === 'green' ? 3000 : 
                   currentState === 'yellow' ? 1000 : 4000;
      
      timer = setTimeout(() => {
        goToNextState();
      }, delay);
    }
    
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [currentState, autoAdvance]);
  
  // Helper function to check current state safely
  const isCurrentState = (state) => {
    return currentState === state;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traffic Light</Text>
      <Text style={styles.description}>
        A simple state machine that cycles through traffic light states.
      </Text>
      
      <View style={styles.trafficLight}>
        <View 
          style={[
            styles.light, 
            styles.redLight,
            isCurrentState('red') && styles.activeLight
          ]} 
        />
        <View 
          style={[
            styles.light, 
            styles.yellowLight,
            isCurrentState('yellow') && styles.activeLight
          ]} 
        />
        <View 
          style={[
            styles.light, 
            styles.greenLight,
            isCurrentState('green') && styles.activeLight
          ]} 
        />
      </View>
      
      <Text style={styles.stateLabel}>
        Current state: <Text style={styles.stateValue}>{currentState || 'unknown'}</Text>
      </Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={goToNextState}
      >
        <Text style={styles.buttonText}>Next State</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.toggleButton, autoAdvance ? styles.toggleActive : styles.toggleInactive]}
        onPress={() => setAutoAdvance(!autoAdvance)}
      >
        <Text style={styles.toggleButtonText}>
          {autoAdvance ? 'Auto Advance: ON' : 'Auto Advance: OFF'}
        </Text>
      </TouchableOpacity>
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
  toggleButton: {
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#E3F2FD',
  },
  toggleInactive: {
    backgroundColor: '#F5F5F5',
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

export default TrafficLight;
