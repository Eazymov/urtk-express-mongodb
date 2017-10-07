const mongoose = require('mongoose')
const Homepage = mongoose.model('Homepage')

exports.homepage = (req, res) => {
  Homepage
    .findOne()
    .select('-_id stage panelText')
    .exec((err, homepage) => {
      if (err) {
        return res.json({ err })
      }

      res.json({ homepage });
    })
}

exports.updateHomepage = (req, res) => {
  const updates = req.body;

  Homepage.findOneAndUpdate({}, updates, (err) => {
    if (err) {
      return res.json({ err });
    }

    res.json({ success: true });
  })
}
