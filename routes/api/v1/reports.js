const express = require('express');
const passport = require("../../../config/passport-jwt-strategy");
const router  = express.Router();
const reportsApi = require("../../../controllers/api/v1/reports_api");

router.get('/:status',passport.authenticate("jwt",{session:false}), reportsApi.statusReports);
module.exports = router;