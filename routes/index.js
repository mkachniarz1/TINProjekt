const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const SignController = require('../controllers/SignController');
const ContactController = require('../controllers/ContactController');
const CompanyController = require('../controllers/CompanyController');
const ProjectController = require('../controllers/ProjectController');

const { ifSignedIn } = require('../config/authentication');

const errorHandler = require('../middlewares/errors');

router.get('/', PagesController.home);
router.get('/about', PagesController.about);

router.get('/signin', PagesController.signin);
router.post('/signin', SignController.signin);

router.get('/signup', PagesController.signup);
router.post('/signup',
    SignController.validate,
    SignController.checkValidation,
    errorHandler.catchAsync(SignController.signup));

router.get('/contacts', ContactController.contacts);
router.get('/addcontact', ContactController.addcontact);
router.post('/addcontact', ContactController.addnewcontact);
router.get('/editcontact/:contactid', ContactController.editcontact);
router.post('/updatecontact/:contactid', ContactController.updatecontact);
router.get('/deletecontact/:contactid', ContactController.deletecontact);


router.get('/companies', CompanyController.companies);
router.get('/addcompany', CompanyController.addcompany);
router.post('/addcompany', CompanyController.addnewcompany);
router.post('/deletecompany/:companyid', CompanyController.deletecompany);
router.get('/editcompany/:companyid', CompanyController.editcompany)
router.post('/updatecompany/:companyid', CompanyController.updatecompany)

router.get('/projects', ProjectController.projects);
router.get('/addproject', ProjectController.addproject);
router.post('/addproject', ProjectController.addnewproject);
router.get('/editprojec/:projectid', ProjectController.editproject);

module.exports = router;