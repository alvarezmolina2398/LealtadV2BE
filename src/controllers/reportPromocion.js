

const { CangePromocion } = require("../models/cangePromocion");
const { DetallePromocion } = require("../models/detallePromocion");
const { Op, sequelize } = require("sequelize");
const { Premio } = require("../models/premio");
const { PremioPromocion } = require("../models/premioPromocion");


const postDatosCupon = async (req, res) => {
  try {
    const { promocion, fechaInicial, fechaFinal } = req.body;

    const fechafin = new Date(fechaFinal);
    const fechaIni = new Date(fechaInicial);
    

    // const date = fechaFinal.split("/");
    // const newDate = new Date(parseInt(date[0]),parseInt(date[1]), parseInt(date[2]),23,59,59)

    console.log("estoy buscando inicial", fechaIni);
    console.log("fecha final", fechafin)
    
    const trxAll = await CangePromocion.findAll({
      
      include: {
        model: DetallePromocion,
        include: {
            model: PremioPromocion,
            include: {
                model: Premio
            },
        },
        where: {
            idPromocion: promocion,
        },
      },
      where: {
        fecha: {
          [Op.gte]: fechaIni,
          // [Op.lte]: fechafin,
        },
        fecha: {
          [Op.lte]: fechafin,
        },
      },
    });
    res.json(trxAll)

  
  } catch (error) {
    console.log(error)
    res.status(403)
    res.send({errors: 'Hubo un problema al cargar la data.'})

  }

};

module.exports = { postDatosCupon };
