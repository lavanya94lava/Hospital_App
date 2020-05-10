const express = require('express');
const router  = express.Router();
const usersApi = require('../../../controllers/api/v1/users_api');

// route action to be performed by the user
router.post('/register',usersApi.register);
router.post('/login',usersApi.login);
module.exports = router; 