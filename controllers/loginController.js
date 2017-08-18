const path = require('path')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use('basic', new LocalStrategy((username, password, done) => {
  User.findOne({ username, password }, (error, user) => {
    if (error)
      return done(error)

    if (!user)
      return done(null, false,
        { message: 'There is no user with this username and password.' }
      )

    return done(null, user);
  })
}))

exports.checkAuth = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect('/login')
}

exports.loginPage = (req, res) => {
  req.isAuthenticated() && res.redirect('/admin')

  res.sendFile(path.resolve(__dirname + '/../views/login.html'))
}

exports.login = passport.authenticate('basic', {
  failureRedirect: '/login',
  successRedirect: '/admin/'
})

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/login')
}
