// import React, { useState } from 'react';
// import api from '../../utils/api';
// import axios, { AxiosError } from 'axios';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Alert,
//   ImageBackground,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// export default function PostInternshipJob() {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [company, setCompany] = useState('');
//   const [type, setType] = useState('');
//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = async () => {
//     if (!title || !company || !type || !location || !description) {
//       Alert.alert('All fields are required');
//       return;
//     }

//     const jobData = {
//       title,
//       company,
//       type,
//       description,
//       roleType: location, // Remote or Offline
//     };

//     try {
//       const res = await api.post('/jobs/post', jobData);
//       Alert.alert('Success', 'Job posted successfully');

//       // Clear form
//       setTitle('');
//       setCompany('');
//       setType('');
//       setLocation('');
//       setDescription('');
//     } catch (err) {
//       const error = err as AxiosError<{ error: string }>;
//       console.error(error);

//       Alert.alert('Error', error.response?.data?.error || 'Failed to post job');
//     }

//   };

//   return (
//     <ImageBackground
//       source={{
//         uri: 'https://img.freepik.com/premium-photo/woman-s-table-with-coffee-office-supplies-pink-makeup-brushes-keyboard-notebook_114309-1837.jpg?w=1380',
//       }}
//       style={styles.bg}
//       resizeMode="cover"
//   >
//     <View style={styles.overlay}>
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         {/* Back Button */}
//         <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={20} color="#fff" />
//           <Text style={styles.backText}>Back</Text>
//         </TouchableOpacity>

//         {/* Header */}
//         <Text style={styles.header}>Post Internship/Job</Text>

//         {/* Form Inputs */}
//         <TextInput
//           style={styles.input}
//           placeholder="Job/Internship Title"
//           placeholderTextColor="#999"
//           value={title}
//           onChangeText={setTitle}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Company Name"
//           placeholderTextColor="#999"
//           value={company}
//           onChangeText={setCompany}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Type (Internship / Job)"
//           placeholderTextColor="#999"
//           value={type}
//           onChangeText={setType}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Location (Remote / Onsite)"
//           placeholderTextColor="#999"
//           value={location}
//           onChangeText={setLocation}
//         />
//         <TextInput
//           style={[styles.input, { height: 100 }]}
//           placeholder="Description"
//           placeholderTextColor="#999"
//           value={description}
//           onChangeText={setDescription}
//           multiline
//         />

//         {/* Submit Button */}
//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitText}>Post</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//     </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   bg: {
//         flex: 1,
//       },
//   overlay: {
//         flex: 1,
//         backgroundColor: 'rgb(0, 0, 0)',
//         paddingHorizontal: 20,
//         paddingTop: 20,
//       },
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(5, 4, 4, 0)',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   scroll: {
//     paddingBottom: 40,
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 20,
//     width: 100,
//   },
//   backText: {
//     color: '#fff',
//     marginLeft: 6,
//     fontWeight: '600',
//   },
//   header: {
//     fontSize: 24,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   input: {
//     backgroundColor: '#1f1f1f',
//     color: '#fff',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   submitButton: {
//     backgroundColor: '#6200ee',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   submitText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

import React, { useState } from "react";
import api from "../../utils/api";
import axios, { AxiosError } from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PostInternshipJob() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title || !company || !type || !location || !description) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }

    // Validate job type
    const validJobTypes = ["internship", "job", "part-time", "full-time"];
    if (!validJobTypes.includes(type.toLowerCase())) {
      Alert.alert(
        "Invalid Job Type",
        "Please use one of: Internship, Job, Part-time, Full-time"
      );
      return;
    }

    // Validate location
    const validLocations = ["remote", "onsite"];
    if (!validLocations.includes(location.toLowerCase())) {
      Alert.alert(
        "Invalid Location",
        "Please use one of: Remote, Onsite, Hybrid"
      );
      return;
    }

    // Prepare data according to the backend schema
    const jobData = {
      title,
      company,
      type: type.toLowerCase(),
      description,
      location: location.toLowerCase(),
      // Add any additional fields that might be required by your Job model
      createdAt: new Date(),
      status: "active",
    };

    setIsSubmitting(true);

    try {
      // Use the endpoint that matches your backend route
      const res = await api.post("/jobs/post", jobData);

      Alert.alert("Success", "Job posted successfully", [
        { text: "OK", onPress: () => router.back() },
      ]);

      // Clear form
      setTitle("");
      setCompany("");
      setType("");
      setLocation("");
      setDescription("");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.error(
        "Error posting job:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Error",
        error.response?.data?.error || "Failed to post job. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-photo/woman-s-table-with-coffee-office-supplies-pink-makeup-brushes-keyboard-notebook_114309-1837.jpg?w=1380",
      }}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            {/* Header */}
            <Text style={styles.header}>Post Internship/Job</Text>

            {/* Form Inputs */}
            <TextInput
              style={styles.input}
              placeholder="Job/Internship Title"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Company Name"
              placeholderTextColor="#999"
              value={company}
              onChangeText={setCompany}
            />

            <TextInput
              style={styles.input}
              placeholder="Type (Internship / Job / Part-time / Full-time)"
              placeholderTextColor="#999"
              value={type}
              onChangeText={setType}
            />

            <TextInput
              style={styles.input}
              placeholder="Location (Remote / Onsite / Hybrid)"
              placeholderTextColor="#999"
              value={location}
              onChangeText={setLocation}
            />

            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              placeholder="Description (include requirements, responsibilities, and benefits)"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                isSubmitting && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.submitText}>Post Job</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "#ffffff", // Semi-transparent black
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  container: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 20,
    width: 100,
    marginTop: 10,
  },
  backText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },
  header: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#4b3b78",
    opacity: 0.7,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
