import React, { useState } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity,
  StatusBar 
} from 'react-native';

// Import components
import TrafficLight from './components/TrafficLight';
import ToggleSwitch from './components/ToggleSwitch';

export default function App() {
  const [activeTab, setActiveTab] = useState('traffic');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'traffic':
        return <TrafficLight />;
      case 'toggle':
        return <ToggleSwitch />;
      default:
        return <TrafficLight />;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>XState Demo</Text>
        <Text style={styles.headerSubtitle}>State Machines for React</Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'traffic' && styles.activeTab]} 
          onPress={() => setActiveTab('traffic')}
        >
          <Text style={[styles.tabText, activeTab === 'traffic' && styles.activeTabText]}>
            Traffic Light
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'toggle' && styles.activeTab]} 
          onPress={() => setActiveTab('toggle')}
        >
          <Text style={[styles.tabText, activeTab === 'toggle' && styles.activeTabText]}>
            Toggle
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {renderContent()}
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>What is XState?</Text>
          <Text style={styles.infoText}>
            XState is a library for creating, interpreting, and executing finite state machines and statecharts.
          </Text>
          
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Finite state machines for predictable state management</Text>
            <Text style={styles.featureItem}>• Visualizable state transitions and logic</Text>
            <Text style={styles.featureItem}>• Handles complex UI flows and business logic</Text>
            <Text style={styles.featureItem}>• Prevents impossible states and race conditions</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            XState - State Machines for JavaScript
          </Text>
          <Text style={styles.footerLink}>
            github.com/statelyai/xstate
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200EA',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6200EA',
  },
  tabText: {
    fontSize: 14,
    color: '#757575',
  },
  activeTabText: {
    color: '#6200EA',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  infoContainer: {
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
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  featureList: {
    marginLeft: 8,
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
  footer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#EDE7F6',
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerLink: {
    fontSize: 14,
    color: '#6200EA',
    fontWeight: 'bold',
  },
});
