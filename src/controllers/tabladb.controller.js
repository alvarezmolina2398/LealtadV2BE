const { TablaDB } = require('../models/tabladb.js');

const GetTablaDB = async(req, res) =>{
    try{
        const table = await TablaDB.findAll({
            where: {
                status: 1,
            }
        })
        res.json(table)
    }catch(error){
        res.status(403)
        res.send({errors: 'Se ha obtenido un error al obtener el registro de las tablas.'});
    }
}