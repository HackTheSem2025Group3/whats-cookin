export interface User {
    _id?: string;
    currentWeight: string;
    goalWeight: string;
    activityLevel: string;
    calorieGoal?: number;
    dietaryRestrictions?: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }