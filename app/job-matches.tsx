import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, FontAwesome } from '@expo/vector-icons';

const STORAGE_KEY = '@student_profile';
const SAVED_JOBS_KEY = '@saved_jobs';
const APPLIED_JOBS_KEY = '@applied_jobs';
const JOB_API_URL = 'https://your-api.com/jobs'; // Replace with actual API

type Job = {
  id: string;
  title: string;
  company: string;
  skills: string[];
  jobType: string;
};

export default function JobMatches() {
  const [matchedJobs, setMatchedJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const profileStr = await AsyncStorage.getItem(STORAGE_KEY);
        const saved = await AsyncStorage.getItem(SAVED_JOBS_KEY);
        const applied = await AsyncStorage.getItem(APPLIED_JOBS_KEY);

        if (saved) setSavedJobs(JSON.parse(saved));
        if (applied) setAppliedJobs(JSON.parse(applied));

        const response = await fetch('http://192.168.107.50:3001/jobs');
        const allJobs: Job[] = await response.json();

        if (profileStr) {
          const profile = JSON.parse(profileStr);
          const userSkills = profile.skills?.split(',').map((s: string) => s.trim().toLowerCase()) || [];

          const filtered = allJobs.filter(job =>
            job.skills.some(skill => userSkills.includes(skill.toLowerCase()))
          );

          setMatchedJobs(filtered);
        } else {
          setMatchedJobs(allJobs);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load job matches');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleSave = async (jobId: string) => {
    const updated = savedJobs.includes(jobId)
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId];

    setSavedJobs(updated);
    await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
  };

  const handleApply = async (jobId: string) => {
    if (appliedJobs.includes(jobId)) {
      Alert.alert('Already Applied', 'You have already applied for this job.');
      return;
    }

    const updated = [...appliedJobs, jobId];
    setAppliedJobs(updated);
    await AsyncStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(updated));
    Alert.alert('Success', 'Applied for the job!');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Job Matches' }} />
      <Text style={styles.title}>Your Job Matches</Text>

      <FlatList
        data={matchedJobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Feather name="briefcase" size={24} color="#333" />
              <Text style={styles.jobTitle}>{item.title}</Text>
            </View>
            <Text>Company: {item.company}</Text>
            <Text>Skills: {item.skills.join(', ')}</Text>
            <Text>Type: {item.jobType}</Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleApply(item.id)} style={styles.button}>
                <FontAwesome name="send" size={16} color="white" style={{ marginRight: 6 }} />
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSave(item.id)}
                style={[
                  styles.button,
                  { backgroundColor: savedJobs.includes(item.id) ? '#f39c12' : '#95a5a6' },
                ]}
              >
                <FontAwesome name="bookmark" size={16} color="white" style={{ marginRight: 6 }} />
                <Text style={styles.buttonText}>
                  {savedJobs.includes(item.id) ? 'Saved' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  jobTitle: { fontSize: 18, fontWeight: '600' },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
