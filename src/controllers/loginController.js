const { Rol } = require("../models/rol");
const { Usuario } = require("../models/usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const env = require("../bin/Env");
const { error } = require("console");


const getTokenStatus = async (req, res) => {
  try {
      if (req.headers.authorization.username) {
          const usuario = await Usuario.findOne({
              attributes: [
                  'username',
                  ['nombre', 'fullName'],
                  ['emailNotification', 'email'],
                  ['estado', 'status'],
                  ['password','password']
              ],
              where: {
                  username: req.headers.authorization.username
              }
          });

          // Si se encuentra un usuario, devuelve una respuesta con un estado 200 y los datos del usuario.
          if (usuario) {
              res.status(200).send({ status: "Token válido", data: usuario });
          } else {
              // Si no se encuentra el usuario, devuelve un mensaje de error.
              res.status(404).send({ message: "Usuario no encontrado" });
          }
      } else {
          // Si el campo 'id' no está presente en los encabezados, devuelve una respuesta con un estado 403 y un mensaje de error.
          res.status(403).send({ message: "No tienes permisos para poder loguearte" });
      }
  } catch (error) {
      // Manejo de errores si ocurre algún problema durante la ejecución.
      console.error("Error:", error);
      res.status(500).send({ message: "Error interno del servidor" });
  }
};



const loggin = async (req, res) => {
  let { username, password } = req.body;

  try {
    const usuario = await Usuario.findOne({
      include: {
        model: Rol,
        attributes: ["descripcion"],
      },
      where: {
        username: username,
        password: password,
      },
      attributes: ["nombre", "telefono", "emailNotificacion", "username", "password"],
    });

    if (usuario != null) {
      if (password == usuario.dataValues.password) {
        const token = jwt.sign({
          username,
        }, env.jwt.secret, {
          algorithm: 'HS256',
          expiresIn: '1h', 
        });

        // Incluye el token en la respuesta JSON al front-end.
        // res.json({
        //   code: "ok",
        //   message: "Bienvenido " + usuario.nombre,
        //   info: usuario,
        //   token: token,  // Agregado para incluir el token en la respuesta.
        // });
        res.status(200).send({ data: usuario, token: token, code: "ok" });
      } else {
        console.log(error);
        res.status(401).send({ message: "No se pudo generar el token" });
      }
    } else {
      res.json({ code: "01", message: "Usuario o Contraseña Incorrecta" });
    }
  } catch (error) {
    console.log(error);
    res.status(403);
    res.send({
      errors: "Ha sucedido un error al intentar iniciar sesión.",
    });
  }
};



module.exports = {
  loggin,
  getTokenStatus,
};
