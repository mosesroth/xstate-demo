import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useMachine } from '@xstate/react';
import { toggleMachine } from '../machines/toggleMachine';

const ToggleSwitch = () => {
  const [state, send] = useMachine(toggleMachine);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toggle Switch</Text>
      <Text style={styles.description}>
        A simple toggle machine that tracks state and counts transitions.
      </Text>
      
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>
          Current state: <Text style={styles.stateValue}>{state.value}</Text>
        </Text>
        
        <Switch
          value={state.matches('active')}
          onValueChange={() => send('TOGGLE')}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={state.matches('active') ? '#2196F3' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.countContainer}>
        <Text style={styles.countLabel}>
          Toggle count: <Text style={styles.countValue}>{state.context.count}</Text>
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => send('TOGGLE')}
      >
        <Text style={styles.buttonText}>
          {state.matches('active') ? 'Turn Off' : 'Turn On'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.stateDisplay}>
        <Text style={styles.stateDisplayTitle}>Machine State:</Text>
        <Text style={styles.stateDisplayCode}>
          {JSON.stringify({
            value: state.value,
            context: state.context
          }, null, 2)}
        </Text>
      </View>
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  toggleLabel: {
    fontSize: 16,
  },
  stateValue: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  countContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  countLabel: {
    fontSize: 16,
  },
  countValue: {
    fontWeight: 'bold',
    color: '#4CAF50',
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
  stateDisplay: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  stateDisplayTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  stateDisplayCode: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
  },
});

export default ToggleSwitch;
