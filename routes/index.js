const router = require('express').Router()

const MainpageController = require('../controllers/mainpageController.js')
const LoginController = require('../controllers/loginController.js')
const AdminController = require('../controllers/adminController.js')

const HomepageController = require('../controllers/homepageController.js')
const SponsorsController = require('../controllers/sponsorsController.js')
const NewsController = require('../controllers/newsController.js')
const ArticlesController = require('../controllers/articlesController.js')
const CategoriesController = require('../controllers/categoriesController.js')

// router.all(/admin/, LoginController.checkAuth)

router.get('/', MainpageController.homepage)

router.get('/login', LoginController.loginPage)
router.get('/logout', LoginController.logout)
router.post('/login', LoginController.login)

// router.get(/\/admin[^\/]/, (req, res) => res.redirect('/admin/'))
router.get('/admin/', AdminController.adminPage)

router.get('/homepage', HomepageController.homepage)
router.post('/homepage/update', HomepageController.updateHomepage)

router.get('/sponsors', SponsorsController.sponsors)
router.post('/sponsors/create', SponsorsController.createSponsor)
router.post('/sponsors/delete', SponsorsController.deleteSponsor)

router.get('/news', NewsController.newsList)
router.get('/news/:id', NewsController.newsItem)
router.post('/news/update', NewsController.updateNews)
router.post('/news/delete', NewsController.deleteNews)
/*
router.get('/articles', ArticlesController.articles)
router.post('/articles/create', ArticlesController.createArticle)
router.post('/articles/update', ArticlesController.updateArticle)
router.post('/articles/delete', ArticlesController.deleteArticle)
*/
router.get('/categories', CategoriesController.categories)
router.post('/categories/create', CategoriesController.createCategory)
router.post('/categories/update', CategoriesController.updateCategory)
router.post('/categories/delete', CategoriesController.deleteCategory)

module.exports = router
