const path = require('path')
const fs = require('fs');
const mongoose = require('mongoose')
const Sponsor = mongoose.model('Sponsor')
const fileStorage = require('../handlers/fileStorage.js')

const upload = fileStorage.single('logo')

exports.sponsors = (req, res) => {
  Sponsor
    .find()
    .exec((err, sponsors) => {
      if (err) {
        return res.json({ err })
      }

      res.json({ sponsors });
    })
}

exports.createSponsor = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ err });
    }

    const { title, link } = req.body;
    const logo = req.file.originalname;
    const result = { title, link, logo }
    const newSponsor = new Sponsor(result)

    newSponsor.save((err, sponsor) => {
      if (err) {
        return res.json({ err });
      }

      res.json({ sponsor })
    })
  })
}

exports.deleteSponsor = (req, res) => {
  const { logo } = req.body;

  Sponsor
    .findOne({ logo })
    .remove()
    .exec((err) => {
      if (err) {
        return res.json({ err });
      }

      const filepath = path.resolve(__dirname, `../public/uploads/${logo}`)

      fs.unlink(filepath, (err) => {
        if (err) {
          return res.json({ err });
        }

        res.json({ success: true });
      });
    })
}
