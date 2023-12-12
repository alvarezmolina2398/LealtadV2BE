const { Rol } = require("../models/rol");
const { Usuario } = require("../models/usuario");

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
      res.json({
        code: "ok",
        message: "Bienvenido " + usuario.nombre,
        info: usuario,
      });
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
