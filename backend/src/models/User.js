import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  points: {
    type: Number,
    default: 100  // give starting credits
  },
  profileImage: String
}, { timestamps: true })

export default mongoose.model('User', userSchema)