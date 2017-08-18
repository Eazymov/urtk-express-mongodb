const mongoose = require('mongoose')
const News = mongoose.model('News')

exports.newsList = (req, res) => {
  const { select = '' } = req.query;

  News
    .find()
    .select(select)
    .exec((err, news) => {
      if (err) {
        res.send({ err })
        return;
      }

      res.send(news)
    })
}

exports.newsItem = (req, res) => {
  const _id = req.params.id;
  const { select = '' } = req.query;

  News
    .findById({ _id })
    .select(select)
    .exec((err, news) => {
      if (err) {
        res.send({ err })
        return;
      }

      res.send(news)
    })
}

exports.createNews = (req, res) => {
  const { title, content } = req.body.data;

  const newNews = News({title, content});

  newNews.save((err, news) => {
    if (err) {
      res.send({ err });
      return;
    }

    const _id = news._id;

    res.send({ _id });
  })
}

exports.updateNews = (req, res) => {
  const { id, data } = req.body;
  console.log()
  News
    .findByIdAndUpdate(id, data)
    .exec((err, news) => {
      if (err) {
        res.send({ err });
        return;
      }

      res.end();
    })
}

exports.deleteNews = (req, res) => {
  const { _id } = req.body;

  News.findByIdAndRemove(_id, err => {
    if (err) {
      res.send({ err });
      return;
    }

    res.end();
  })
}
