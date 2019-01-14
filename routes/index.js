const express = require('express');
const router = express.Router();

const pagesController = require('../controllers/PagesController');

router.get('/', pagesController.home);
router.get('/about', pagesController.about);
router.get('/signin', pagesController.signin);
router.get('/signup', pagesController.signup);

module.exports = router;