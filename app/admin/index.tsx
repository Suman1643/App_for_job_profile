// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ImageBackground,
// } from 'react-native';
// import { useRouter, Stack } from 'expo-router';
// import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';

// export default function AdminDashboard() {
//   const router = useRouter();

//   return (
//     <ImageBackground
//       source={{
//         uri: 'https://i.pinimg.com/736x/15/66/c8/1566c88ea7315fba44869c1f51c07afe.jpg',
//       }}
//       style={styles.bg}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <SafeAreaView style={styles.overlay}>
//           <Stack.Screen options={{ title: 'Admin Dashboard' }} />

//           {/* Top Left - Back to Student Dashboard */}
//           <View style={styles.topBar}>
//             <TouchableOpacity
//               style={styles.backButton}
//               onPress={() => router.replace('/')}
//             >
//               <Ionicons name="arrow-back" size={18} color="#fff" />
//               <Text style={styles.backButtonText}>Student Panel</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Title */}
//           <Text style={styles.title}>Welcome, Admin</Text>

//           {/* Action Buttons */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.insightsButton}
//               onPress={() => router.push('/admin/insights')}
//             >
//               <MaterialIcons name="analytics" size={22} color="#fff" />
//               <Text style={styles.buttonText}>View Student Insights</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.postButton}
//               onPress={() => router.push('/admin/post-internship-job')}
//             >
//               <Ionicons name="create-outline" size={22} color="#fff" />
//               <Text style={styles.buttonText}>Post Internship/Job</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.postsButton}
//               onPress={() => router.push('/admin/post')}
//             >
//               <Entypo name="list" size={22} color="#fff" />
//               <Text style={styles.buttonText}>View Posts</Text>
//             </TouchableOpacity>
//           </View>
//         </SafeAreaView>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   bg: {
//     flex: 1,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.12)',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   topBar: {
//     alignItems: 'flex-start',
//   },
//   backButton: {
//     flexDirection: 'row',
//     backgroundColor: '#444',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     alignItems: 'center',
//   },
//   backButtonText: {
//     color: '#fff',
//     marginLeft: 5,
//     fontWeight: '600',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginTop: 30,
//     marginBottom: 40,
//     textAlign: 'center',
//     color: '#fff',
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     gap: 30,
//     alignItems: 'center',
//   },
//   insightsButton: {
//     backgroundColor: '#9C27B0',
//     width: 270,
//     height: 60,
//     borderRadius: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//     elevation: 5,
//   },
//   postButton: {
//     backgroundColor: '#0288D1',
//     width: 270,
//     height: 60,
//     borderRadius: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//     elevation: 5,
//   },
//   postsButton: {
//     backgroundColor: '#4CAF50',
//     width: 270,
//     height: 60,
//     borderRadius: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//     elevation: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Admin Dashboard" }} />

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/")}
        >
          <Ionicons name="arrow-back" size={18} color="#333" />
          <Text style={styles.backButtonText}>Student Panel</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome, Admin</Text>

      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#9C27B0" }]}
          onPress={() => router.push("/admin/insights")}
        >
          <MaterialIcons name="analytics" size={22} color="#fff" />
          <Text style={styles.buttonText}>View Student Insights</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#0288D1" }]}
          onPress={() => router.push("/admin/post-internship-job")}
        >
          <Ionicons name="create-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Post Internship/Job</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4CAF50" }]}
          onPress={() => router.push("/admin/post")}
        >
          <Entypo name="list" size={22} color="#fff" />
          <Text style={styles.buttonText}>View Posts</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  topBar: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
  backButton: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  backButtonText: {
    color: "#333",
    marginLeft: 5,
    fontWeight: "600",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 30,
    textAlign: "center",
    color: "#222",
  },
  buttonContainer: {
    alignItems: "center",
    gap: 20,
    paddingBottom: 40,
  },
  button: {
    width: 270,
    height: 60,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
