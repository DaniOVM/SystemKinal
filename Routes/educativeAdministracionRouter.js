'use stric';

var express = require('express');
var educativeAdministracionController = require('../Controllers/EducAdminController/educativeAdministracionController');
var api = express.Router();

api.post('/Save-Units-Academic', educativeAdministracionController.addAcademicUnits);
api.put('/Update-Units-Academic/:id', educativeAdministracionController.updatedAcademicUnit);
api.put('/Delete-Units-Academic/:id', educativeAdministracionController.deleteAcademicUnit);
api.get('/List-Units-Academic', educativeAdministracionController.listAcademicUnit);



/**--------------------------------------------------------------EducationalCareers-------------------------------------------------------------------------------------------- */
api.post('/Save-Career-Educative',educativeAdministracionController.addEducationalCareers);
api.put('/Update-Career-Educative/:id',educativeAdministracionController.updateEducationalCareers);
api.put('/Delete-Career-Educative/:id', educativeAdministracionController.deleteEducationalCareers);
api.get('/List-Career-Educative', educativeAdministracionController.listEducationlCareers);


/**---------------------------------------------------------COURSE------------------------------------------------------------------- */
api.post('/Save-Course', educativeAdministracionController.saveCourse);
api.get('/List-Course', educativeAdministracionController.listCourse);
api.put('/Update-Course/:id', educativeAdministracionController.updateCourse);
api.put('/Delete-Course/:id', educativeAdministracionController.deleteCourse);


module.exports = api