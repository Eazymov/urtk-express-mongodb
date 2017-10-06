const mongoose = require('mongoose')
const Homepage = mongoose.model('Homepage')

exports.homepage = (req, res) => {
  Homepage
    .findOne()
    .select('-_id stage panelText')
    .exec((err, homepage) => {
      if (err) {
        res.json({ err })
        return;
      }

      res.json({ homepage });
    })
}

exports.updateHomepage = (req, res) => {
  const updates = req.body;

  Homepage.findOneAndUpdate({}, updates, (err) => {
    if (err) {
      res.json({ err });
      return;
    }

    res.json({ success: true });
  })
}
