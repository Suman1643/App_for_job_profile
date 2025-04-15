import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export interface StudentProfile {
  userId: string;
  studentName: string;
  email: string;
}

// Save student profile (can be called from profile screen or first-time setup)
export const saveStudentProfile = async (studentName: string, email: string): Promise<StudentProfile> => {
  try {
    let userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      userId = uuidv4();
      await AsyncStorage.setItem('userId', userId);
    }

    const profile: StudentProfile = { userId, studentName, email };
    await AsyncStorage.setItem('studentProfile', JSON.stringify(profile));
    return profile;
  } catch (error) {
    console.error('Error saving student profile:', error);
    throw error;
  }
};

// Get student profile
export const getStudentProfile = async (): Promise<StudentProfile | null> => {
  try {
    const storedProfile = await AsyncStorage.getItem('studentProfile');
    if (storedProfile) {
      return JSON.parse(storedProfile);
    }

    // Fallback if only userId is stored
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      return { userId, studentName: '', email: '' };
    }

    return null;
  } catch (error) {
    console.error('Error retrieving student profile:', error);
    throw error;
  }
};
