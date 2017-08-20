const path = require('path');

exports.homepage = (req, res) => {
  res.render('index', {
    title: 'Admin panel',
    base: '/admin',
    favicon: 'admin.ico',
    scripts: [
      'public/tinymce/tinymce.min.js',
      'dist/mainpage.build.js'
    ]
  });
}
