import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useMachine } from '@xstate/react';
import { fetchMachine } from '../machines/fetchMachine';

const FetchExample = () => {
  // Mock data for the fetch service
  const mockPosts = [
    { id: 1, title: 'XState Introduction', body: 'XState is a library for creating state machines...' },
    { id: 2, title: 'State Machines in React', body: 'Using state machines in React applications...' },
    { id: 3, title: 'Advanced XState Patterns', body: 'Learn advanced patterns with XState...' },
  ];
  
  // Define the fetch service
  const fetchServices = {
    fetchData: () => {
      // Simulate API call with random success/failure
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const shouldSucceed = Math.random() > 0.3; // 70% success rate
          if (shouldSucceed) {
            resolve(mockPosts);
          } else {
            reject(new Error('Failed to fetch data'));
          }
        }, 1500);
      });
    }
  };
  
  const [state, send] = useMachine(fetchMachine, { services: fetchServices });
  
  const renderContent = () => {
    if (state.matches('idle')) {
      return (
        <Text style={styles.idleText}>
          Press the "Fetch Data" button to load posts.
        </Text>
      );
    }
    
    if (state.matches('loading')) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading posts...</Text>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => send('CANCEL')}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    if (state.matches('failure')) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error</Text>
          <Text style={styles.errorMessage}>{state.context.error?.message || 'Unknown error'}</Text>
        </View>
      );
    }
    
    if (state.matches('success')) {
      return (
        <ScrollView style={styles.postsContainer}>
          {state.context.data.map(post => (
            <View key={post.id} style={styles.postItem}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postBody}>{post.body}</Text>
            </View>
          ))}
        </ScrollView>
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fetch Example</Text>
      <Text style={styles.description}>
        A state machine for handling API requests with loading, success, and error states.
      </Text>
      
      <View style={styles.stateIndicator}>
        <Text style={styles.stateLabel}>Current state:</Text>
        <View style={[
          styles.stateBadge,
          state.matches('idle') && styles.idleBadge,
          state.matches('loading') && styles.loadingBadge,
          state.matches('success') && styles.successBadge,
          state.matches('failure') && styles.failureBadge,
        ]}>
          <Text style={styles.stateBadgeText}>{state.value}</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
      
      <View style={styles.buttonContainer}>
        {!state.matches('loading') && (
          <TouchableOpacity 
            style={styles.fetchButton}
            onPress={() => send('FETCH')}
          >
            <Text style={styles.fetchButtonText}>Fetch Data</Text>
          </TouchableOpacity>
        )}
        
        {(state.matches('success') || state.matches('failure')) && (
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => send('RESET')}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.note}>
        Note: The fetch has a 30% chance of failing to demonstrate error handling.
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
  stateIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stateLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  stateBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  idleBadge: {
    backgroundColor: '#e0e0e0',
  },
  loadingBadge: {
    backgroundColor: '#90CAF9',
  },
  successBadge: {
    backgroundColor: '#A5D6A7',
  },
  failureBadge: {
    backgroundColor: '#EF9A9A',
  },
  stateBadgeText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    minHeight: 150,
    marginBottom: 16,
  },
  idleText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#2196F3',
  },
  cancelButton: {
    marginTop: 16,
    padding: 8,
  },
  cancelButtonText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 8,
  },
  errorMessage: {
    color: '#666',
  },
  postsContainer: {
    maxHeight: 150,
  },
  postItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postBody: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fetchButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginRight: state.matches('success') || state.matches('failure') ? 8 : 0,
  },
  fetchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resetButtonText: {
    color: '#666',
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

export default FetchExample;
