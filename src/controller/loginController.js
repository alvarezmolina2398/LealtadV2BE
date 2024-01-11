const { Rol } = require("../models/rol");
const { Usuario } = require("../models/usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const env = require("../Bin/Env");

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
      attributes: ["nombre", "telefono", "emailNotificacion", "username"],
    });

    if (usuario != null) {
          if(bcrypt.compareSync(password, usuario.dataValues.password)){
            let token = jwt.sign({
                id : usuario.id
            }, env.jwt.secret, { algorithm: 'HS256' });
            
            usuario.dataValues['password'] = null;

            res.status(200).send({data: usuario, token: token});
        }else{
            res.status(403).send({message : "No tienes permisos para poder loguearte"});
        }
    } else {
      res.json({ code: "01", message: "Usuario o Contraseña Incorrecta" });
    }
  } catch (error) {
    console.log(error);
    res.status(403);
    res.send({
      errors: "Ha sucedido un  error al intentar realizar la asignacion.",
    });
  }
};

module.exports = {
  loggin,
};
