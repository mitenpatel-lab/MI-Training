const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['user', 'admin'],
      message: '{VALUE} is not a valid role. Allowed roles are: user, admin.'
    },
    default: 'user'
  },
  refreshToken: {
    type: String,
    default: ""
  }
})
const User = mongoose.model('User', userSchema);

module.exports = User;