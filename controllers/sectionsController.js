const mongoose = require('mongoose')
const Section = mongoose.model('Section')

exports.sections = async (req, res) => {
  const sections = await Section.find();

  res.json(sections);
}

exports.createSection = (req, res) => {
  const { title, content } = req.body;
  const newSection = Section({ title, content });

  newSection.save((error, section) => {
    if (error) {
      res.end();
      return console.error(error);
    }

    const response = section.toObject();

    delete response['content'];
    delete response['__v'];

    res.send(section)
  })
}

exports.updateSection = (req, res) => {

}

exports.deleteSection = (req, res) => {
  const { _id } = req.body;

  Section.remove({ _id }).exec((error) => {
    if (error) console.error(error);

    res.end();
  })
}
