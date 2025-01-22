// jwt token handling for user authentication
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users.model.js');
// const { secret } = require('../config');

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Your Google Client ID
const client = new OAuth2Client(CLIENT_ID);


exports.verifyIdToken = async (req, res, next) => {
  // Get token from cookie instead of request body
  const token = req.cookies.jwt;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.protected = (req,res) => {
    res.send('Protected route');
}



exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.send('Logged out');
}