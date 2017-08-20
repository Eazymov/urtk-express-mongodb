const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
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
  },
  articles: {
    type: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Article'
    }],
    default: []
  }
})

module.exports = mongoose.model('Section', sectionSchema)
