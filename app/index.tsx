import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Student Dashboard' }} />

      {/* Top Right - Admin Login */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => router.push('/admin-login')}
        >
          <Ionicons name="person-circle-outline" size={18} color="#fff" />
          <Text style={styles.adminButtonText}>Admin</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Welcome to Talent Bridge</Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {/* Build Resume */}
        <TouchableOpacity
          style={styles.resumeButton}
          onPress={() => router.push('/resume-builder')}
        >
          <MaterialIcons name="build" size={22} color="#fff" />
          <Text style={styles.buttonText}>Build Resume</Text>
        </TouchableOpacity>

        {/* View Job Matches */}
        <TouchableOpacity
          style={styles.jobButton}
          onPress={() => router.push('/job-matches')}
        >
          <Ionicons name="briefcase-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>View Job Matches</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', paddingHorizontal: 20, paddingTop: 20 },

  topBar: { alignItems: 'flex-end' },

  adminButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
  },
  adminButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '600',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 30,
    alignItems: 'center',
  },

  resumeButton: {
    backgroundColor: '#4CAF50',
    width: 220,
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 3,
  },

  jobButton: {
    backgroundColor: '#FF7043',
    width: 220,
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 3,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
