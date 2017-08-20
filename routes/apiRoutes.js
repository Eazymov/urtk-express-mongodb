const router = require('express').Router();

const HomepageController = require('../controllers/homepageController');
const SponsorsController = require('../controllers/sponsorsController');
const NewsController = require('../controllers/newsController');
const ArticlesController = require('../controllers/articlesController');
const SectionsController = require('../controllers/sectionsController');

/**
 * Homepage
 */
router.get('/homepage', HomepageController.homepage);
router.post('/homepage/update', HomepageController.updateHomepage)

/**
 * Sponsors
 */
router.get('/sponsors', SponsorsController.sponsors)
router.post('/sponsors/create', SponsorsController.createSponsor)
router.post('/sponsors/delete', SponsorsController.deleteSponsor)

/**
 * News
 */
router.get('/news', NewsController.newsList)
router.get('/news/:id', NewsController.newsItem)
router.post('/news/update', NewsController.updateNews)
router.post('/news/delete', NewsController.deleteNews)

/**
 * Articles
 */
/* router.get('/articles', ArticlesController.articles)
router.post('/articles/create', ArticlesController.createArticle)
router.post('/articles/update', ArticlesController.updateArticle)
router.post('/articles/delete', ArticlesController.deleteArticle) */

/**
 * Sections
 */
router.get('/sections', SectionsController.sections)
router.post('/sections/create', SectionsController.createSection)
router.post('/sections/update', SectionsController.updateSection)
router.post('/sections/delete', SectionsController.deleteSection)

module.exports = router;