'use strict';

    var express = require('express');
    var peopleController = require('../Controllers/peopleController');
    var api = express.Router();

    api.get('/Prueba', peopleController.Prueba);
    api.post('/Add-Person', peopleController.addPerson);
    api.get('/list-Person/', peopleController.listPerson);
    api.put('/update-Person/:id', peopleController.updatePerson);
    api.put('/delete-Person/:id', peopleController.deletePerson);

    module.exports = api;