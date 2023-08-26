// user.js (routes)
import express from 'express';
import { updateUser, deleteUser, getAllUsers, getSingleUser } from '../controllers/user.js';


const router = express.Router();

// PUT route to update user information, protected by token verification middleware
router.put('/update-user/:id', updateUser);


// DELETE route to delete a user, protected by token verification middleware
router.delete('/:id', deleteUser);

// GET route to fetch all users
router.get('/all-users', getAllUsers);

// GET route to fetch a single user by ID
router.get('/:id', getSingleUser);

export default router;
