const mongoose = require('mongoose')
const News = mongoose.model('News')

exports.newsList = (req, res) => {
  News
    .find()
    .exec((err, news) => {
      if (err) {
        return res.json({ err })
      }

      res.json({ news })
    })
}

exports.newsItem = (req, res) => {
  const _id = req.params.id;

  News
    .findById({ _id })
    .exec((err, newsItem) => {
      if (err) {
        return res.json({ err })
      }

      res.json({ newsItem })
    })
}

exports.createNews = (req, res) => {
  const { title, content } = req.body.data;
  const newNews = News({title, content});

  newNews.save((err, news) => {
    if (err) {
      return res.json({ err });
    }

    const _id = news._id;

    res.json({ _id });
  })
}

exports.updateNews = (req, res) => {
  const { id, data } = req.body;

  News
    .findByIdAndUpdate(id, data)
    .exec((err, news) => {
      if (err) {
        return res.json({ err });
      }

      res.end();
    })
}

exports.deleteNews = (req, res) => {
  const { _id } = req.body;

  News.findByIdAndRemove(_id, (err) => {
    if (err) {
      return res.json({ err });
    }

    res.end();
  })
}
