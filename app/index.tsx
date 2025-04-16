// import 'react-native-get-random-values';
// import React, { useState } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Entypo } from '@expo/vector-icons';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
//   ImageBackground,
// } from 'react-native';
// import { useRouter, Stack } from 'expo-router';
// import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// export default function Home() {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = () => {
//     alert(`Searching for "${searchQuery}"...`);
//   };

//   return (
//     <ImageBackground
//       source={{
//         uri: 'https://i.pinimg.com/736x/15/66/c8/1566c88ea7315fba44869c1f51c07afe.jpg',
//       }}
//       style={styles.background}
//       resizeMode="cover"
//     >
// <LinearGradient
//   colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
//   style={styles.overlay}
// >
//         <Stack.Screen options={{ title: 'Student Dashboard' }} />
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//           style={{ flex: 1 }}
//         >
//           {/* Admin Login */}
//           <View style={styles.topBar}>
//             <TouchableOpacity
//               style={styles.adminButton}
//               onPress={() => router.push('/admin-login')}
//             >
//               <Ionicons name="person-circle-outline" size={18} color="#fff" />
//               <Text style={styles.adminButtonText}>Admin</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Title */}
//           <Text style={styles.title}>🎯 Welcome to Talent Bridge</Text>

//           {/* Search Bar */}
//           <View style={styles.searchContainer}>
//             <Ionicons name="search" size={20} color="#888" />
//             <TextInput
//               placeholder="Search jobs or resumes..."
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//               style={styles.searchInput}
//               returnKeyType="search"
//               onSubmitEditing={handleSearch}
//               placeholderTextColor="#888"
//             />
//           </View>

//           {/* Buttons */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.resumeButton}
//               onPress={() => router.push('/resume-builder')}
//             >
//               <MaterialIcons name="build" size={22} color="#fff" />
//               <Text style={styles.buttonText}>Build Resume</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.jobButton}
//               onPress={() => router.push('/job-matches')}
//             >
//               <Ionicons name="briefcase-outline" size={22} color="#fff" />
//               <Text style={styles.buttonText}>View Job Matches</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.browseButton}
//               onPress={() => router.push('/job-types')}
//             >
//               <FontAwesome5 name="th-list" size={20} color="#fff" />
//               <Text style={styles.buttonText}>Browse Jobs by Type</Text>
//             </TouchableOpacity>
//             {/* ✅ Profile Button */}
//             <TouchableOpacity
//               style={styles.profileButton}
//               onPress={() => router.push('/profile')}
//             >
//               <Entypo name="user" size={20} color="#fff" />
//               <Text style={styles.buttonText}>Profile</Text>
//             </TouchableOpacity>
//           </View>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(243, 235, 235, 0)', // dark transparent overlay
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },

//   topBar: {
//     alignItems: 'flex-end',
//     marginBottom: 10,
//   },

//   adminButton: {
//     flexDirection: 'row',
//     backgroundColor: 'rgba(0, 122, 255, 0.85)',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     alignItems: 'center',
//   },

//   adminButtonText: {
//     color: '#fff',
//     marginLeft: 5,
//     fontWeight: '600',
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginVertical: 20,
//     textAlign: 'center',
//     color: '#fff',
//     textShadowColor: 'rgba(0, 0, 0, 0.8)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 4,
//   },

//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffffcc',
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginBottom: 30,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },

//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     marginLeft: 10,
//     color: '#000',
//   },

//   buttonContainer: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     gap: 24,
//     alignItems: 'center',
//   },

//   resumeButton: {
//     backgroundColor: '#4CAF50',
//     width: '100%',
//     height: 60,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//     elevation: 3,
//   },

//   jobButton: {
//     backgroundColor: '#FF7043',
//     width: '100%',
//     height: 60,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//     elevation: 3,
//   },

//   browseButton: {
//     backgroundColor: '#3F51B5',
//     width: '100%',
//     height: 60,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//     elevation: 3,
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   profileButton: {
//     backgroundColor: '#9C27B0', // purple
//     width: '100%',
//     height: 60,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//     elevation: 3,
//   },
// });

import "react-native-get-random-values";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StatusBar,
} from "react-native";
import { useRouter, Stack } from "expo-router";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for "${searchQuery}"...`);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1581091012184-7cbe3c5f92c2?auto=format&fit=crop&w=800&q=60",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.8)"]}
        style={styles.overlay}
      >
        <Stack.Screen options={{ title: "Student Dashboard" }} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />

            {/* Admin Login */}
            <View style={styles.topBar}>
              <TouchableOpacity
                style={styles.adminButton}
                onPress={() => router.push("/admin-login")}
              >
                <Ionicons name="person-circle-outline" size={20} color="#333" />
                <Text style={styles.adminButtonText}>Admin</Text>
              </TouchableOpacity>
            </View>

            {/* Title */}
            <Text style={styles.title}>🎯 Welcome to Talent Bridge</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#888" />
              <TextInput
                placeholder="Search jobs or resumes..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
                placeholderTextColor="#aaa"
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#4CAF50" }]}
                onPress={() => router.push("/resume-builder")}
              >
                <MaterialIcons name="build" size={22} color="#fff" />
                <Text style={styles.buttonText}>Build Resume</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#FF7043" }]}
                onPress={() => router.push("/job-matches")}
              >
                <Ionicons name="briefcase-outline" size={22} color="#fff" />
                <Text style={styles.buttonText}>View Job Matches</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#3F51B5" }]}
                onPress={() => router.push("/job-types")}
              >
                <FontAwesome5 name="th-list" size={20} color="#fff" />
                <Text style={styles.buttonText}>Browse Jobs by Type</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#9C27B0" }]}
                onPress={() => router.push("/profile")}
              >
                <Entypo name="user" size={20} color="#fff" />
                <Text style={styles.buttonText}>Profile</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: "center",
  },

  topBar: {
    alignItems: "flex-end",
    marginBottom: 15,
  },

  adminButton: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  adminButtonText: {
    color: "#333",
    marginLeft: 5,
    fontWeight: "600",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 20,
    textAlign: "center",
    color: "#222",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },

  buttonContainer: {
    gap: 16,
    alignItems: "center",
  },

  button: {
    width: "100%",
    height: 55,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
