const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, '../public/uploads'))
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

function fileFilter (req, file, callback) {
  if (!file.mimetype.match(/image/))
    callback(null, false)

  callback(null, true)
}

module.exports = multer({ storage, fileFilter })
