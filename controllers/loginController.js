const path = require('path');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.checkAuth = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect('/login');
}

exports.loginPage = (req, res) => {
  req.isAuthenticated() && res.redirect('/admin');

  res.render('index', {
    title: 'Authentication',
    base: '/login',
    favicon: 'login.ico',
    scripts: [
      'dist/login.build.js'
    ]
  });
}

exports.login = async (req, res) => {
  const user = await User.findOne(req.body);

  if (user) {
    req.login(user, (err) => {
      if (err)
        return console.error(err);
    });
  }

  res.json(user ? true : false);
}

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
}
