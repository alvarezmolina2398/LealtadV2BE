const { Rol } = require('../models/rol')
const { Usuario } = require('../models/usuario')


//controllador paa obtener la lista de los usuarios
const GetUsuarios = async (req, res) => {
    try {
        const usr = await Usuario.findAll({
            include: { model: Rol },
            where: {
                estado: 1
            }
        })
        res.json(usr)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Transaccion.' });
    }

}


//controllador para agregar nuevos usuarios
const AddUsuario = async (req, res) => {

    try {
        const { username, nombre, password, telefono, emailNotificacion,idRol } = req.body;
        await Usuario.create({
            username,
            nombre,
            password,
            telefono,
            emailNotificacion,
            idRol
        })
        res.json({ code: 'ok', message: 'Usuario creado con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar agrear un usuario.' });
    }

}


//controllador para actualizar los usuarios
const UpdateUsuario = async (req, res) => {

    try {
        const { nombre, password, telefono, emailNotificacion, idRol} = req.body;
        const {username} = req.params
        console.log(username)
        await Usuario.update({
            nombre,
            password,
            telefono,
            emailNotificacion,
            idRol
        }, {
            where: {
                username: username
            }
        });


        res.json({ code: 'ok', message: 'Usuario actualizado con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar actualizar un usuario.' });
    }

}


//controllador para eliminar los usuarios
const DeleteUsuario = async (req, res) => {

    try {
        const {username} = req.params
        await Usuario.update({
            estado : 0
        }, {
            where: {
                username: username
            }
        });


        res.json({ code: 'ok', message: 'Usuario inhabilitado con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar eliminar un usuario.' });
    }

}


const GetUsuarioById = async (req, res) => {
    try {
        const { username } = req.params;
        const project = await Usuario.findByPk(username);
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar ver el usuario.' });
    }

}

module.exports = { GetUsuarios, AddUsuario, UpdateUsuario, DeleteUsuario, GetUsuarioById }