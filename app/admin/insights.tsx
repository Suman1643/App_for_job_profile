import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ImageBackground
} from 'react-native';
import { Stack } from 'expo-router';

interface Resume {
  id: string;
  name: string;
  skills: string[];
  summary: string;
}

const mockResumes: Resume[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    skills: ['React Native', 'Node.js', 'MongoDB'],
    summary: 'Full Stack Developer with MERN expertise.',
  },
  {
    id: '2',
    name: 'Sneha Reddy',
    skills: ['Python', 'Data Science', 'TensorFlow'],
    summary: 'AI enthusiast with passion for ML models.',
  },
  {
    id: '3',
    name: 'Ravi Patel',
    skills: ['Java', 'Spring Boot', 'AWS'],
    summary: 'Backend-focused developer with cloud experience.',
  },
];

export default function StudentInsights() {
  const [bestResumes, setBestResumes] = useState<string[]>([]);

  const handleToggleBest = (id: string) => {
    if (bestResumes.includes(id)) {
      // Deselect if already selected
      setBestResumes((prev) => prev.filter((resId) => resId !== id));
      Alert.alert('Deselected', 'Resume has been removed from best list.');
    } else {
      // Select as best
      setBestResumes((prev) => [...prev, id]);
      Alert.alert('Marked as Best', 'This resume is marked as one of the best!');
    }
  };

  const handleViewFullResume = (student: Resume) => {
    Alert.alert(`${student.name}'s Resume`, `Summary: ${student.summary}\n\nSkills: ${student.skills.join(', ')}`);
  };

  const renderResume = ({ item }: { item: Resume }) => {
    const isSelected = bestResumes.includes(item.id);

    return (
      <ImageBackground
            source={{
              uri: 'https://img.freepik.com/premium-photo/woman-s-table-with-coffee-office-supplies-pink-makeup-brushes-keyboard-notebook_114309-1837.jpg?w=1380',
            }}
            style={styles.bg}
            resizeMode="cover"
        >
          <View style={styles.overlay}>
      <View style={styles.resumeCard}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
        <Text style={styles.skills}>Skills: {item.skills.join(', ')}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => handleViewFullResume(item)}
          >
            <Text style={styles.buttonText}>View Resume</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectButton,
              isSelected && { backgroundColor: '#2E7D32' },
            ]}
            onPress={() => handleToggleBest(item.id)}
          >
            <Text style={styles.buttonText}>
              {isSelected ? '✓ Selected (Tap to Undo)' : 'Select as Best'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      </ImageBackground>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Student Insights' }} />
      <Text style={styles.title}>All Submitted Resumes</Text>

      <FlatList
        data={mockResumes}
        keyExtractor={(item) => item.id}
        renderItem={renderResume}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  container: { flex: 1, backgroundColor: '#f2f2f2', paddingHorizontal: 16 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  resumeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#222',
  },
  summary: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  skills: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#777',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#0288D1',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButton: {
    flex: 1,
    backgroundColor: '#8E24AA',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
});
