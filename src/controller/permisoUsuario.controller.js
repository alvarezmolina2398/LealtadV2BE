const { permisoUsuario } = require("../models/permisoUsuario");


const addPermiso = async (req, res) => {

    const {

        fechaAsignacion,
        username,
        idRol,
        idPagina

    } =req.body;

    try {

        await permisoUsuario.create({
            fechaAsignacion,
            username,
            idRol,
            idPagina
        })

        res.json({code: 'ok', message: 'Permiso creado con exito.'});


    } catch(error) {

        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de Categoria.' });

    }

}

const getPermisos = async(req,res) => {

    try{

        const permisos = await permisoUsuario.findAll();

        res.json(permisos);

    }catch(error){

        res.status(403);
        res.send({errors: 'Ha sucedido un error al intentar realizar la consulta.'})

    }
}

module.exports = {
    addPermiso,
    getPermisos
}