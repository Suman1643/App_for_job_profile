import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Admin Dashboard' }} />

      {/* Top Left - Back to Student Dashboard */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/')}
        >
          <Ionicons name="arrow-back" size={18} color="#fff" />
          <Text style={styles.backButtonText}>Student Panel</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Welcome, Admin</Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {/* View Insights */}
        <TouchableOpacity
          style={styles.insightsButton}
          onPress={() => router.push('/admin/insights')}
        >
          <MaterialIcons name="analytics" size={22} color="#fff" />
          <Text style={styles.buttonText}>View Student Insights</Text>
        </TouchableOpacity>

        {/* Post Internship/Job */}
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => alert('Navigate to Post Job/Internship')}
        >
          <Ionicons name="create-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Post Internship/Job</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', paddingHorizontal: 20, paddingTop: 20 },

  topBar: { alignItems: 'flex-start' },

  backButton: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
  },
  backButtonText: {
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

  insightsButton: {
    backgroundColor: '#6A1B9A',
    width: 260,
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 3,
  },

  postButton: {
    backgroundColor: '#0277BD',
    width: 260,
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
