const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    minlength: 6,
  },
  // Hashed refresh token to enable server-side revocation
  refreshTokenHash: {
    type: String,
    default: null,
    select: false,
  },
  refreshTokenExpiresAt: {
    type: Date,
    default: null,
    select: false,
  },
  provider: { type: String, default: "local" }, // local | google | facebook
  providerId: { type: String },                 // OAuth provider user id

}, {
  timestamps: true,
});


const User = mongoose.model('User', userSchema);

module.exports = User;
