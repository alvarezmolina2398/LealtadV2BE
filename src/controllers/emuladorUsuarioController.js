const { EnviaPremio } = require('../models/enviaPremio.js');
const { Campania } = require('../models/campanias');
const { Bloqueados } = require('../models/bloqueados');
const { Participantes } = require('../models/participantes');
const { Presupuesto } = require('../models/presupuesto');
const { Etapa } = require('../models/etapa');
const { Parametro } = require('../models/parametro.js');
const { Participacion } = require('../models/Participacion.js');
const { Transaccion } = require('../models/transaccion.js');
const { Categoria } = require('../models/categoria.js');
const { TablaDB } = require('../models/tabladb.js');
const { Departamento} =require('../models/departamento.js');
const {  Municipio }=require("../models/municipio.js");

// const { EmuladorUsuario } = require('../models/emuladorUsuario');
const { pronet, sequelize, genesis } = require('../database/database');
const { Sequelize, where } = require('sequelize');


const transaccionesValidasCampanasFusionL = async (id) => {
    try {
        const transaccionesValidas = await Campania.findByPk(id, {
            include: [
                {
                    model: Participantes,
                    attributes: ['id'] ,
                    // where: { estado: 1}
                },

                {
                    model: Etapa,
                    attributes: ['tipoParticipacion'] ,
                    include: [
                        { 
                            model: Parametro, 
                            attributes: ['limiteParticipacion', 'ValorMinimo', 'ValorMaximo', 'valorAnterior'] 
                        }
                    ]
                },
                { 
                    model: Participacion,
                    as: 'participaciones',
                    include: [
                        { 
                            model: Transaccion, 
                            attributes: ['idColumna'] 
                        }
                    ]
                }
            ]
        });
        return transaccionesValidas;
    } catch (error) {
        throw error;
    }
}





const GetcampanasActivasById = async (id) => {
    try {
        const departamento = await Campania.findByPk(id, {
            include: [
                {
                    model: Etapa,
                    include: [
                        { model: Presupuesto, attributes: ['idDepartamento'] }
                    ]
                },
            ]
        });
        return departamento;
    } catch (error) {
        throw error;
    }
}

const transaccionesValidasCampanasFusion = async(idCampania) => {
    try {
        const transaccionesValidas = await Participacion.findAll({
            attributes: [
                'valorMinimo',
                'valorMaximo',
                'idTipoParticipacion',
                'limiteTransacciones',
                'tipoTranasaccion',
                [Sequelize.literal('t.descripcion'), 'descripcion'],
                [Sequelize.literal('ctdb.columna'), 'columna'],
                'idCampanaParticipacion'
            ],
            include: [
                {
                    model: Transaccion,
                    where: {tipoTransaccion: 't'},
                    required: true
                },
                {
                    model: Categoria,
                    where: {tipoTransaccion: 'c', estado: 1 },
                    required: false
                },
                {
                    model: TablaDB,
                    required: true
                }
            ],
            where: { idCampania: idCampania, estado: 1 },
            raw: true
        });
        return transaccionesValidas;
    } catch (error){
        throw error;
    }
}


