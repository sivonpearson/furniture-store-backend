import express from 'express';
import User from '../models/user';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.status(200).json({ message: 'Login successful' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
