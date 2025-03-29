/**
 * User Routes
 * 
 * This file defines all API endpoints related to user operations.
 * Follows RESTful API conventions for CRUD operations on user resources.
 */

// Import dependencies
import express from 'express';
import userController from '../controllers/userController';

// Initialize Express router
const router = express.Router();

// Define routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Export router to be mounted in main application
export default router;
