import mongoose, { Document, Schema } from "mongoose";
import { User } from "../../shared/types/User"; 

/**
 * User Document Interface
 * Defines the TypeScript interface for the User document structure in MongoDB
 * Used for type checking and IntelliSense support throughout the application
 */
export interface IUser extends Omit<User, '_id'>, Document {
  _id: mongoose.Types.ObjectId; // Override _id to match the type in Document
}

/**
 * User Schema
 * Defines the MongoDB schema for the User collection
 */
const userSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, 
    lowercase: true, 
    trim: true, // Remove whitespace from both ends of the string
   
  },
  activityLevel: {
    type: String,
    enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Super Active'],
    required: [true, 'Activity level is required'],
  },
  calorieGoal: {
    type: Number,
    default: 2000, 
  },
  dietaryPreference: {
    type: String,
    enum: ['Vegan', 'Vegetarian', 'Pescatarian', 'Omnivore'],
    default: 'Omnivore',
    // Dietary preference for meal recommendations and restrictions
  },
  allergies: {
    type: [String],
    default: [],
  }
}, { timestamps: true });

/**
 * User Model
 * Mongoose model for the User collection
 * Used for database operations (CRUD) on user data
 */
export default mongoose.model<IUser>("User", userSchema);


