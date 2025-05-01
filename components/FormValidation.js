import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useMachine } from '@xstate/react';
import { formMachine } from '../machines/formMachine';

const FormValidation = () => {
  // Define the form submission service
  const formServices = {
    submitForm: (context) => {
      // Simulate form submission
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate email validation on server
          if (context.email === 'test@example.com') {
            reject(new Error('Email already in use'));
          } else {
            resolve({ success: true });
          }
        }, 1500);
      });
    }
  };
  
  const [state, send] = useMachine(formMachine, { services: formServices });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Validation</Text>
      <Text style={styles.description}>
        A state machine for handling form validation and submission.
      </Text>
      
      {state.matches('success') ? (
        <View style={styles.successContainer}>
          <Text style={styles.successTitle}>Form Submitted!</Text>
          <Text style={styles.successMessage}>
            Thank you for your submission, {state.context.name}.
          </Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => send('RESET')}
          >
            <Text style={styles.resetButtonText}>Submit Another</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[
                styles.input,
                state.context.nameError && styles.inputError
              ]}
              value={state.context.name}
              onChangeText={(value) => send({ type: 'CHANGE_NAME', value })}
              placeholder="Enter your name"
              editable={!state.matches('submitting')}
            />
            {state.context.nameError && (
              <Text style={styles.errorText}>{state.context.nameError}</Text>
            )}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                state.context.emailError && styles.inputError
              ]}
              value={state.context.email}
              onChangeText={(value) => send({ type: 'CHANGE_EMAIL', value })}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!state.matches('submitting')}
            />
            {state.context.emailError && (
              <Text style={styles.errorText}>{state.context.emailError}</Text>
            )}
          </View>
          
          {state.context.submitCount > 0 && (
            <Text style={styles.attemptText}>
              Submit attempts: {state.context.submitCount}
            </Text>
          )}
          
          <TouchableOpacity 
            style={[
              styles.submitButton,
              state.matches('submitting') && styles.submittingButton
            ]}
            onPress={() => send('SUBMIT')}
            disabled={state.matches('submitting')}
          >
            {state.matches('submitting') ? (
              <View style={styles.submittingContainer}>
                <ActivityIndicator size="small" color="white" />
                <Text style={styles.submittingText}>Submitting...</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
          
          <Text style={styles.note}>
            Try using "test@example.com" to see server validation error.
          </Text>
        </View>
      )}
      
      <View style={styles.stateDisplay}>
        <Text style={styles.stateDisplayTitle}>Machine State:</Text>
        <Text style={styles.stateDisplayCode}>
          {JSON.stringify({
            value: state.value,
            context: {
              name: state.context.name,
              email: state.context.email,
              nameError: state.context.nameError,
              emailError: state.context.emailError,
              submitCount: state.context.submitCount
            }
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
  formContainer: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#F44336',
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 4,
  },
  attemptText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submittingButton: {
    backgroundColor: '#81C784',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submittingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submittingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  successContainer: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
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

export default FormValidation;
