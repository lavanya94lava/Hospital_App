const express = require('express');
const router = express.Router();

//directory structure has been made specifically for API handling
router.use('/', require("./api"));
module.exports = router;