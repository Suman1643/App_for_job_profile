// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import { Stack } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Feather, FontAwesome } from '@expo/vector-icons';

// const STORAGE_KEY = '@student_profile';
// const SAVED_JOBS_KEY = '@saved_jobs';
// const APPLIED_JOBS_KEY = '@applied_jobs';

// type Job = {
//   id: string;
//   title: string;
//   company: string;
//   skills: string[];
//   jobType: string;
// };

// export default function JobMatches() {
//   const [matchedJobs, setMatchedJobs] = useState<Job[]>([]);
//   const [savedJobs, setSavedJobs] = useState<string[]>([]);
//   const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const profileStr = await AsyncStorage.getItem(STORAGE_KEY);
//         const saved = await AsyncStorage.getItem(SAVED_JOBS_KEY);
//         const applied = await AsyncStorage.getItem(APPLIED_JOBS_KEY);

//         if (saved) setSavedJobs(JSON.parse(saved));
//         if (applied) setAppliedJobs(JSON.parse(applied));

//         const response = await fetch('https://app-for-job-profile-be.vercel.app/api/jobs/all');
//         const allJobs: Job[] = await response.json();

//         if (profileStr) {
//           const profile = JSON.parse(profileStr);
//           const userSkills = profile.skills?.split(',').map((s: string) => s.trim().toLowerCase()) || [];

//           const filtered = allJobs.filter(job =>
//             job.skills.some(skill => userSkills.includes(skill.toLowerCase()))
//           );

//           setMatchedJobs(filtered);
//         } else {
//           setMatchedJobs(allJobs);
//         }
//       } catch (error) {
//         Alert.alert('Error', 'Failed to load job matches');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, []);

//   const handleSave = async (jobId: string) => {
//     const updated = savedJobs.includes(jobId)
//       ? savedJobs.filter(id => id !== jobId)
//       : [...savedJobs, jobId];

//     setSavedJobs(updated);
//     await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
//   };

//   const handleApply = async (jobId: string) => {
//     if (appliedJobs.includes(jobId)) {
//       Alert.alert('Already Applied', 'You have already applied for this job.');
//       return;
//     }

//     const updated = [...appliedJobs, jobId];
//     setAppliedJobs(updated);
//     await AsyncStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(updated));
//     Alert.alert('Success', 'Applied for the job!');
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#2ecc71" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Stack.Screen options={{ title: 'Job Matches' }} />
//       <Text style={styles.title}>Your Job Matches</Text>

//       <FlatList
//         data={matchedJobs}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <View style={styles.header}>
//               <Feather name="briefcase" size={24} color="#333" />
//               <Text style={styles.jobTitle}>{item.title}</Text>
//             </View>
//             <Text>Company: {item.company}</Text>
//             <Text>Skills: {item.skills.join(', ')}</Text>
//             <Text>Type: {item.jobType}</Text>

//             <View style={styles.actions}>
//               <TouchableOpacity onPress={() => handleApply(item.id)} style={styles.button}>
//                 <FontAwesome name="send" size={16} color="white" style={{ marginRight: 6 }} />
//                 <Text style={styles.buttonText}>Apply</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => handleSave(item.id)}
//                 style={[
//                   styles.button,
//                   { backgroundColor: savedJobs.includes(item.id) ? '#f39c12' : '#95a5a6' },
//                 ]}
//               >
//                 <FontAwesome name="bookmark" size={16} color="white" style={{ marginRight: 6 }} />
//                 <Text style={styles.buttonText}>
//                   {savedJobs.includes(item.id) ? 'Saved' : 'Save'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   card: {
//     backgroundColor: '#f0f0f0',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     gap: 8,
//   },
//   jobTitle: { fontSize: 18, fontWeight: '600' },
//   actions: {
//     flexDirection: 'row',
//     marginTop: 10,
//     gap: 10,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2ecc71',
//     padding: 8,
//     borderRadius: 6,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, FontAwesome } from "@expo/vector-icons";
import api from "../utils/api"; // Import the axios instance

const STORAGE_KEY = "@student_profile";
const SAVED_JOBS_KEY = "@saved_jobs";
const APPLIED_JOBS_KEY = "@applied_jobs";

type Job = {
  id: string;
  title: string;
  company: string;
  type: string;
  description: string;
  roleType: string;
  createdAt: string;
};

export default function JobMatches() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Load saved and applied jobs from AsyncStorage
        const saved = await AsyncStorage.getItem(SAVED_JOBS_KEY);
        const applied = await AsyncStorage.getItem(APPLIED_JOBS_KEY);

        if (saved) setSavedJobs(JSON.parse(saved));
        if (applied) setAppliedJobs(JSON.parse(applied));

        // Get profile data if available
        const profileStr = await AsyncStorage.getItem(STORAGE_KEY);
        let profile = null;
        if (profileStr) {
          profile = JSON.parse(profileStr);
        }

        // Fetch all jobs using axios
        const response = await api.get("/jobs/all");

        // Map the response to our Job type
        const formattedJobs = response.data.map((job: any) => ({
          id: job._id,
          title: job.title,
          company: job.company,
          type: job.type,
          description: job.description,
          roleType: job.roleType,
          createdAt: job.createdAt,
        }));

        // Set the jobs in state
        setJobs(formattedJobs);
      } catch (error) {
        Alert.alert("Error", "Failed to load jobs");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSave = async (jobId: string) => {
    const updated = savedJobs.includes(jobId)
      ? savedJobs.filter((id) => id !== jobId)
      : [...savedJobs, jobId];

    setSavedJobs(updated);
    await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
  };

  const handleApply = async (jobId: string) => {
    if (appliedJobs.includes(jobId)) {
      Alert.alert("Already Applied", "You have already applied for this job.");
      return;
    }

    const updated = [...appliedJobs, jobId];
    setAppliedJobs(updated);
    await AsyncStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(updated));
    Alert.alert("Success", "Applied for the job!");
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
      <Stack.Screen options={{ title: "Available Jobs" }} />
      <Text style={styles.title}>Job Listings</Text>

      {jobs.length === 0 ? (
        <Text style={styles.noJobs}>No jobs available at the moment.</Text>
      ) : (
        <FlatList
          data={jobs}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.header}>
                <Feather name="briefcase" size={24} color="#333" />
                <Text style={styles.jobTitle}>{item.title}</Text>
              </View>
              <Text style={styles.company}>Company: {item.company}</Text>
              <Text style={styles.jobInfo}>Type: {item.type}</Text>
              <Text style={styles.jobInfo}>Role: {item.roleType}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => handleApply(item.id)}
                  style={styles.button}
                >
                  <FontAwesome
                    name="send"
                    size={16}
                    color="white"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.buttonText}>
                    {appliedJobs.includes(item.id) ? "Applied" : "Apply"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSave(item.id)}
                  style={[
                    styles.button,
                    {
                      backgroundColor: savedJobs.includes(item.id)
                        ? "#f39c12"
                        : "#95a5a6",
                    },
                  ]}
                >
                  <FontAwesome
                    name="bookmark"
                    size={16}
                    color="white"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.buttonText}>
                    {savedJobs.includes(item.id) ? "Saved" : "Save"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noJobs: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
    flex: 1,
  },
  company: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
    color: "#34495e",
  },
  jobInfo: {
    fontSize: 14,
    marginBottom: 4,
    color: "#7f8c8d",
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 12,
    color: "#555",
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2ecc71",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
