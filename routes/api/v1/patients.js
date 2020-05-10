const express = require('express');
const passport = require('passport');
const router  = express.Router();
const patientsApi = require('../../../controllers/api/v1/patients_api');

// route actions for patients to be created only if doctor is loggedin 
router.post('/:id/create_report',passport.authenticate("jwt",{session:false}),patientsApi.createReport);
router.get('/:id/all_reports',patientsApi.all_reports);
router.post('/register_patient',passport.authenticate("jwt",{session:false}),patientsApi.registerPatient);
module.exports = router;