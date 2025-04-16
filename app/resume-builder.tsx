// import React, { useState } from 'react';
// import { ScrollView, View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
// import { Stack } from 'expo-router';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getStudentProfile } from '../utils/getStudentProfile';

// export default function ResumeBuilder() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [summary, setSummary] = useState('');
//   const [education, setEducation] = useState('');
//   const [experience, setExperience] = useState('');
//   const [skills, setSkills] = useState('');
//   const [projects, setProjects] = useState('');
//   const [certifications, setCertifications] = useState('');
//   const getUserId = async () => {
//     let userId = await AsyncStorage.getItem('userId');
//     if (!userId) {
//       userId = uuidv4(); // generate new UUID
//       await AsyncStorage.setItem('userId', userId);
//     }
//     return userId;
//   };

//   const saveResume = async (resumeFile: any) => {
//     const profile = await getStudentProfile();

//     if (!profile) {
//       Alert.alert('Error', 'Student profile not found. Please complete your profile first.');
//       return;
//     }

//     const resumeData = {
//       userId: profile.userId,
//       studentName: profile.studentName,
//       email: profile.email,
//       resume: resumeFile,
//     };

//     try {
//       await axios.post('https://192.168.107.50:5000/api/resume/save', resumeData);
//       Alert.alert('Success', 'Resume uploaded successfully!');
//     } catch (error) {
//       console.error('Resume upload failed:', error);
//       Alert.alert('Error', 'Resume upload failed. Please try again.');
//     }
//   };

//   return (
//     <ImageBackground
//           source={{ uri: 'https://i.pinimg.com/736x/15/66/c8/1566c88ea7315fba44869c1f51c07afe.jpg' }}
//           style={styles.background}
//           resizeMode="cover"
//         >
//     <View style={styles.overlay}>

//     <ScrollView contentContainerStyle={styles.container}>
//       <Stack.Screen options={{ title: 'Resume Builder' }} />
//       <Text style={styles.header}>📝 Build Your Resume</Text>

//       {/* Basic Info */}
//       <Text style={styles.label}>Full Name</Text>
//       <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your full name" />

//       <Text style={styles.label}>Email</Text>
//       <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="your@email.com" keyboardType="email-address" />

//       <Text style={styles.label}>Phone Number</Text>
//       <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="1234567890" keyboardType="phone-pad" />

//       {/* Summary */}
//       <Text style={styles.label}>Profile Summary</Text>
//       <TextInput style={[styles.input, styles.textArea]} value={summary} onChangeText={setSummary} placeholder="Brief about yourself" multiline numberOfLines={4} />

//       {/* Education */}
//       <Text style={styles.label}>Education</Text>
//       <TextInput style={styles.input} value={education} onChangeText={setEducation} placeholder="Your college, degree, year" />

//       {/* Experience */}
//       <Text style={styles.label}>Experience</Text>
//       <TextInput style={[styles.input, styles.textArea]} value={experience} onChangeText={setExperience} placeholder="Work experience, internships..." multiline numberOfLines={4} />

//       {/* Projects */}
//       <Text style={styles.label}>Projects</Text>
//       <TextInput style={[styles.input, styles.textArea]} value={projects} onChangeText={setProjects} placeholder="Mention key projects with tech used" multiline numberOfLines={4} />

//       {/* Skills */}
//       <Text style={styles.label}>Skills</Text>
//       <TextInput style={styles.input} value={skills} onChangeText={setSkills} placeholder="E.g. React, Node.js, MongoDB" />

//       {/* Certifications */}
//       <Text style={styles.label}>Certifications</Text>
//       <TextInput style={styles.input} value={certifications} onChangeText={setCertifications} placeholder="List certifications (optional)" />

//       {/* Submit Button */}
//       <View style={{ marginTop: 20 }}>
//         <Button title="Save Resume" onPress={saveResume} color="#28a745" />
//       </View>
//     </ScrollView>
//     </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 20,
//     paddingTop: 50,
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 50,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   header: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#007AFF',
//   },
//   label: {
//     fontWeight: '600',
//     marginBottom: 5,
//     marginTop: 15,
//     fontSize: 16,
//     color: 'gray',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 12,
//     backgroundColor: '#F9F9F9',
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
// });

