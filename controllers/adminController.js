const path = require('path')

exports.adminPage = (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../views/admin.html'))
}
