const express = require('express');
const token = require('../../../config/authenticate');
const router  = express.Router();
const patientsApi = require('../../../controllers/api/v1/patients_api');

// route actions for patients to be created only if doctor is loggedin 
router.post('/:id/create_report',token.authenticate,patientsApi.createReport);
router.get('/:id/all_reports',patientsApi.all_reports);
router.post('/register_patient',token.authenticate,patientsApi.registerPatient);
module.exports = router;