import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  description: String,
  images: [String],
  category: String,
  size: String,
  condition: String,
  tags: [String],
  status: {
    type: String,
    enum: ['available', 'swapped', 'redeemed'],
    default: 'available'
  }
}, { timestamps: true })

export default mongoose.model('Item', itemSchema)
