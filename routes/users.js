const express = require('express');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email, phone, profileImage, bio, address } = req.body;
    const updateData = { name, email, phone, profileImage, bio, address };
    
    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');
    res.json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET all users (Admin only)
router.get('/', protect, authorize('Admin'), async (req, res) => {
  try {
    const { role, search } = req.query;
    let query = {};
    
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query).select('-password');
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single user by ID (Admin or own profile)
router.get('/:id', protect, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this user' });
    }
    
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE user (Admin or own account)
router.delete('/:id', protect, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this user' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
