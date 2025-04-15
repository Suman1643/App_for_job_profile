// app/profile.tsx
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUserId from '../utils/getUserId'; // adjust path based on location
import axios from 'axios';
import { getStudentProfile, saveStudentProfile } from '../utils/getStudentProfile';


const uniqueId = uuidv4();
const STORAGE_KEY = '@student_profile';

export default function ProfileScreen() {
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    resumeUri: '',
    profilePicUri: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getStudentProfile();
      if (profile) {
        setStudentName(profile.studentName || '');
        setEmail(profile.email || '');
        setUserId(profile.userId || '');
      }
    };
    fetchProfile();
    const fetchResume = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;
  
      const response = await axios.get(`http://192.168.174.50:8000/api/resume/${userId}`);
      const resumeData = response.data;
  
      setProfile(prev => ({
        ...prev,
        ...resumeData,
      }));
    };
  
    fetchResume();
  }, []);
  

  const handleChange = (key: keyof typeof profile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const pickResume = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    if (result.assets && result.assets.length > 0) {
      handleChange('resumeUri', result.assets[0].uri);
    }
  };

  const pickProfilePicture = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return Alert.alert('Permission denied', 'Please allow access to photos');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    if (!result.canceled && result.assets.length > 0) {
      handleChange('profilePicUri', result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!profile.fullName || !profile.email) {
      Alert.alert('Validation Error', 'Please enter both name and email.');
      return;
    }
  
    try {
      const profileSaved = await saveStudentProfile(profile.fullName, profile.email); // assuming this stores minimal data
      setUserId(profileSaved.userId);
  
      // Now store the full resume/profile to backend
      await axios.post(`http://192.168.107.50:5000/api/resume`, {
        userId: profileSaved.userId,
        ...profile,
      });
  
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  const handleViewProfile = () => {
    const { fullName, email, phone, skills, experience, resumeUri } = profile;
    Alert.alert(
      'Saved Profile',
      `👤 Name: ${fullName}\n📧 Email: ${email}\n📞 Phone: ${phone}\n🛠️ Skills: ${skills}\n🧰 Experience: ${experience}\n📄 Resume: ${resumeUri ? 'Uploaded ✅' : 'Not uploaded'}`
    );
  };

  return (
    <ImageBackground
    source={{
      uri: 'https://i.pinimg.com/736x/15/66/c8/1566c88ea7315fba44869c1f51c07afe.jpg',
    }}
    style={styles.background}
    resizeMode="cover"
  >
    <View style={styles.overlay} />
  
  {/* Your content goes here */}
  <View style={styles.content}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Student Profile</Text>
      {/* Profile Picture */}
      <TouchableOpacity onPress={pickProfilePicture}>
      {profile.profilePicUri ? (
    <Image
    source={{ uri: profile.profilePicUri }}
    style={styles.profileImage}
       />
    ) : (
    <View style={[styles.profileImage, styles.defaultImage]}>
    <Text style={styles.defaultImageText}>No Photo</Text>
    </View>
     )}

        <Text style={styles.imageText}>Tap to select profile picture</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={profile.fullName}
        onChangeText={text => handleChange('fullName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={profile.email}
        onChangeText={text => handleChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={profile.phone}
        onChangeText={text => handleChange('phone', text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Skills (comma separated)"
        value={profile.skills}
        onChangeText={text => handleChange('skills', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Experience"
        value={profile.experience}
        onChangeText={text => handleChange('experience', text)}
      />

      <TouchableOpacity style={styles.resumeButton} onPress={pickResume}>
        <Text style={styles.resumeText}>
          {profile.resumeUri ? 'Resume Selected ✅' : 'Upload Resume (PDF)'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewButton} onPress={handleViewProfile}>
        <Text style={styles.viewText}>View Saved Profile</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(214, 206, 206, 0)', // Adjust alpha for more/less darkness
      },      
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: '#ddd',
  },
  imageText: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
    fontSize: 13,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  resumeButton: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  resumeText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: '#9b59b6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewText: {
    color: '#fff',
    fontWeight: '600',
  },
  defaultImage: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultImageText: {
    color: '#666',
    fontSize: 12,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },  
  container: {
    padding: 20,
    paddingBottom: 10,
  }, 
  content: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
});
