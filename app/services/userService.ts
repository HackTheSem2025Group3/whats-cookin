import axios from 'axios';
import { User } from '../../shared/types/User';

// MongoDB API URL
const API_URL = 'http://localhost:8000/api';

/**
 * Save user data to MongoDB
 */
export const saveUserData = async (userData: User): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

/**
 * Get user data from MongoDB by ID
 */
export const getUserData = async (userId: string): Promise<User | null> => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

/**
 * Update existing user data
 */
export const updateUserData = async (userId: string, userData: Partial<User>): Promise<User> => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

/**
 * Calculate calorie goal based on user information
 */
export const calculateCalorieGoal = (weight: string, activityLevel: string): number => {
  const weightNum = parseFloat(weight);
  if (isNaN(weightNum)) return 2000; 
  
  let multiplier = 1.2; // Default for Sedentary
  switch (activityLevel) {
    case 'Lightly Active': multiplier = 1.375; break;
    case 'Moderately Active': multiplier = 1.55; break;
    case 'Very Active': multiplier = 1.725; break;
    case 'Super Active': multiplier = 1.9; break;
    default: multiplier = 1.2;
  }
  
  return Math.round(weightNum * 10 * multiplier);
};

export default {
  saveUserData,
  getUserData,
  updateUserData,
  calculateCalorieGoal
};