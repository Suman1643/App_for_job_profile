// // app/admin/post.tsx

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, ImageBackground } from 'react-native';
// import axios from 'axios';
// import api from '@/utils/api';

// const PostJobScreen = () => {
//   const [title, setTitle] = useState('');
//   const [company, setCompany] = useState('');
//   const [type, setType] = useState('');
//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');
//   const [jobs, setJobs] = useState([]);

//   const fetchJobs = async () => {
//     try {
//       const res = await api.get('/jobs/all');
//       setJobs(res.data);
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error fetching jobs');
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

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
//       await api.post('/jobs/post', jobData);
//       Alert.alert('Success', 'Job posted successfully');

//       // Clear form
//       setTitle('');
//       setCompany('');
//       setType('');
//       setLocation('');
//       setDescription('');

//       // Refresh jobs
//       fetchJobs();
//     } catch (err: any) {
//       console.error(err);
//       Alert.alert('Error', err?.response?.data?.error || 'Failed to post job');
//     }
//   };

//   return (
//     <ImageBackground
//           source={{
//             uri: 'https://i.pinimg.com/736x/15/66/c8/1566c88ea7315fba44869c1f51c07afe.jpg',
//           }}
//           style={styles.bg}
//           resizeMode="cover"
//         >
//           <View style={styles.overlay}>
//     <ScrollView style={styles.container}>
//       <Text style={styles.subHeader}>Posted Jobs</Text>

//       {jobs.map((job: any) => (
//         <View key={job._id} style={styles.jobCard}>
//           <Text style={styles.jobTitle}>{job.title}</Text>
//           <Text>{job.description}</Text>
//           <Text>{job.roleType}</Text>
//           <Text style={styles.date}>{new Date(job.createdAt).toLocaleString()}</Text>
//         </View>
//       ))}
//     </ScrollView>
//     </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   bg: {
//     flex: 1,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   container: {
//     padding: 16,
//     marginTop: 40,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   subHeader: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginVertical: 16,
//     color:"white"
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#999',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   jobCard: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.65)',
//   },
//   jobTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: 'rgb(0, 0, 0)'
//   },
//   description:{
//     color: 'white',
//   },
//   roleType:{
//     color: 'white',
//   },
//   date: {
//     marginTop: 6,
//     fontSize: 12,
//     color: 'rgba(34, 28, 28, 0.65)',
//   },
// });

// export default PostJobScreen;

import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import axios from "axios";
import api from "@/utils/api";

const PostJobScreen = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs/all");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error fetching jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Posted Jobs</Text>

      {jobs.map((job: any) => (
        <View key={job._id} style={styles.jobCard}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.text}>{job.company}</Text>
          <Text style={styles.text}>{job.type}</Text>
          <Text style={styles.text}>{job.roleType}</Text>
          <Text style={styles.text}>{job.description}</Text>
          <Text style={styles.date}>
            {new Date(job.createdAt).toLocaleString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  jobCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  text: {
    color: "#555",
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    marginTop: 10,
    fontSize: 12,
    color: "#888",
  },
});

export default PostJobScreen;
