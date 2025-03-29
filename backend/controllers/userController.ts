import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

// Get all users
const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error); 
    }
};

// Get a single user by ID
const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

// Create a new user
const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error: any) {
        console.error('Error in createUser:', error);
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Validation error', details: error.message });
        } else {
            next(error);
        }
    }
};


// Update an existing user
const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// Delete a user
const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
