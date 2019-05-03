'use strict';
var Person = require('../../models/person');
var jwt = require('../../services/jwt');
function Prueba(req,res){
    res.status(200).send({message: 'Probando el Servidor'})
}
function addPerson(req,res){
    var person = new Person();
    var params = req.body;

    if (params.firstName && params.middleName && params.firstLastName && params.secondLastName && params.birthname && params.religion && params.email && params.gender ){
        // person.firstName = params.firstName;
        // person.middleName = params.middleName;
        // person.firstLastName = params.firstLastName;
        // person.secondLastName = params.secondLastName;
        // person.marriedName = params.marriedName;
        // person.birthname = params.birthname;
        // person.religion = params.religion;
        // person.email = params.email;
        // person.gender = params.gender;
        // person.addres = params.addres;
        // person.phone = params.phone;

        // person.save((err, personStored)=>{
        //     if(err){
        //         res.status(500).send({message: 'Error al guardar'});
        //     }else{
        //         if(!personStored){
        //             res.status(404).send({message: 'No se ha podido registrar'});
        //         }else{
        //             // if(params.gettoken){
        //             //     res.status(200).send({token: jwt.createToken(person)})
        //             // }
        //             res.status(200).send({Person: personStored});
        //         }
        //     }
        // })

        Person.insertMany({'firstName': params.firstName, 'middleName': params.middleName, 'firstLastName': params.firstLastName, 'secondLastName': params.secondLastName, 'marriedName': params.marriedName, 'birthname': params.birthname,
        'religion': params.religion,'email': params.email,'gender': params.gender, 
        'address': {'department': params.department,'municipality': params.municipality,'zone': params.zone,'residential': params.residential,'avenue': params.avenue,
        'street': params.street,'sector':params.sector, 'number':params.number},
        'phones':{'cellphone': params.cellphone, 'house': params.house,'other':params.other}},(err,person)=>{
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