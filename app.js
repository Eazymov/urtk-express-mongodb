const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const expressValidator = require('express-validator');
const routes = require('./routes');

require('./handlers/passport.js');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/public', express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(expressValidator())
app.use(cookieParser())

app.use(session({
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)

const webpackConfig = require('./webpack.config.js')
const compiler = require('webpack')(webpackConfig)
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

module.exports = app
