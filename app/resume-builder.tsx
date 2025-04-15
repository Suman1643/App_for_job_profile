import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Stack } from 'expo-router';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStudentProfile } from '../utils/getStudentProfile';
import getUserId from '../utils/getUserId'; // adjust path based on location



export default function ResumeBuilder() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [certifications, setCertifications] = useState('');
  const getUserId = async () => {
    let userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      userId = uuidv4(); // generate new UUID
      await AsyncStorage.setItem('userId', userId);
    }
    return userId;
  };

  const saveResume = async (resumeFile: any) => {
    const profile = await getStudentProfile();
  
    if (!profile) {
      Alert.alert('Error', 'Student profile not found. Please complete your profile first.');
      return;
    }
  
    const resumeData = {
      userId: profile.userId,
      studentName: profile.studentName,
      email: profile.email,
      resume: resumeFile,
    };
  
    try {
      await axios.post('https://192.168.107.50:5000/api/resume/save', resumeData);
      Alert.alert('Success', 'Resume uploaded successfully!');
    } catch (error) {
      console.error('Resume upload failed:', error);
      Alert.alert('Error', 'Resume upload failed. Please try again.');
    }
  };

  

  return (
    <ImageBackground
          source={{ uri: 'https://i.pinimg.com/736x/15/66/c8/1566c88ea7315fba44869c1f51c07afe.jpg' }}
          style={styles.background}
          resizeMode="cover"
        >
    <View style={styles.overlay}>

    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: 'Resume Builder' }} />
      <Text style={styles.header}>📝 Build Your Resume</Text>

      {/* Basic Info */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your full name" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="your@email.com" keyboardType="email-address" />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="1234567890" keyboardType="phone-pad" />

      {/* Summary */}
      <Text style={styles.label}>Profile Summary</Text>
      <TextInput style={[styles.input, styles.textArea]} value={summary} onChangeText={setSummary} placeholder="Brief about yourself" multiline numberOfLines={4} />

      {/* Education */}
      <Text style={styles.label}>Education</Text>
      <TextInput style={styles.input} value={education} onChangeText={setEducation} placeholder="Your college, degree, year" />

      {/* Experience */}
      <Text style={styles.label}>Experience</Text>
      <TextInput style={[styles.input, styles.textArea]} value={experience} onChangeText={setExperience} placeholder="Work experience, internships..." multiline numberOfLines={4} />

      {/* Projects */}
      <Text style={styles.label}>Projects</Text>
      <TextInput style={[styles.input, styles.textArea]} value={projects} onChangeText={setProjects} placeholder="Mention key projects with tech used" multiline numberOfLines={4} />

      {/* Skills */}
      <Text style={styles.label}>Skills</Text>
      <TextInput style={styles.input} value={skills} onChangeText={setSkills} placeholder="E.g. React, Node.js, MongoDB" />

      {/* Certifications */}
      <Text style={styles.label}>Certifications</Text>
      <TextInput style={styles.input} value={certifications} onChangeText={setCertifications} placeholder="List certifications (optional)" />

      {/* Submit Button */}
      <View style={{ marginTop: 20 }}>
        <Button title="Save Resume" onPress={saveResume} color="#28a745" />
      </View>
    </ScrollView>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    paddingTop: 50,
  },
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007AFF',
  },
  label: {
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15,
    fontSize: 16,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#F9F9F9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
