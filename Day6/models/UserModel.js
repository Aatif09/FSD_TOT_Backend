const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: "09.aatif@gmail.com",
    required: true,
    unique: true,
    trim: true,
  }
}, { timestamps: true });

const User = mongoose.model('users', userSchema);

module.exports = User;