const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Temporary hardcoded admin for testing when MongoDB is down
const TEMP_ADMIN = {
  username: 'admin',
  password: 'admin123',
  email: 'admin@exytex.com',
  role: 'super-admin'
};

// Temporary login endpoint (no MongoDB required)
router.post('/login-temp', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Temp login attempt:', username);

    // Check credentials
    if (username === TEMP_ADMIN.username && password === TEMP_ADMIN.password) {
      // Generate JWT token with temp flag
      const token = jwt.sign(
        { 
          adminId: 'temp-admin-id',
          username: TEMP_ADMIN.username,
          role: TEMP_ADMIN.role,
          isTemp: true  // Flag to identify temp tokens
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      console.log('Temp login successful');

      return res.json({
        success: true,
        message: 'Login successful (temporary mode)',
        token,
        admin: {
          id: 'temp-admin-id',
          username: TEMP_ADMIN.username,
          email: TEMP_ADMIN.email,
          role: TEMP_ADMIN.role
        }
      });
    }

    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });

  } catch (error) {
    console.error('Temp login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

module.exports = router;