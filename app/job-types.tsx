import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api'; // adjust path if needed

const STORAGE_KEY = '@applied_jobs';

export default function JobTypes() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadApplied = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setAppliedJobs(JSON.parse(stored));
    };
    loadApplied();
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs/all');
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error fetching jobs');
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = async (jobId: string, company: string) => {
    const jobEntry = `${jobId} at ${company}`;
    if (appliedJobs.includes(jobEntry)) {
      Alert.alert('Already Applied', `You already applied to ${jobEntry}`);
      return;
    }

    Alert.alert('Application Submitted', `Your resume has been sent to ${company}`);
    const updated = [...appliedJobs, jobEntry];
    setAppliedJobs(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>Back to Dashboard</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Browse Jobs by Category</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            placeholder="Search job categories..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
        </View>

        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.jobItem}>
              <Text style={styles.jobText}>{item.title}</Text>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  setSelectedJob(item);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Modal for job details */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Apply for {selectedJob?.title}</Text>
              <Text style={styles.companyText}>
                Company: {selectedJob?.company || 'N/A'}
              </Text>
              <Text style={styles.companyText}>
                Mode: {selectedJob?.roleType || 'N/A'}
              </Text>
              <TouchableOpacity
                style={styles.smallApply}
                onPress={() => handleApply(selectedJob?._id, selectedJob?.companyName)}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeModal}
              >
                <Text style={{ color: '#fff' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  backText: { color: '#fff', fontSize: 16, marginLeft: 8 },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchInput: { flex: 1, fontSize: 16, marginLeft: 10, color: '#000' },
  jobItem: {
    backgroundColor: '#ffffffcc',
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobText: { fontSize: 16, color: '#333' },
  applyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  applyButtonText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  companyText: {
    fontSize: 16,
    marginBottom: 10,
  },
  smallApply: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  closeModal: {
    marginTop: 20,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   ImageBackground,
//   Modal,
//   Alert,
// } from 'react-native';
// import { Ionicons, FontAwesome } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const STORAGE_KEY = '@applied_jobs';

// const jobCategories = [
//   'Software Engineer',
//   'Data Analyst',
//   'Web Developer',
//   'AI/ML Engineer',
//   'Cybersecurity Expert',
//   'Cloud Architect',
//   'UI/UX Designer',
//   'Product Manager',
//   'DevOps Engineer',
// ];

// const companyData: Record<string, { name: string; mode: 'Remote' | 'Offline' }[]> = {
//   'Software Engineer': [
//     { name: 'Google', mode: 'Remote' },
//     { name: 'Microsoft', mode: 'Offline' },
//   ],
//   'Data Analyst': [
//     { name: 'Netflix', mode: 'Remote' },
//     { name: 'Adobe', mode: 'Offline' },
//   ],
//   'Web Developer': [
//     { name: 'Meta', mode: 'Remote' },
//     { name: 'Zomato', mode: 'Offline' },
//   ],
//   'AI/ML Engineer': [
//     { name: 'OpenAI', mode: 'Remote' },
//     { name: 'NVIDIA', mode: 'Offline' },
//   ],
//   'Cybersecurity Expert': [
//     { name: 'Cisco', mode: 'Remote' },
//     { name: 'Kaspersky', mode: 'Offline' },
//   ],
//   'Cloud Architect': [
//     { name: 'Amazon AWS', mode: 'Remote' },
//     { name: 'Oracle', mode: 'Offline' },
//   ],
//   'UI/UX Designer': [
//     { name: 'Figma', mode: 'Remote' },
//     { name: 'Adobe XD', mode: 'Offline' },
//   ],
//   'Product Manager': [
//     { name: 'Slack', mode: 'Remote' },
//     { name: 'Atlassian', mode: 'Offline' },
//   ],
//   'DevOps Engineer': [
//     { name: 'GitHub', mode: 'Remote' },
//     { name: 'Red Hat', mode: 'Offline' },
//   ],
// };

// export default function JobTypes() {
//   const router = useRouter();
//   const [search, setSearch] = useState('');
//   const [selectedJob, setSelectedJob] = useState('');
//   const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     const loadApplied = async () => {
//       const stored = await AsyncStorage.getItem(STORAGE_KEY);
//       if (stored) setAppliedJobs(JSON.parse(stored));
//     };
//     loadApplied();
//   }, []);

//   const filteredJobs = jobCategories.filter((job) =>
//     job.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleApply = async (job: string, company: string) => {
//     const jobEntry = `${job} at ${company}`;
//     if (appliedJobs.includes(jobEntry)) {
//       Alert.alert('Already Applied', `You already applied to ${jobEntry}`);
//       return;
//     }

//     // Simulate resume-based application
//     Alert.alert('Application Submitted', `Your resume has been sent to ${company}`);

//     const updated = [...appliedJobs, jobEntry];
//     setAppliedJobs(updated);
//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
//     setModalVisible(false);
//   };

//   return (
//     <ImageBackground
//       source={{ uri: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d' }}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         {/* Back to Dashboard */}
//         <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//           <Text style={styles.backText}>Back to Dashboard</Text>
//         </TouchableOpacity>

//         <Text style={styles.title}>Browse Jobs by Category</Text>

//         {/* Search */}
//         <View style={styles.searchContainer}>
//           <Ionicons name="search" size={20} color="#888" />
//           <TextInput
//             placeholder="Search job categories..."
//             value={search}
//             onChangeText={setSearch}
//             style={styles.searchInput}
//             placeholderTextColor="#888"
//           />
//         </View>

//         {/* Job List */}
//         <FlatList
//           data={filteredJobs}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <View style={styles.jobItem}>
//               <Text style={styles.jobText}>{item}</Text>
//               <TouchableOpacity
//                 style={styles.applyButton}
//                 onPress={() => {
//                   setSelectedJob(item);
//                   setModalVisible(true);
//                 }}
//               >
//                 <Text style={styles.applyButtonText}>Apply</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         />

//         {/* Modal for Companies */}
//         <Modal visible={modalVisible} transparent animationType="slide">
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContainer}>
//               <Text style={styles.modalTitle}>Apply for {selectedJob}</Text>
//               <FlatList
//                 data={companyData[selectedJob] || []}
//                 keyExtractor={(item) => item.name}
//                 renderItem={({ item }) => (
//                   <View style={styles.companyItem}>
//                     <Text style={styles.companyText}>
//                       {item.name} ({item.mode})
//                     </Text>
//                     <TouchableOpacity
//                       style={styles.smallApply}
//                       onPress={() => handleApply(selectedJob, item.name)}
//                     >
//                       <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply</Text>
//                     </TouchableOpacity>
//                   </View>
//                 )}
//               />
//               <TouchableOpacity
//                 onPress={() => setModalVisible(false)}
//                 style={styles.closeModal}
//               >
//                 <Text style={{ color: '#fff' }}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
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
//   backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
//   backText: { color: '#fff', fontSize: 16, marginLeft: 8 },
//   title: {
//     fontSize: 24,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   searchInput: { flex: 1, fontSize: 16, marginLeft: 10, color: '#000' },
//   jobItem: {
//     backgroundColor: '#ffffffcc',
//     padding: 15,
//     marginVertical: 6,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   jobText: { fontSize: 16, color: '#333' },
//   applyButton: {
//     backgroundColor: '#4CAF50',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   applyButtonText: { color: '#fff', fontWeight: 'bold' },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   companyItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//   },
//   companyText: { fontSize: 16 },
//   smallApply: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 6,
//   },
//   closeModal: {
//     marginTop: 20,
//     backgroundColor: '#e74c3c',
//     padding: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
// });
