import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Switch,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useMachine } from '@xstate/react';
import { wizardMachine } from '../machines/wizardMachine';

const WizardForm = () => {
  // Define the wizard submission service
  const wizardServices = {
    submitWizard: (context) => {
      // Simulate form submission
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 90% success rate
          if (Math.random() > 0.1) {
            resolve({ success: true, userData: context.userData });
          } else {
            reject(new Error('Network error occurred'));
          }
        }, 2000);
      });
    }
  };
  
  const [state, send] = useMachine(wizardMachine, { services: wizardServices });
  
  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 1: Personal Information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[
            styles.input,
            state.context.errors.name && styles.inputError
          ]}
          value={state.context.userData.name}
          onChangeText={(value) => send({ type: 'UPDATE_NAME', value })}
          placeholder="Enter your name"
        />
        {state.context.errors.name && (
          <Text style={styles.errorText}>{state.context.errors.name}</Text>
        )}
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[
            styles.input,
            state.context.errors.email && styles.inputError
          ]}
          value={state.context.userData.email}
          onChangeText={(value) => send({ type: 'UPDATE_EMAIL', value })}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {state.context.errors.email && (
          <Text style={styles.errorText}>{state.context.errors.email}</Text>
        )}
      </View>
      
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => send('NEXT')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 2: Preferences</Text>
      
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Notifications</Text>
        <Switch
          value={state.context.userData.preferences.notifications}
          onValueChange={() => send('TOGGLE_NOTIFICATIONS')}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={state.context.userData.preferences.notifications ? '#2196F3' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.themeContainer}>
        <Text style={styles.label}>Theme Preference</Text>
        
        <View style={styles.themeOptions}>
          <TouchableOpacity
            style={[
              styles.themeOption,
              state.context.userData.preferences.theme === 'light' && styles.selectedTheme
            ]}
            onPress={() => send({ type: 'SET_THEME', value: 'light' })}
          >
            <View style={[styles.themeColor, styles.lightTheme]} />
            <Text style={styles.themeText}>Light</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.themeOption,
              state.context.userData.preferences.theme === 'dark' && styles.selectedTheme
            ]}
            onPress={() => send({ type: 'SET_THEME', value: 'dark' })}
          >
            <View style={[styles.themeColor, styles.darkTheme]} />
            <Text style={styles.themeText}>Dark</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.themeOption,
              state.context.userData.preferences.theme === 'system' && styles.selectedTheme
            ]}
            onPress={() => send({ type: 'SET_THEME', value: 'system' })}
          >
            <View style={[styles.themeColor, styles.systemTheme]} />
            <Text style={styles.themeText}>System</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => send('PREV')}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => send('NEXT')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 3: Review</Text>
      
      <View style={styles.reviewContainer}>
        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Personal Information</Text>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Name:</Text>
            <Text style={styles.reviewValue}>{state.context.userData.name}</Text>
          </View>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Email:</Text>
            <Text style={styles.reviewValue}>{state.context.userData.email}</Text>
          </View>
        </View>
        
        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Preferences</Text>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Notifications:</Text>
            <Text style={styles.reviewValue}>
              {state.context.userData.preferences.notifications ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Theme:</Text>
            <Text style={styles.reviewValue}>
              {state.context.userData.preferences.theme.charAt(0).toUpperCase() + 
               state.context.userData.preferences.theme.slice(1)}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => send('PREV')}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => send('SUBMIT')}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderSubmitting = () => (
    <View style={styles.submittingContainer}>
      <ActivityIndicator size="large" color="#2196F3" />
      <Text style={styles.submittingText}>Submitting your information...</Text>
    </View>
  );
  
  const renderSuccess = () => (
    <View style={styles.successContainer}>
      <Text style={styles.successTitle}>Success!</Text>
      <Text style={styles.successMessage}>
        Thank you for completing the wizard, {state.context.userData.name}!
      </Text>
      <Text style={styles.successDetails}>
        Your preferences have been saved.
      </Text>
      
      <TouchableOpacity 
        style={styles.resetButton}
        onPress={() => send('RESET')}
      >
        <Text style={styles.resetButtonText}>Start Over</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderFailure = () => (
    <View style={styles.failureContainer}>
      <Text style={styles.failureTitle}>Submission Failed</Text>
      <Text style={styles.failureMessage}>
        There was a problem submitting your information.
      </Text>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => send('RETRY')}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => send('RESET')}
        >
          <Text style={styles.resetButtonText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderCurrentStep = () => {
    if (state.matches('step1')) return renderStep1();
    if (state.matches('step2')) return renderStep2();
    if (state.matches('step3')) return renderStep3();
    if (state.matches('submitting')) return renderSubmitting();
    if (state.matches('success')) return renderSuccess();
    if (state.matches('failure')) return renderFailure();
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multi-step Wizard</Text>
      <Text style={styles.description}>
        A complex state machine for multi-step forms with validation and state management.
      </Text>
      
      {!state.matches('submitting') && 
       !state.matches('success') && 
       !state.matches('failure') && (
        <View style={styles.progressContainer}>
          <View style={[
            styles.progressStep,
            (state.matches('step1') || state.matches('step2') || state.matches('step3')) && styles.activeStep
          ]}>
            <Text style={styles.progressStepText}>1</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={[
            styles.progressStep,
            (state.matches('step2') || state.matches('step3')) && styles.activeStep
          ]}>
            <Text style={styles.progressStepText}>2</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={[
            styles.progressStep,
            state.matches('step3') && styles.activeStep
          ]}>
            <Text style={styles.progressStepText}>3</Text>
          </View>
        </View>
      )}
      
      <ScrollView style={styles.contentContainer}>
        {renderCurrentStep()}
      </ScrollView>
      
      <Text style={styles.note}>
        Note: The submission has a 10% chance of failing to demonstrate error handling.
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: '#2196F3',
  },
  progressStepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  contentContainer: {
    maxHeight: 400,
  },
  stepContainer: {
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2196F3',
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  themeContainer: {
    marginBottom: 16,
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  selectedTheme: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  themeColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  lightTheme: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  darkTheme: {
    backgroundColor: '#333',
  },
  systemTheme: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: 12,
    marginRight: 12,
  },
  themeText: {
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  nextButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
  },
  reviewSection: {
    marginBottom: 16,
  },
  reviewSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  reviewLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 100,
    color: '#666',
  },
  reviewValue: {
    fontSize: 14,
    flex: 1,
  },
  submittingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  submittingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#2196F3',
  },
  successContainer: {
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  successDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  failureContainer: {
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 24,
  },
  failureTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 16,
  },
  failureMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  retryButtonText: {
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
});

export default WizardForm;
