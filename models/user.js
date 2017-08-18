const mongoose = require('mongoose')
const validator = require('validator')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email adress']
  },
  username: {
    unique: true,
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

userSchema.plugin(passportLocalMongoose, {usernameField: 'username'})

module.exports = mongoose.model('User', userSchema)
