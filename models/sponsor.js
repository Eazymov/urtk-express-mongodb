const mongoose = require('mongoose')

const sponsorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  logo: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
})

module.exports = mongoose.model('Sponsor', sponsorSchema)
