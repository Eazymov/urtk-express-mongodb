const mongoose = require('mongoose')

require('dotenv').config({path: 'variables.env'})

mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on('error', error => console.error(error.message))

require('./models/user')
require('./models/homepage')
require('./models/sponsor')
require('./models/news')
require('./models/article')
require('./models/section')

const app = require('./app')

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), () => {
  console.log('listening on port 8080')
})
