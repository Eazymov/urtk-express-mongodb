const mongoose = require('mongoose')
const helpers = require('../handlers/helpers.js')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
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
  categorie_id: {
    type: String
  },
  updated: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Article', articleSchema)