async function campanasActualesActivas(idUsuario = 0, soloMostrar = 0) {
    try {
      if (idUsuario === 0) {
        // ES UNA BUSQUEDA GENERAL DE TODAS LAS CAMPAÑAS ACTIVAS (NO POR USUARIO)
        const campanas = await Campania.findAll({
          where: {
            estado: 1,
            fechaFinal: { [Op.gte]: new Date() },
            fechaInicio: { [Op.lte]: new Date() },
          },
          order: [['fechaCreacion', 'DESC']],
        });
  
        return campanas;
      } else {
        //BUSQUEDA POR USUARIO ESPECIFICO
        let query = `
          SELECT
            fechaRegistro, edadInicial, edadFinal, tipoUsuario, sexo, usuariosInternos, UsuariosNuevos, UsuariosAntiguos, idCampana, nombreCampana, filtradoNumero, tipoPremio,limiteParticipaciones,tipoParticipacion,minimoTransacciones,minimoAcumular,IFNULL(tituloNotificacion, 'Felicidades!!!') tituloNotificacion,IFNULL(descripcionNotificacion, REPLACE('Usted esta participando en nuestra nueva promoción {nombreCampana}', '{nombreCampana}', REPLACE(REPLACE(nombreCampana,'&#34;','\"'),'&#39;','\''))) descripcionNotificacion, iconoAkisi, imagenPush, descripcionCampana, 0 AS maximoDiario,
            limiteParticipaciones, (SELECT COUNT(*) FROM Participante WHERE idUsuarioParticipante = :idUsuario AND Participante.idCampana = Campania.idCampana) AS actualParticipaciones
          FROM Campania
          WHERE estado = 1 AND fechaFinal >= CAST(NOW() as date) AND fechaInicio <= CAST(NOW() as date)
        `;
  
        //FILTRAR SEGUN EL TIPO DE CAMPAÑA
        const dataUsuario = await pronet.query(
          `SELECT telno, has_commerce FROM tbl_customer WHERE customer_id = :idUsuario`,
          { replacements: { idUsuario }, type: pronet.QueryTypes.SELECT }
        );
  
        if (dataUsuario) {
          //filtradoNumero=0 => APLICAN TODOS
          //filtradoNumero=1 => APLICAN UNICAMENTE LOS REGISTROS ESTABLECIDOS
          //filtradoNumero=2 => APLICAN TODOS EXCEPTO LOS REGISTROS ESTABLECIDOS
          query += `
            AND (
              filtradoNumero=0 OR
              (filtradoNumero=1 AND (SELECT COUNT(*) AS permitido FROM det_campana_numeros_p WHERE id_campana=Campania.idCampana AND numero='${dataUsuario.telno}' AND estado=1)=1) OR
              (filtradoNumero=2 AND (SELECT CASE WHEN COUNT(*)>0 THEN 0 ELSE 1 END AS permitido FROM det_campana_numeros_p WHERE id_campana=Campania.idCampana AND numero='${dataUsuario.telno}' AND estado=1)=1)
            )
            AND ( tipoUsuario = 2 OR tipoUsuario = ${dataUsuario.has_commerce } )
          `;
        } else {
          query += " AND tipoUsuario = 2 ";
        }
  
        //ORDENAR LAS CAMPAÑAS
        query += " ORDER BY fechaCreacion desc";
  
        const campanas = await pronet.query(query, { replacements: { idUsuario }, type: pronet.QueryTypes.SELECT });
  
        return campanas;
      }
    } catch (error) {
      console.error("Error en campanasActualesActivas:", error);
      throw error;
    }
  }

  //obtener todas las campañas activas que pertenecen a terceros.
  async function campanasActualesActivasTercero(res, req) {
    try {
      const campanias = await Campania.findAll({
        where: {
          estado: 1,
          fechaFin: { [Op.gte]: new Date() },
          fechaInicial: { [Op.lte]: new Date() },
          terceros: 1,
        },
        order: [['fechaCreacion', 'DESC']],
      });
  
      return campanas;
    } catch (error) {
      console.error("Error en campanasActualesActivasTercero:", error);
      throw error;
    }
  }

  
  
  

