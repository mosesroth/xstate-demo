import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

const ToggleSwitch = () => {
  // Use simple React state instead of XState
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  
  const handleToggle = () => {
    setIsActive(!isActive);
    setCount(count + 1);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toggle Switch</Text>
      <Text style={styles.description}>
        A simple toggle that tracks state and counts transitions.
      </Text>
      
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>
          Current state: <Text style={styles.stateValue}>{isActive ? 'active' : 'inactive'}</Text>
        </Text>
        
        <Switch
          value={isActive}
          onValueChange={handleToggle}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isActive ? '#2196F3' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.countContainer}>
        <Text style={styles.countLabel}>
          Toggle count: <Text style={styles.countValue}>{count}</Text>
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>
          {isActive ? 'Turn Off' : 'Turn On'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.stateDisplay}>
        <Text style={styles.stateDisplayTitle}>State:</Text>
        <Text style={styles.stateDisplayCode}>
          {JSON.stringify({
            value: isActive ? 'active' : 'inactive',
            context: { count }
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
