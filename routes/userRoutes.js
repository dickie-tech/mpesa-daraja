const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication logic
  if (username === 'admin' && password === 'password') {
    res.status(200).json({ message: 'Login successful', token: 'dummy_token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Dummy registration logic
  if (username && password) {
    res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(400).json({ message: 'Invalid registration data' });
  }
});

module.exports = router;