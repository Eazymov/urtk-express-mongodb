const router = require('express').Router();

const apiRoutes = require('./apiRoutes');

const MainpageController = require('../controllers/mainpageController');
const LoginController = require('../controllers/loginController');
const AdminController = require('../controllers/adminController');

router.all(/admin/, LoginController.checkAuth);

router.get('/', MainpageController.homepage);

router.get('/login', LoginController.loginPage);
router.post('/login', LoginController.login);
router.get('/logout', LoginController.logout);

router.get('/admin*', AdminController.adminPage);

/**
 * API
 */

router.use('/api', apiRoutes);

module.exports = router