const generaCampanasUsuarios = async(req, res) => {
    try {
        const { referens } = req.params;
        console.log("Número de referencia:", referens);

        const refer = await pronet.query(
            `SELECT customer_id FROM pronet.tbl_customer WHERE customer_reference = :referens LIMIT 1;`, {
                replacements: { referens },
                type: Sequelize.QueryTypes.SELECT
            }
        );

        console.log("Resultado de la consulta refer:", refer);

        if (refer && refer.length > 0) {
            const usuario = await pronet.query(
                `SELECT telno, department, municipality FROM pronet.tbl_customer WHERE customer_id = :customer_id`, {
                    replacements: { customer_id: refer[0].customer_id },
                    type: Sequelize.QueryTypes.SELECT
                }
            );

            console.log("Resultado de la consulta usuario:", usuario);

            if (usuario && usuario.length > 0) {
                // Obtener las campañas activas utilizando el modelo Campania
                const campanasActivasEnc = await Campania.findAll({
                    where: {
                        estado: 1,
                    },
                    attributes: ['id', 'nombre', 'descripcion', 'fechaCreacion', 'fechaRegistro', 'fechaInicio', 'fechaFin', 'diaReporte', 'horaReporte', 'emails', 'edadInicial', 'edadFinal', 'sexo', 'tipoUsuario', 'tituloNotificacion', 'descripcionNotificacion', 'imgPush', 'imgAkisi', 'estado', 'maximoParticipaciones'],
                    order: [
                        ['fechaCreacion', 'DESC']
                    ]
                });


                console.log("Resultado de la consulta campanasActivasEnc:", campanasActivasEnc);

                // Asignar valores a cada objeto campana
                for (const valorCampanasActivas of campanasActivasEnc) {
                    valorCampanasActivas.fechaRegistro = valorCampanasActivas.fechaCreacion;
                    valorCampanasActivas.edadInicial = valorCampanasActivas.edad_inicio;
                    valorCampanasActivas.edadFinal = valorCampanasActivas.edad_fin;
                    valorCampanasActivas.tipoUsuario = valorCampanasActivas.tipo_usuario;
                    valorCampanasActivas.sexo = valorCampanasActivas.sexo;
                    valorCampanasActivas.usuariosInternos = valorCampanasActivas.usuarios_internos;
                    valorCampanasActivas.UsuariosAntiguos = valorCampanasActivas.UsuariosAntiguos;
                    valorCampanasActivas.UsuariosNuevos = valorCampanasActivas.UsuariosNuevos;
                    valorCampanasActivas.esParaUsuariosNuevos = valorCampanasActivas.UsuariosNuevos;
                    valorCampanasActivas.idCampana = valorCampanasActivas.idCampana;
                    valorCampanasActivas.nombreCampana = valorCampanasActivas.nombreCampana;
                    valorCampanasActivas.filtradoNumero = valorCampanasActivas.filtradoNumero;
                    valorCampanasActivas.tipoPremiosCampana = valorCampanasActivas.tipoPremio;

                    if (valorCampanasActivas.imgAkisi = valorCampanasActivas.imgAkisi) {
                        valorCampanasActivas.imgAkisi = valorCampanasActivas.imgAkisi;
                    } else {
                        valorCampanasActivas.imgAkisi = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfUAAAH0BAMAAADWOqmHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAwUExURUxpcf+DAIwYm4wYm/6AAYwYm/2BAP1/AYwYm/x/AYwYm/+DAORF...';
                    }

                    if (valorCampanasActivas.imgPush = valorCampanasActivas.imgPush) {
                        valorCampanasActivas.imgPush = valorCampanasActivas.imgPush;
                    } else {
                        valorCampanasActivas.imgPush = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfUAAAH0BAMAAADWOqmHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAwUExURUxpcf+DAIwYm4wYm/6AAYwYm/2BAP1/AYwYm/x/AYwYm/+DAORF...';
                    }

                    const Bloqueado = await Bloqueados.findAll({
                        where: {
                            estado: 1,
                        },
                        attributes: ['id', 'numero', 'idCampania'],
                    });


                    // console.log("Bloqueados:", Bloqueado);
                    const Participante = await Participantes.findAll({
                        where: {
                            estado: 1,
                        },
                        attributes: ['id', 'numero', 'campaniaId'],
                    });

                    // console.log("Participantes:", Participante);
                    const validaBloqueado = (bloqueado, participantes) => {
                        const participanteCoincidente = participantes.find(participante =>
                            participante.numero === bloqueado.numero && participante.campaniaId === bloqueado.idCampania
                        );

                        return participanteCoincidente ? 'Restrinjido' : 'permitido';
                    };
    
                    const participantesPermitidos = [];
                    const participantesBloqueados = [];
    
                    for (const participante of Participante) {
                        const resultadoBloqueado = validaBloqueado(participante, Bloqueado);
                        console.log(`El numero a participar ${participante.numero} es ${resultadoBloqueado}.`);
                    
                        if (resultadoBloqueado === 'Restrinjido') {
                            participantesBloqueados.push(participante);
                        } else {
                            participantesPermitidos.push(participante);
                        }
                    }


                


                    for (const campania of campanasActivasEnc) {
                        // Obtener las etapas de la campaña
                        const transaccionesValidas = await transaccionesValidasCampanasFusionL(campania.id);
                        
                        // Iterar sobre las etapas y mostrar los idDepartamento de los presupuestos asociados
                        for (const etapa of transaccionesValidas.etapas) {
                            console.log("Información de la etapa:", etapa);
                            console.log("Información de tipoParticipacion:", etapa.tipoParticipacion);
                            
                            // Verifica si los parametros se están cargando correctamente
                            if (etapa && etapa.parametros && etapa.parametros.length > 0) {
                                console.log("parametros asociados:", etapa.parametros);
                                
                                // Accede a los parametros asociados a cada etapa
                                for (const parametro of etapa.parametros) {
                                    console.log("ValorMinimo del parametro:", parametro.ValorMinimo);
                                    console.log("ValorMaximo del parametro:", parametro.ValorMaximo);
                                    console.log("valorAnterior del parametro:", parametro.valorAnterior);
                                    console.log("limiteParticipacion del parametro:", parametro.limiteParticipacion);
                                }
                            } else {
                                console.log("No hay parametros asociados con esta etapa.");
                            }
                        }


                        for (const campania of campanasActivasEnc) {
                            // Obtener las etapas de la campaña
                            const transaccionesValidas = await transaccionesValidasCampanasFusionL(campania.id);
                            
                            // Iterar sobre los Participantes y mostrar su id
                            if (transaccionesValidas && transaccionesValidas.Participantes) {
                                for (const Participante of transaccionesValidas.Participantes) {
                                    console.log("Información de Participante:", Participante);
                                    console.log("Información del id del Participante:", Participante.id);
                                }
                            } else {
                                console.log("No hay Participantes asociados con esta campaña.");
                            }
                        }
                        


                        for (const campania of campanasActivasEnc) {
                            // Obtener las etapas de la campaña
                            const transaccionesValidas = await transaccionesValidasCampanasFusionL(campania.id);
                            
                            // Iterar sobre las participaciones y mostrar las transacciones asociadas
                            for (const participacion of transaccionesValidas.participaciones) {
                                console.log("Información de la participación:", participacion);
                                
                                // Verifica si las transacciones se están cargando correctamente
                                if (participacion && participacion.Transaccions) {
                                    console.log("Transacciones asociadas:", participacion.Transaccions);
                                    
                                    // Acceder a las transacciones asociadas a cada participación
                                    for (const transaccion of participacion.Transaccions) {
                                        console.log("idColumna de la transacción:", transaccion.idColumna);
                                    }
                                } else {
                                    console.log("No hay transacciones asociadas con esta participación.");
                                }
                            }
                        }



                        

                        for (const campania of campanasActivasEnc) {
                            // Obtener las etapas de la campaña
                            const transaccionesValidas = await transaccionesValidasCampanasFusionL(campania.id);
                            
                            // Iterar sobre las participaciones y mostrar las transacciones asociadas
                            for (const participacion of transaccionesValidas.participaciones) {
                                console.log("Información de la participación:", participacion);
                                
                                // Verifica si las transacciones se están cargando correctamente
                                if (participacion && participacion.Transaccions) {
                                    console.log("Transacciones asociadas:", participacion.Transaccions);
                                    
                                    // Acceder a las transacciones asociadas a cada participación
                                    for (const transaccion of participacion.Transaccions) {
                                        console.log("idColumna de la transacción:", transaccion.idColumna);
                                    }
                                } else {
                                    console.log("No hay transacciones asociadas con esta participación.");
                                }
                            }
                        }

                        // Accede a la columna idColumna de Transaccion
                        
                    }
                    for (const campania of campanasActivasEnc) {
                       
                        const departamento = await GetcampanasActivasById(campania.id);
                     
                        for (const etapa of departamento.etapas) {
                            
                            for (const presupuesto of etapa.presupuestos) {
                                console.log("IdDepartamento del presupuesto:", presupuesto.idDepartamento);
                            }
                        }
                    }

                }





                
                
                
            } else {
                res.status(404).json({ message: "No se encontró ningún usuario con este referens." });
            }
        } else {
            res.status(404).json({ message: "No se encontró ningún usuario con este referens." });
        }
    } catch (error) {
        console.error("Error en generaCampanasUsuarios:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};





const campanasUsuariosEmulador_get = async (req, res) => {
    try {
        const { telefono } = req.params;
        console.log("Número de teléfono:", telefono);

        const referens = await pronet.query(
            `SELECT customer_reference 
            FROM pronet.tbl_customer 
            WHERE telno = :telefono ;`, 
            {
                replacements: { telefono },
                type: Sequelize.QueryTypes.SELECT
            }
        );

        console.log("Resultado de la consulta teléfono:", referens);

        let respData;
        if (!referens || referens.length === 0) {
            respData = {
                textoSinInfo: 'Estamos trabajando para traerte más promociones.',
                promociones: []
            };
        } else {
            const { customer_reference } = referens[0];
            respData = await generaCampanasUsuarios({ params: { referens: customer_reference } }, res);
        }

        res.status(200).json(respData);
        res.json(respData);
    } 
    catch (error) 
    {
        console.error("Error en campanasUsuariosEmulador_get:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

const RegionesValidasCampana = async (req, res) => {
    try {
      const idCampana = req.params.idCampana;
  
      const regiones = await Campania.findAll({
        where: {
          idCampana,
          estado: 1,
        },
        include: [
          {
            model: Departamento,
            as: 'departamento',
          },
          {
            model: Municipio,
            as: 'municipio',
          },
        ],
      });
  
      res.json(regiones);
    } catch (error) {
      console.error("Error en regionesValidasCampana:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


// esto es para mostrar en caso de que pidan avanzes

const GetNumeroById = async(req, res) => {
    try {
        const { telefono } = req.params;
        console.log("Número de teléfono recibido:", telefono);


        const envio = await EnviaPremio.findOne({
            where: {
                telefono: telefono,
                estado: 1,
            },
            include: [{
                model: Campania,
                as: 'campaign',
                attributes: ['nombre']
            }]
        });


        res.json(envio);
    } catch (error) {
        console.error('Error al obtener la campania:', error);
        // Enviar una respuesta de error si ocurre algún problema
        res.status(403).send({ errors: 'Ha ocurrido un error al obtener la campania.' });
    }
};


module.exports = {

    // generaCampanasUsuarios,
    campanasUsuariosEmulador_get,
    // campanasActualesActivas,
    // transaccionesValidasCampanasFusion, 
    // DeleteEnvio,
    // GetNumeroById,
}