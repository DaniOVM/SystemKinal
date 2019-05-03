'use strict';
var Person = require('../../models/person');

function Prueba(req,res){
    res.status(200).send({message: 'Probando el Servidor'})
}
function addPerson(req,res){
    var person = new Person();
    var params = req.body;

    if (params.firstName  && params.firstLastName  && params.birthname &&params.civilStatus && params.religion && params.gender && params.department && params.municipality && params.zone){
        if(params.gender == 'Femenino' && params.marriedName == '' && params.civilStatus == 'CASADA'){
            res.status(500).send({message: 'Debe de ingresar el apellido de casada'});
        }else{
            
        }
        Person.insertMany({'firstName': params.firstName, 'middleName': params.middleName, 'firstLastName': params.firstLastName, 'secondLastName': params.secondLastName, 'marriedName': params.marriedName, 'birthname': params.birthname,
        'religion': params.religion,'email': params.email,'gender': params.gender, 'civil status': params.civilStatus, 
        'address': {'department': params.department,'municipality': params.municipality,'zone': params.zone,'residential': params.residential,'avenue': params.avenue,
        'street': params.street,'sector':params.sector, 'number':params.number, 'other':params.other},
        'phones':{'cellphone': params.cellphone, 'house': params.house,'otherNumber':params.otherNum}},(err,person)=>{
            if(err){
                res.status(500).send({message:'error al guardar'});
            }else{
                if(!person){
                    res.status(404).send({message:'NO se pudo guardar'});
                }else{
                    res.status(200).send({Persona: person});
                }
            }
        })
    }else{
        res.status(500).send({message: 'Ingrese todos los datos'});
    }
}

function listPerson(req,res){    
    Person.find({},(err,persons)=>{
        if(err){
            res.status(500).send({message: 'No se ha podido listar'});
        }else{
            res.status(200).send({persons});
        }
    });

}

function updatePerson(req, res){
    var personId = req.params.id;
    var params = req.body;

    Person.findOneAndUpdate({_id:personId}, {$set:{firstName: params.firstName, middleName: params.middleName,
        firstLastName: params.firstLastName, secondLastName: params.secondLastName, marriedName: params.marriedName,
        birthname: params.birthname, religion: params.religion, email: params.email, gender: params.gender,
        'address.department': params.department, 'address.municipality': params.municipality, 'address.zone': params.zone, 
        'address.residential': params.residential, 'address.avenue': params.avenue, 'address.street': params.street, 
        'address.sector': params.sector, 'address.number': params.number, 
        'phones.cellphone': params.cellphone, 'phones.house': params.house, 'phones.other': params.other
        }}, {new:true}, (err, personFind) => {
        if(err){
            res.status(500).send({message: 'Error al acutalizar'});
        }else{
            if(!personFind){
                res.status(404).send({message: 'No se ha podido actualizar'});
            }else{
                res.status(200).send({personFind});
            }
        }
    });
}

function deletePerson(req,res){
    var personId = req.params.id;
    
    Person.findByIdAndDelete(personId,(err,personDeleted)=> {
        if(err){
            res.status(404).send({message: 'Error al eliminar'});
        }else{
            if(!personDeleted){
                res.status(404).send({message: 'No se pudo eliminar'});
            }else{
                
                res.status(200).send({message:'Se a eliminado correctamente'});
            }
        }
    });    
}

module.exports ={
    Prueba,
    addPerson,
    listPerson,
    updatePerson,
    deletePerson
}