const { TablaDB } = require('../models/tabladb.js');

const GetTablaDB = async(req, res) =>{
    try{
        const table = await TablaDB.findAll({
            where: {
                estado: 1,
            }
        })
        res.json(table)
    }catch(error){
        res.status(403)
        res.send({errors: 'Se ha obtenido un error al obtener el registro de las tablas.'});
    }
}

const AddTablaDB = async (req, res) =>{
    try{
        const {nombre_tabla, idProyectos} = req.body;
        await TablaDB.create({
            nombre_tabla,
            idProyectos
        })
        res.json({code: 'ok', message:'Tabla creada exitosamente.'})
    }catch(err){
        res.status(403)
        res.send({errors: 'Ha sucedido un  error al intentar agregar un nuevo proyecto.'})
    }
}

const UpdateTablaDB = async(req, res)=>{
    try{
        const {nombre_tabla, idProyectos} = req.body
        const {id} = req.params 
        await TablaDB.update({
            nombre_tabla, 
            idProyectos
        }, {
            where:{
                id:id
            }
        });

        res.json({code: 'ok', message:'Tabla actualizada con éxito.'})
    }catch(err){
        res.status(403)
        res.send({errors: 'Ha sucedido un error en la actualización.'})
    }
}

const DeleteTablaDB = async(req, res) =>{
    try{
        const {id} = req.params
        await TablaDB.update({
            estado: 0
        },{
            where:{
                id:id
            }
        });

        res.json({code: 'ok', message: 'Tabla inhabilitada con exito.'})
    }catch(err){
        res.status(403)
        res.send({errors: 'Ha sucedido un error al intentar realizar el proceso.'})
    }
}

const GetTablaDbById = async (req, res) => {
    try {
        const { id } = req.params;
        const table = await TablaDB.findByPk(id,{
           
            where: {
                estado: 1
            }
        });

        res.json(table)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un error al intentar buscar la Profecion.' });
    }
}

module.exports ={GetTablaDB, AddTablaDB, UpdateTablaDB, DeleteTablaDB, GetTablaDbById}