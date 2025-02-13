const mongoose = require('mongoose');
const { Schema } = mongoose;
const otpSchema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
}, { timestamps: true });

const OTP = mongoose.model('otp', otpSchema);
module.exports = OTP;