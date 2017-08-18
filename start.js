const mongoose = require('mongoose')

require('dotenv').config({path: 'variables.env'})

mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on('error', error => console.error(error.message))

require('./models/user.js')
require('./models/homepage.js')
require('./models/sponsor.js')
require('./models/news.js')
require('./models/article.js')
require('./models/category.js')

const app = require('./app')

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), () => {
  console.log('listening on port 8080')
})
