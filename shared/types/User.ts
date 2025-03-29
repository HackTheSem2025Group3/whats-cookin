/**
 * User interface shared between frontend and backend
 */
export interface User {
    _id?: string;
    name: string;
    email: string;
    activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active' | 'Super Active';
    calorieGoal?: number;
    dietaryPreference?: 'Vegan' | 'Vegetarian' | 'Pescatarian' | 'Omnivore';
    allergies?: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }