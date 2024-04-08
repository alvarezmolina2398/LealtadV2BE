const { EnviaPremio } = require('../models/enviaPremio.js');
const { Campania } = require('../models/campanias');
const { Bloqueados } = require('../models/bloqueados');
const { Participantes } = require('../models/participantes');
const { Presupuesto } = require('../models/presupuesto');
const { Etapa } = require('../models/etapa');
const { Parametro } = require('../models/parametro.js');
const { Participacion } = require('../models/Participacion.js');
const { Transaccion } = require('../models/transaccion.js');

// const { EmuladorUsuario } = require('../models/emuladorUsuario');
const { pronet } = require('../database/database');
const { Sequelize } = require('sequelize');


const transaccionesValidasCampanasFusionL = async (id) => {
    try {
        const transaccionesValidas = await Campania.findByPk(id, {
            include: [
                {
                    model: Participantes,
                    attributes: ['id'] ,
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
            WHERE telno = :telefono ;`, {
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
    } catch (error) {
        console.error("Error en campanasUsuariosEmulador_get:", error);
        res.status(500).json({ message: "Error interno del servidor." });
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
    // DeleteEnvio,
    // GetNumeroById,
}