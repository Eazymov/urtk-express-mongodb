const path = require('path')

exports.adminPage = (req, res) => {
  res.render('index', {
    title: 'Admin panel',
    base: '/admin',
    favicon: 'admin.ico',
    scripts: [
      'public/tinymce/tinymce.min.js',
      'dist/admin.build.js'
    ]
  });
}
