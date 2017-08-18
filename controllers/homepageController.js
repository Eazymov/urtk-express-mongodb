const mongoose = require('mongoose')
const Homepage = mongoose.model('Homepage')

exports.homepage = (req, res) => {
  Homepage
    .findOne()
    .select('-_id stage panelText')
    .exec((err, homepage) => {
      if (err) {
        res.send({ err })
        return;
      }

      res.send({ homepage });
    })
}

exports.updateHomepage = (req, res) => {
  const updates = req.body;

  Homepage.findOneAndUpdate({}, updates, err => {
    if (err) {
      res.send({ err });
      return;
    }

    res.end();
  })
}
