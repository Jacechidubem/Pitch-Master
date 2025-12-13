const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // --- STRICT PASSWORD VALIDATION ---
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 chars long and include 1 uppercase, 1 lowercase, 1 number, and 1 special char (@$!%*?&)' 
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // --- 1. NEW: Generate Verification Token ---
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Create user (Added isVerified and verificationToken)
    const user = await User.create({
      name,
      email,
      password,
      isVerified: false, // Default to false
      verificationToken: verificationToken
    });

    if (user) {
      // --- 2. NEW: Send Verification Email ---
      const verifyUrl = `${process.env.BASE_URL}/verify/${verificationToken}`;
      
      const message = `
        <h1>Welcome to Pitch Master! ⚽</h1>
        <p>You are almost there. Please click the link below to verify your email address:</p>
        <a href="${verifyUrl}" clicktracking=off>${verifyUrl}</a>
        <p>If you did not create this account, please ignore this email.</p>
      `;

      try {
        await sendEmail({
          email: user.email,
          subject: 'Pitch Master - Verify your email',
          message,
        });

        // Return success but tell them to check email
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user.id),
          isVerified: false, 
          message: "Registration successful! Please check your email to verify." 
        });

      } catch (emailError) {
        console.error("Email send failed:", emailError);
        // Optional: Delete user if email fails so they can try again
        // await User.findByIdAndDelete(user.id); 
        res.status(500).json({ message: 'Email could not be sent. Please try again.' });
      }

    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      
      // Optional: Block login if not verified
      // if (!user.isVerified) {
      //   return res.status(401).json({ message: 'Please verify your email first.' });
      // }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
        isVerified: user.isVerified, // Send this so frontend knows
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify User Email
// @route   GET /api/auth/verify/:token
// @access  Public
const verifyUser = async (req, res) => {
  const { token } = req.params;

  try {
    // Find user with this token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or Expired Verification Token' });
    }

    // Verify user
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token so it can't be reused
    await user.save();

    res.status(200).json({ message: "Email Verified Successfully! You can now login." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser, // <--- Don't forget to export the new function
};