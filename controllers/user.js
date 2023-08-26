// controllers/user.js
import User from '../models/User.js'; // Update the path to your user model


const updateUser = async (req, res) => {
  const { firstName, lastName, email, location, occupation } = req.body;
  const userId = req.params.id; // Access the user ID from the URL parameter

  console.log('Updating user with ID:', userId);

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId }, // Find user by ID
      {
        $set: {
          firstName,
          lastName,
          email,      // Include email field
          location,
          occupation,
        },
      },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User updated:', updatedUser);
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error.message);
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};


const deleteUser = async (req, res) => {
  const userId = req.params.id; // Access the user ID from the URL parameter

  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database

    // If there are no users found in the database, you might return a 404 status code.
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // If users are found, return a 200 status code along with the list of users.
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};


const getSingleUser = async (req, res) => {
  const userId = req.params.id; // Access the user ID from the URL parameter

  try {
    const user = await User.findOne({ _id: userId }); // Fetch the user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};




// controllers/user.js

const updateUserPicture = async (req, res) => {
  const { userId } = req.params;
  const uploadedFile = req.file; // Access the uploaded file using req.file

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (uploadedFile) {
      // Save the new picturePath in the user's profile
      user.picturePath = uploadedFile.filename; // Assuming multer's default filename
      await user.save();

      return res.status(200).json({ message: "User picturePath updated", picturePath: user.picturePath });
    } else {
      return res.status(400).json({ message: "No file was uploaded" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error updating user picturePath", error: error.message });
  }
};



export { updateUserPicture, updateUser, deleteUser, getAllUsers, getSingleUser };
