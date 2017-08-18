const mongoose = require('mongoose')

const homepageSchema = new mongoose.Schema({
  stage: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  panelText: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('Homepage', homepageSchema)
