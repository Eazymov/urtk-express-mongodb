const mongoose = require('mongoose')
const helpers = require('../handlers/helpers.js')

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  pubdate: {
    type: String,
    default: helpers.getFormattedDate()
  },
  pubtime: {
    type: String,
    default: helpers.getFormattedTime()
  },
  updated: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('News', newsSchema)
