const express = require('express');
const token = require('../../../config/authenticate');
const router  = express.Router();
const reportsApi = require("../../../controllers/api/v1/reports_api");

router.get('/:status',token.authenticate, reportsApi.statusReports);
module.exports = router;