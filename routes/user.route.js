const registerController = require('../controller/register.controller');
const router = require('express').Router();

router.post('/signup', registerController.registration);

module.exports = router;