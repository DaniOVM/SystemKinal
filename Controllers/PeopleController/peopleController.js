'use strict';
var Person = require('../../models/person');
var emailCorrect = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
var comprobar = Boolean;
var comprobarfalse = Boolean;
function Prueba(req,res){
    res.status(200).send({message: 'Probando el Servidor'})
}
function addPerson(req,res){
    var person = new Person();
    var params = req.body;
    var email = params.email;
    
    if (params.firstName  && params.firstLastName  && params.birthname &&params.civilStatus && params.religion && params.gender && params.department && params.municipality && params.zone){
        if(params.gender == 'FEMENINO' && params.marriedName == '' && params.civilStatus == 'CASADA'){
            res.status(500).send({message: 'Debe de ingresar el apellido de casada'});
        }else{
            if(params.marriedName != '' && params.gender == 'MASCULINO' && params.civilStatus == 'CASADO' && params.civilStatus == 'SOLTERO'){
                res.status(500).send({message: 'El genero de masculino no tiene apellido de Casada'});
            }else{
                if(params.marriedName != '' && params.gender == 'FEMENINO' && params.civilStatus == 'SOLTERA'){
                    res.status(500).send({message: 'El estado civil SOLTERA, no tiene apeliido de casda'});
                }else{
                    if(params.gender == 'MASCULINO' && params.civilStatus == 'SOLTERA' && params.civilStatus == 'CASADA'){
                        res.status(500).send({message: 'El estado civil en Masculino tiene que terminar en SOLETERO Ó CASADO'});
                    }else{
                        if(params.gender == 'FEMENINO' && params.civilStatus == 'SOLTERO' && params.civilStatus == 'CASADO'){
                            res.status(500).send({message: 'El estado civil en FEMENINO tiene que ser SOLTERA o CASADA'});
                        }else{
                            email.forEach(element => {
                                if(emailCorrect.test(element)){
                                    console.log('El correo esta corecto');
                                    comprobar = true;
                                }else{
                                        console.log('Los correos no estan correctos');
                                        comprobarfalse = true;
                                } 
                            });
                            
                        }
                        if(comprobar == true){
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
                                    });
                        }else{
                            if(comprobarfalse == true){
                                res.status(500).send({message: 'Los correos no fueron ingresados correctamente'})
                            }
                           
                        }
                    }
                    
                }
                
            }
        }
        
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
function email (req,res){
    var params = req.body;
    var email = params.email;
    var emailcorrect = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
    
    email.forEach(element => {
        if(emailcorrect.test(element)){
            console.log('el correo esta correcto');
            console.log(element);
        }else{
            res.status(500).send({message: 'Error'});
        }
    });





    
    
}

module.exports ={
    Prueba,
    addPerson,
    listPerson,
    updatePerson,
    deletePerson,
    email
}