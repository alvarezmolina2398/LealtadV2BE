

const { CangePromocion } = require("../models/cangePromocion");
const { DetallePromocion } = require("../models/detallePromocion");
const { Op, sequelize, } = require("sequelize");
const { Premio } = require("../models/premio");
const { PremioPromocion } = require("../models/premioPromocion");
const { TransaccionPremio } = require("../models/transaccionPremio");
const { Transaccion } = require("../models/transaccion");
const { Participacion } = require("../models/Participacion");
const { Premiacion } = require("../models/premiacion");
const { asignarCategoria } = require("../models/asignarCategoria");
const { Campania } = require("../models/campanias");


const postDatosCupon = async (req, res) => {
  try {
    const { promocion, fechaInicial, fechaFinal } = req.body;

    const fechafin = new Date(fechaFinal);
    const fechaIni = new Date(fechaInicial);
    

    console.log("estoy buscando inicial", fechaIni);
    console.log("fecha final", fechafin)
    
    const trxAll = await CangePromocion.findAll({
      include: {
        model: DetallePromocion,
        include: {
          model: PremioPromocion,
          include: {
            model: Premio,
            include: {
              model: Premiacion,
              include: {
                model: TransaccionPremio,
                include: {
                  model: Participacion,
                  include: {
                    model: Campania,
                  },
                },
              },
            },
          },
        },
        where: {
          idPromocion: promocion,
        },
      },
      where: {
        fecha: {
          [Op.gte]: fechaIni,
        },
        fecha: {
          [Op.lte]: fechafin,
        },
      },
    });
    res.json(trxAll)

    trxAll.forEach(trx => {
      console.log('ID de la transacción de canje:', trx.id);
      console.log('Descripción de la transacción de canje:', trx.descripcion);
      console.log('Fecha de la transacción de canje:', trx.fecha);
      console.log('Número de teléfono del cliente:', trx.numeroTelefono);
      console.log('ID del detalle de promoción:', trx.idDetallePromocion);
      console.log('Detalle de promoción:', trx.detallepromocion.dataValues);
    });

  
  } catch (error) {
    console.log(error)
    res.status(403)
    res.send({errors: 'Hubo un problema al cargar la data.'})

  }

};

module.exports = { postDatosCupon };
