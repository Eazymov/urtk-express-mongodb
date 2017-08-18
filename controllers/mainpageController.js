const path = require('path')

exports.homepage = (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../views/mainpage.html'))
}
