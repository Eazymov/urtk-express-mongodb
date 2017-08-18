const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  visible: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('Category', categorySchema)
