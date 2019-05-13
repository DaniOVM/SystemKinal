'use strict';

var AcademicUnits = require('../../models/academicUnits');
var EducationalCareers = require('../../models/educationalCareers');
var Course = require('../../models/course');

function addAcademicUnits(req,res){
    var params = req.body;
    var academic = new AcademicUnits();

    if(params.academicUnit && params.description){
        academic.academicUnit = params.academicUnit;
        academic.description = params.description;
        academic.code = params.code;

        AcademicUnits.findOne({academicUnit: academic.academicUnit},(err, academica)=>{
            if(err){
                res.status(500).send({message: 'Error en la busqueda'});
            }else{
               if(!academica){
                   academic.save((err,guardado)=>{
                       if(err){
                           res.status(500).send({message: 'Ocurrio un error al guardar!!'});
                       }else{
                           if(!guardado){
                               res.status(404).send({message: 'Error en el sistema'});
                           }else{
                               res.status(200).send({Unidad: guardado});
                           }
                       }
                   })
               }else{
                   res.status(200).send({message: 'La unidad academica ya esta registrada'});
               }
            }
        })
    }else{
        res.status(200).send({message:'Debes de llenar todos los campos de unidades'});
    }
}
function updatedAcademicUnit(req,res){
    var update = req.body
    var AcademicId = req.params.id;

    AcademicUnits.findByIdAndUpdate( AcademicId,update, {new: true},(err, updatedAcademicUnit)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio un error al actualizar'});
        }else{
            if(!updatedAcademicUnit){
                res.status(404).send({message: 'Se produjo un error!!'});
            }else{
                res.status(200).send({academic: updatedAcademicUnit});
            }
        }
    })
}
function deleteAcademicUnit(req,res){
    var AcademicId = req.params.id
    AcademicUnits.findByIdAndDelete(AcademicId,(err)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio un error'});
        }else{
            res.status(200).send({message: 'Fue eliminado de la base de datos'});
        }
    })
}
function listAcademicUnit(req, res){
    AcademicUnits.find({},(err,listar)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio un error'});
        }else{
            res.status(200).send({'Unidad academica': listar});
        }
    })
}

/**------------------------------------------------------EducationalCareers--------------------------------------------------------------------------------- */
function addEducationalCareers(req,res){
    var params = req.body
    var career = new EducationalCareers();

    if(params.code && params.name && params.description){
        career.code = params.code;
        career.name = params.name;
        career.description = params.description;

        EducationalCareers.findOne({name: params.name},(err,buscandoNombre)=>{
            if(err){
                res.status(500).send({message: 'Ocurrio un error'});
            }else{
                if(!buscandoNombre){
                    EducationalCareers.findOne({code: params.code},(err, academica)=>{
                        if(err){
                            res.status(500).send({message: 'Error en la busqueda'});
                        }else{
                           if(!academica){
                               career.save((err,guardado)=>{
                                   if(err){
                                       res.status(500).send({message: 'Ocurrio un error al guardar!!'});
                                   }else{
                                       if(!guardado){
                                           res.status(404).send({message: 'Error en el sistema'});
                                       }else{
                                           res.status(200).send({career: guardado});
                                       }
                                   }
                               })
                           }else{
                               res.status(200).send({message: 'El codigo ya fue registrado'});
                           }
                        }
                    })
                }else{
                    res.status(200).send({message: 'El nombre ya fue registrado'});
                }
            }
        })
    }else{
        res.status(200).send({message: 'Debes de llenar todos los campos'});
    }
}

function updateEducationalCareers(req,res){
    var update = req.body;
    var educationalCareersId = req.params.id;

    EducationalCareers.findByIdAndUpdate(educationalCareersId,update,{new: true},(err,actualizando)=>{
        if(err){
            res.status(500).send({message: 'Error al intentar actualizar'});
        }else{
            if(!actualizando){
                res.status(404).send({message: 'No encontro conexion'});
            }else{
                res.status(200).send({'Carrera Educativa': actualizando});
            }
        }
    });
}

function deleteEducationalCareers(req,res){
    var educationalCareersId = req.params.id

    EducationalCareers.findByIdAndDelete(educationalCareersId,(err)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio un error al intentar eliminar'});
        }else{
            res.status(200).send({Elimar: 'Fue eliminado de la base de datos'});
        }
    })
}
function listEducationlCareers(req, res){
    EducationalCareers.find({},(err,buscando)=>{
        if(err){
            res.status(500).send({message: 'Ocurrio error al intentar buscar'});
        }else{
            if(!buscando){
                res.status(404).send({message: 'Error de conexion'});
            }else{
                res.status(200).send({career: buscando});
            }
        }
    });
}

/**--------------------------------------------------Course-------------------------------------------------------------------------------------- */


function saveCourse(req, res){
    var course = new Course();
    var params = req.body;

    if(params.code && params.name){
        course.code = params.code;
        course.name = params.name;
        course.description = params.description;
        
        Course.findOne({name: params.name},(err,buscandoNombre)=>{
            if(err){
                res.status(500).send({message: 'Ocurrio un error'});
            }else{
                if(!buscandoNombre){
                    Course.findOne({code: params.code},(err, academica)=>{
                        if(err){
                            res.status(500).send({message: 'Error en la busqueda'});
                        }else{
                           if(!academica){
                               course.save((err,guardado)=>{
                                   if(err){
                                       res.status(500).send({message: 'Ocurrio un error al guardar!!'});
                                   }else{
                                       if(!guardado){
                                           res.status(404).send({message: 'Error en el sistema'});
                                       }else{
                                           res.status(200).send({Courso: guardado});
                                       }
                                   }
                               })
                           }else{
                               res.status(200).send({message: 'El codigo ya fue registrado'});
                           }
                        }
                    })
                }else{
                    res.status(200).send({message: 'El nombre ya fue registrado'});
                }
            }
        })
    }else{
        res.status(200).send({message: 'Debes de llenar todos los campos'});
    }
}

function listCourse(req, res){
    Course.find({}, (err, courses)=>{
        if(err){
            res.status(404).send({message: 'error al listar'});
        }else{
            if(!courses){
                res.status(404).send({message:'no se pudo listar'});
            }else{
                res.status(200).send({course: courses});
            }
        }
    });
}

function updateCourse(req, res){
    var courseId = req.params.id;
    var update = req.body;

    Course.findByIdAndUpdate(courseId, update, {new:true}, (err, courseUpdate) => {
        if(err){
            res.status(500).send({
                message: 'Error al acutalizar'});
        }else{
            if(!courseUpdate){
                res.status(404).send({message: 'No se ha podido actualizar'});
            }else{
                res.status(200).send({course: courseUpdate});
            }
        }
    });
}

function deleteCourse(req, res){
    var courseId = req.params.id;

    if(courseId != req.user.sub){
        res.status(500).send({mnessage: 'No tienes permiso'});

    }else{
        Course.findByIdAndRemove(courseId, (err, courseDelete) => {
            if(err){
                res.status(500).send({message: 'Error al eliminar'});
            }else{
                res.status(200).send({message: 'Se elimino correctamente'});
            }
        });
    }
}

module.exports = {
    addAcademicUnits,
    updatedAcademicUnit,
    listAcademicUnit,
    deleteAcademicUnit,
    addEducationalCareers,
    updateEducationalCareers,
    deleteEducationalCareers,
    listEducationlCareers,
    saveCourse,
    listCourse,
    updateCourse,
    deleteCourse
}