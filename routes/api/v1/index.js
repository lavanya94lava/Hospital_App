const express = require('express');

const router  = express.Router();

// route actions
router.use('/doctors',require('./users'));
router.use('/patients',require('./patients'));
router.use('/reports',require('./reports'));

module.exports = router;