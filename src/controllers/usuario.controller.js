const { Rol } = require('../models/rol')
const { Usuario } = require('../models/usuario')
const bcrypt = require("bcryptjs");
const env = require("../bin/env");

const GetUsuarios = async (req, res) => {

    try {
        
        let usr = await Usuario.findAll({
            include: { model: Rol },
            where: {
                estado: 1
            },
            attributes: ["username", "nombre", "telefono", "emailNotificacion", "idRol"],
        })

        res.json(usr)

    } catch (error) {

        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la transacción.' });

    }

}

const AddUsuario = async (req, res) => {
    try {
        let { username, nombre, password, telefono, emailNotificacion, idRol, tipoUsuario } = req.body;
        tipoUsuario = tipoUsuario || 1; 
        password = await bcrypt.hash(password, env.bcrypt.sr);

        await Usuario.create({
            username,
            nombre,
            password,
            telefono,
            emailNotificacion,
            idRol,
            tipoUsuario 
        });

        res.json({ code: 'ok', message: 'Usuario creado con exito' });

    } catch (error) {
        console.log("Error al agregar usuario:", error); 
        res.status(403)
        res.send({ errors: 'Ha sucedido un error al intentar agrear un usuario.'  + error});

    }
}


//controllador para actualizar los usuarios
const UpdateUsuario = async (req, res) => {

    try {

        const { nombre, password, telefono, emailNotificacion,   idRol } = req.body;
        const { username } = req.params
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
        console.log("Error al agctuausuario:", error); 

        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar actualizar un usuario.' });

    }

}


//controllador para eliminar los usuarios
const DeleteUsuario = async (req, res) => {

    try {

        const { username } = req.params

        await Usuario.update({

            estado: 0

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