const mongoose = require('mongoose')
const Category = mongoose.model('Category')

exports.categories = (req, res) => {
  const categories = Category.find().exec((error, categories) => {
    if (error) {
      res.end();
      return console.error(error);
    }

    res.send(categories);
  })
}

exports.createCategory = (req, res) => {
  const { title, content } = req.body;
  const newCategory = Category({ title, content });

  newCategory.save((error, category) => {
    if (error) {
      res.end();
      return console.error(error);
    }

    const response = category.toObject();

    delete response['content'];
    delete response['__v'];

    res.send(category)
  })
}

exports.updateCategory = (req, res) => {

}

exports.deleteCategory = (req, res) => {
  const { _id } = req.body;

  Category.remove({ _id }).exec((error) => {
    if (error) console.error(error);

    res.end();
  })
}
