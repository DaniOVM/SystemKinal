'use strict';
var Person = require('../../models/person');
var Family = require('../../models/family');

function searchPerson(req, res){
    var params = req.body;
    
    Person.findOne({$or: [{firstName: params.search },{middleName: params.search},
    {firstLastName: params.search}, {secondLastName: params.search}]}, (err, results)=>{
        if(err){
            res.status(404).send({message: 'Error al buscar'});
        }else{
            if(!results){
                res.status(200).send({message: 'No hay registros'});
            }else{
                res.status(200).send({results});
            }
        }
    });
}

function saveFamily(req, res){
    var params = req.body;
    var family = new Family();

    Family.findOne({$or: [{name: params.name}]}, (err, results) => {
        if(!results){
            if (params.father && params.mother && params.inCharge && params.son){
                family.name = params.name,
                family.father = params.father,
                family.mother = params.mother,
                family.inCharge = params.inCharge,
                family.son = params.son
        
                family.save((err, familyStored)=>{
                    if(err){
                        res.status(500).send({message: 'Error al guardar'});
                    }else{
                        if(!familyStored){
                            res.status(404).send({message: 'No se ha podido guardar'});
                        }else{
                            res.status(200).send({family: familyStored});
                        }
                    }
                });
            }else{
                res.status(500).send({message: 'Ingrese todos los datos'});
            }
        }else{
            this.updateFamily(req, res, results._id, params.update);
        }
    });
}

function updateFamily(req, res, id, data){

    Family.findByIdAndUpdate(id, data, {new:true}, (err, familyUp) => {
        if(err){
            res.status(500).send({
                message: 'Error al acutalizar'});
        }else{
            if(!familyUp){
                res.status(404).send({message: 'No se ha podido actualizar'});
            }else{
                res.status(200).send({family: familyUp});
            }
        }
    });
}

module.exports = {
    searchPerson,
    saveFamily
}