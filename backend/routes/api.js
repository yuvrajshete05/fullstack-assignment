const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Location = require('../models/StateCity');

// Route to get only states (for state dropdown)
router.get('/states', async (req, res) => {
  try {
    const states = await Location.find({}, 'state');
    res.json(states.map(loc => loc.state));
  } catch (err) {
    res.status(500).json({ message: 'Error fetching states' });
  }
});

// Route to get states and cities (for dependent dropdowns)
router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching locations' });
  }
});

// New route to get cities for a specific state
router.get('/locations/:state', async (req, res) => {
  try {
    const stateName = req.params.state;
    const location = await Location.findOne({ state: stateName });
    if (location) {
      res.json(location.cities);
    } else {
      res.status(404).json({ message: 'State not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cities' });
  }
});


// Route to get all users (Read operation)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Route to create a new user (Create operation)
router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get a single user by ID (for Edit)
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Route to update a user (Update operation)
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a user (Delete operation)
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
