const path = require('path')
const fs = require('fs');
const mongoose = require('mongoose')
const Sponsor = mongoose.model('Sponsor')
const fileStorage = require('../handlers/fileStorage.js')

const upload = fileStorage.single('logo')

exports.sponsors = (req, res) => {
  const { select = '' } = req.query;
  
  Sponsor
    .find()
    .select(select)
    .exec((err, sponsors) => {
      if (err) {
        res.send({ err })
        return;
      }

      res.send({ sponsors });
    })
}

exports.createSponsor = (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.send({ err });
      return;
    }

    const { title, link } = req.body;
    const logo = req.file.originalname;

    const result = { title, link, logo }

    const newSponsor = new Sponsor(result)

    newSponsor.save((err, sponsor) => {
      if (err) {
        res.send({ err });
        return;
      }

      res.send({ sponsor })
    })
  })
}

exports.deleteSponsor = (req, res) => {
  const { logo } = req.body;

  Sponsor
    .findOne({ logo })
    .remove()
    .exec(err => {
      if (err) {
        res.send({ err });
        return;
      }

      const filepath = path.resolve(__dirname, `../public/uploads/${logo}`)

      fs.unlink(filepath, err => {
        if (err) {
          res.send({ err });
          return;
        }
      });

      res.end();
    })
}
