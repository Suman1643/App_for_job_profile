import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'userId';

const getUserId = async (): Promise<string> => {
  try {
    let userId = await AsyncStorage.getItem(USER_ID_KEY);
    if (!userId) {
      userId = uuidv4(); // generate new UUID
      await AsyncStorage.setItem(USER_ID_KEY, userId);
    }
    return userId;
  } catch (error) {
    console.error('Failed to get or create userId:', error);
    throw error;
  }
};

export default getUserId;
