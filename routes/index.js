const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const SignController = require('../controllers/SignController');

const errorHandler = require('../middlewares/errors');

router.get('/', PagesController.home);
router.get('/about', PagesController.about);
router.get('/signin', PagesController.signin);
router.get('/signup', PagesController.signup);

router.post('/signup',
    SignController.validate,
    SignController.checkValidation,
    errorHandler.catchAsync(SignController.signup));

router.post('/signin', SignController.singin);

module.exports = router;