import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Stack, router } from "expo-router";
import api from "../utils/api"; // Using the axios instance
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResumeBuilder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [certifications, setCertifications] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Get userId or create a new one if it doesn't exist
  const getUserId = async () => {
    let userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4(); // generate new UUID
      await AsyncStorage.setItem("userId", userId);
    }
    return userId;
  };

  // Load resume data when component mounts
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const userId = await getUserId();

        // Try to fetch from API first
        try {
          const response = await api.get(`/resume/${userId}`);
          const resumeData = response.data;

          // Populate form fields with fetched data
          setName(resumeData.name || "");
          setEmail(resumeData.email || "");
          setPhone(resumeData.phone || "");
          setSummary(resumeData.summary || "");
          setEducation(resumeData.education || "");
          setExperience(resumeData.experience || "");
          setSkills(resumeData.skills || "");
          setProjects(resumeData.projects || "");
          setCertifications(resumeData.certifications || "");
        } catch (apiError) {
          // If API fetch fails, try loading from local storage as fallback
          console.log("Could not fetch from API, trying local storage");
          const localData = await AsyncStorage.getItem("@resume_data");

          if (localData) {
            const data = JSON.parse(localData);
            setName(data.name || "");
            setEmail(data.email || "");
            setPhone(data.phone || "");
            setSummary(data.summary || "");
            setEducation(data.education || "");
            setExperience(data.experience || "");
            setSkills(data.skills || "");
            setProjects(data.projects || "");
            setCertifications(data.certifications || "");
          }
        }
      } catch (error) {
        console.error("Error loading resume data:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  const saveResume = async () => {
    if (!name || !email) {
      Alert.alert(
        "Missing Information",
        "Please provide at least your name and email."
      );
      return;
    }

    setLoading(true);

    try {
      const userId = await getUserId();

      // Create resume data object
      const resumeData = {
        userId,
        name,
        email,
        phone,
        summary,
        education,
        experience,
        skills,
        projects,
        certifications,
      };

      // Save to local storage as backup
      await AsyncStorage.setItem("@resume_data", JSON.stringify(resumeData));

      // Send to server
      const response = await api.post("/resume/save", resumeData);

      Alert.alert(
        "Success",
        response.data.message || "Resume saved successfully!",
        [
          {
            text: "OK",
            onPress: () => router.back(), // Navigate back after success
          },
        ]
      );
    } catch (error) {
      console.error("Resume save failed:", error);
      Alert.alert("Error", "Could not save resume. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#28a745" />
        <Text style={styles.loadingText}>Loading resume data...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/15/66/c8/1566c88ea7315fba44869c1f51c07afe.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <Stack.Screen options={{ title: "Resume Builder" }} />
          <Text style={styles.header}>📝 Build Your Resume</Text>

          {/* Basic Info */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your full name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            keyboardType="email-address"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="1234567890"
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />

          {/* Summary */}
          <Text style={styles.label}>Profile Summary</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={summary}
            onChangeText={setSummary}
            placeholder="Brief about yourself"
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />

          {/* Education */}
          <Text style={styles.label}>Education</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={education}
            onChangeText={setEducation}
            placeholder="Your college, degree, year"
            multiline
            placeholderTextColor="#999"
          />

          {/* Experience */}
          <Text style={styles.label}>Experience</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={experience}
            onChangeText={setExperience}
            placeholder="Work experience, internships..."
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />

          {/* Projects */}
          <Text style={styles.label}>Projects</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={projects}
            onChangeText={setProjects}
            placeholder="Mention key projects with tech used"
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />

          {/* Skills */}
          <Text style={styles.label}>Skills</Text>
          <TextInput
            style={styles.input}
            value={skills}
            onChangeText={setSkills}
            placeholder="E.g. React, Node.js, MongoDB"
            placeholderTextColor="#999"
          />

          {/* Certifications */}
          <Text style={styles.label}>Certifications</Text>
          <TextInput
            style={styles.input}
            value={certifications}
            onChangeText={setCertifications}
            placeholder="List certifications (optional)"
            placeholderTextColor="#999"
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveResume}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save Resume</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    paddingTop: 50,
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 15,
    fontSize: 16,
    color: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#F9F9F9",
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
