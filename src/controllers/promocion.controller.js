const { Promocion } = require('../models/promocion');
const { DetallePromocion } = require('../models/detallePromocion');
const { PremioPromocion } = require('../models/premioPromocion');
const { Premio } = require('../models/premio');
const { Op } = require("sequelize");
const { GetColumnaById } = require('./columna.controller');


//controllador paa obtener la lista de Columnaes
const GetPromocion = async (req, res) => {
    try {
        const trx = await Promocion.findAll({
            where: {
                estado: [1, 2, 3]
            }
        })
        res.json(trx)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar consultar las promociones.' });
    }

}


//controllador para agregar nuevas Columnaes
// const AddPromocion = async (req, res) => {

//     try {
//         const {
//             nemonico,
//             nombre,
//             descripcion,
//             mesajeExito,
//             mesajeFail,
//             imgSuccess,
//             imgFail,
//             fechaInicio,
//             fechaFin,
//             PremioXcampania,
//             estado,
//             codigos,
//             premios
//         } = req.body;

//         const estadotext = estado === 3 ? 'en Borrador' : '';
//         const newPromo = await Promocion.create({
//             nemonico,
//             nombre,
//             descripcion,
//             mesajeExito,
//             mesajeFail,
//             imgSuccess,
//             imgFail,
//             fechaInicio,
//             fechaFin,
//             estado,
//             PremioXcampania
//         });

//         const { id } = newPromo.dataValues;


//         //if (PremioXcampania != 1) {
//             premios.forEach(element => {
//                 const { cantidad } = element;
//                 const cantCodigos = codigos.length;

//                 for (let index = 0; index < cantidad;) {
//                     let random = Math.floor(Math.random() * cantCodigos);

//                     if (codigos[random].esPremio === 0) {

//                         codigos[random] = { ...codigos[random], esPremio: 1}

//                         index++;
//                     };

//                 }

//             });

//             const nuevoArrarPremios = premios.map((item) => ({ ...item, idPromocion: id }));
//            const premiosInsertados = await PremioPromocion.bulkCreate(nuevoArrarPremios);

//       //  }


        

//        // cost nuevoArray = codigos.map((item) => ({ ...item, idPromocion: id }));
//         let nuevoArray = [];

//         let premiosCreados = premiosInsertados.map((item) => ({idPremio: item.id, cantidad: item.cantidad, entregados: 0}));
//         let indexact = 0;
        
//         for(const item of codigos) {
//             var newData = {...item, idPromocion: id}

//             if(item.esPremio === 1){
                
//                 newData.idPremioPromocion = premiosCreados[indexact].idPremio;
//                 premiosCreados[indexact].entregados = premiosCreados[indexact].entregados+1;

//                 if(premiosCreados[indexact].cantidad ==premiosCreados[indexact].entregados){
//                     indexact++;
//                 }
                
//             }


//             nuevoArray.push(newData)
            
//         } 

//         console.log(nuevoArrarPremios)



//         await DetallePromocion.bulkCreate(nuevoArray);

//         res.json({ code: 'ok', message: 'Promocion creada ' + estadotext + ' con exito' }); 

//     } catch (error) {
//         console.error(error)
//         res.status(403)
//         res.send({ errors: 'Ha sucedido un  error al intentar Crear la Promocion.' });
//     }

// }


// const AddPromocion = async (req, res) => {
//     try {
//         const {
//             nemonico,
//             nombre,
//             descripcion,
//             mesajeExito,
//             mesajeFail,
//             imgSuccess,
//             imgFail,
//             fechaInicio,
//             fechaFin,
//             PremioXcampania,
//             estado,
//             codigos,
//             premios
//         } = req.body;

//         const estadotext = estado === 3 ? 'en Borrador' : '';
//         const newPromo = await Promocion.create({
//             nemonico,
//             nombre,
//             descripcion,
//             mesajeExito,
//             mesajeFail,
//             imgSuccess,
//             imgFail,
//             fechaInicio,
//             fechaFin,
//             estado,
//             PremioXcampania
//         });

//         const { id } = newPromo.dataValues;

//         premios.forEach(element => {
//             const { cantidad } = element;
//             const cantCodigos = codigos.length;

//             for (let index = 0; index < cantidad;) {
//                 let random = Math.floor(Math.random() * cantCodigos);

//                 if (codigos[random].esPremio === 0) {
//                     codigos[random] = { ...codigos[random], esPremio: 1 };
//                     index++;
//                 }
//             }
//         });

//         const nuevoArrarPremios = premios.map((item) => ({ 
//             ...item, 
//             idPromocion: id, 
//             valor: item.valor || 0 // Proporciona un valor por defecto para 'valor'
//         }));
        
//         const premiosInsertados = await PremioPromocion.bulkCreate(nuevoArrarPremios);

//         let nuevoArray = [];

//         let premiosCreados = premiosInsertados.map((item) => ({
//             idPremio: item.id, 
//             cantidad: item.cantidad, 
//             entregados: 0
//         }));

//         let indexact = 0;

//         for (const item of codigos) {
//             var newData = { 
//                 ...item, 
//                 idPromocion: id, 
//                 cupon: item.cupon || '' // Proporciona un valor por defecto para 'cupon'
//             };

//             if (item.esPremio === 1) {
//                 newData.idPremioPromocion = premiosCreados[indexact].idPremio;
//                 premiosCreados[indexact].entregados = premiosCreados[indexact].entregados + 1;

//                 if (premiosCreados[indexact].cantidad === premiosCreados[indexact].entregados) {
//                     indexact++;
//                 }
//             }

//             nuevoArray.push(newData);
//         }

//         await DetallePromocion.bulkCreate(nuevoArray);

//         res.json({ code: 'ok', message: 'Promocion creada ' + estadotext + ' con exito' });

//     } catch (error) {
//         console.error(error);
//         res.status(403).send({ errors: 'Ha sucedido un error al intentar Crear la Promocion.' });
//     }
// }

const AddPromocion = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const {
            nemonico,
            nombre,
            descripcion,
            mesajeExito,
            mesajeFail,
            imgSuccess,
            imgFail,
            fechaInicio,
            fechaFin,
            PremioXcampania,
            estado,
            codigos,
            premios
        } = req.body;

        const estadotext = estado === 3 ? 'en Borrador' : '';

        // Creación de la promoción
        const newPromo = await Promocion.create({
            nemonico,
            nombre,
            descripcion,
            mesajeExito,
            mesajeFail,
            imgSuccess,
            imgFail,
            fechaInicio,
            fechaFin,
            estado,
            PremioXcampania
        });
        console.log('Nueva promoción creada:', newPromo);

        const { id } = newPromo.dataValues;
        console.log('ID de la nueva promoción:', id);

        // Asignación de premios a los códigos
        premios.forEach(element => {
            const { cantidad } = element;
            const cantCodigos = codigos.length;

            for (let index = 0; index < cantidad;) {
                let random = Math.floor(Math.random() * cantCodigos);

                if (codigos[random].esPremio === 0) {
                    codigos[random] = { ...codigos[random], esPremio: 1 };
                    index++;
                }
            }
        });
        console.log('Códigos actualizados:', codigos);

        const nuevoArrarPremios = premios.map((item) => ({
            ...item,
            idPromocion: id,
            valor: item.valor || 0, // Proporciona un valor por defecto para 'valor'
            nombre: item.nombre || 'Desconocido' // Proporciona un valor por defecto para 'nombre'
        }));
        console.log('Array de premios a insertar:', nuevoArrarPremios);

        // Inserción de premios en la base de datos
        const premiosInsertados = await PremioPromocion.bulkCreate(nuevoArrarPremios);
        console.log('Premios insertados:', premiosInsertados);

        let nuevoArray = [];

        let premiosCreados = premiosInsertados.map((item) => ({
            idPremio: item.id,
            cantidad: item.cantidad,
            entregados: 0
        }));

        let indexact = 0;

        for (const item of codigos) {
            var newData = {
                ...item,
                idPromocion: id,
                cupon: item.cupon || '' // Proporciona un valor por defecto para 'cupon'
            };

            if (item.esPremio === 1) {
                newData.idPremioPromocion = premiosCreados[indexact].idPremio;
                premiosCreados[indexact].entregados = premiosCreados[indexact].entregados + 1;

                if (premiosCreados[indexact].cantidad === premiosCreados[indexact].entregados) {
                    indexact++;
                }
            }

            nuevoArray.push(newData);
        }
        console.log('Array de detalles a insertar:', nuevoArray);

        await DetallePromocion.bulkCreate(nuevoArray);
        console.log('Detalles de la promoción insertados');

        res.json({ code: 'ok', message: 'Promocion creada ' + estadotext + ' con exito' });

    } catch (error) {
        console.error('Error en AddPromocion:', error);
        res.status(403).send({ errors: 'Ha sucedido un error al intentar Crear la Promocion.' });
    }
};






//controllador para actualizar Columnaes
const PausarPromocion = async (req, res) => {

    try {
        const { id } = req.params;
        await Promocion.update({
            estado: 2
        }, {
            where: {
                id: id
            }
        });
        res.json({ code: 'ok', message: 'Promocion pausada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar pausar la Promocion.' });
    }

}


//controllador para actualizar Columnaes
const ActivarPromocion = async (req, res) => {

    try {
        const { id } = req.params;
        await Promocion.update({
            estado: 1
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Promocion activada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar activar la Promocion.' });
    }

}

//controllador para actualizar Columnaes
const UpdatePromocion = async (req, res) => {

    try {
        const { nombre, nemonico, descripcion, mesajeExito, mesajeFail, fechaInicio, fechaFin } = req.body;
        console.log(req.body)
        const { id } = req.params
        await Promocion.update({
            nemonico,
            nombre,
            descripcion,
            mesajeExito,
            mesajeFail,
            fechaInicio,
            fechaFin
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Promocion actualizada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Promocion.' });
    }

}

const GetPromocionById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Promocion.findByPk(id, {
            include: [
                { model: DetallePromocion },
                { 
                    model: PremioPromocion,
                    include: [Premio]
                }
            ]
        });
        console.log(project)
        res.json(project)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un error al intentar consultar las Promociones.' });
    }
}


    //eliminado logico de Promociones
    const DeletePromocion = async (req, res) => {
        try{
    
            const {id} = req.params;
            console.log(id);
    
            await Promocion.update({
                estado: 0
            }, {
                where: {
                    id: id
                }
            });
    
            res.json({code: 'ok', message: 'Promocion inhabilitado con exito.'});
    
        } catch (e) {
            res.status(403);
            res.send({errors: 'Ha ocurrido un error al intentar inhabilitar la promocion.'});
        }
    }

const TestearCodigo = async (req, res) => {
    const { cupon } = req.body;
    const cantidadCupones = await DetallePromocion.count({
        where: {
            cupon: cupon
        }
    });

    //code 03  cupon no existe
    //code 04  promocion vencida o eliminada
    //code 05  Cupon ya Cangeado
    //code 01 cupon valido
    //code 02 cupon no valido

    if (cantidadCupones === 0) {
        res.json(
            {
                code: '03',
                messagge: 'Lo sentimos, el cupon no existe o no esta disponible.'
            })

    }else{
        const cuponDentroActivo = await Promocion.count({
            include: {
                model: DetallePromocion,
                where: {
                    cupon: cupon
                }
            },
            where: {
                estado: 1,
                fechaInicio: {
                     [Op.lte]: new Date(),
                },
                 fechaFin: {
                     [Op.gte]: new Date(),
                }
            }
        });
    
        console.log('cuponDentroActivo', cuponDentroActivo)
    
        if (cuponDentroActivo === 0) {
            res.json(
                {
                    code: '04',
                    messagge: 'Lo sentimos, La Promocion ha caducado.'
                })
    
        } else {
            const promoxionx = await Promocion.findOne({
                include: {
                    model: DetallePromocion,
                    where: {
                        cupon: cupon
                    }
                }
            });
    
    
            const datax = promoxionx.dataValues;
    
            const detallePromocions = datax.detallepromocions;
            const cuponValido = detallePromocions[0].dataValues;
            if (datax.estado === 2) {
                res.json(
                    {
                        code: '05',
                        messagge: 'Lo sentimos este cupon ya ha sido cangeado.',
                        data: {}
                    })
            } else {
                 if (cuponValido.esPremio === 0) {
    
                    res.json(
                        {
                            code: '02',
                            messagge: datax.mesajeFail,
                            data: {
                                imgFail: datax.imgFail,
                                promocion: datax.nombre,
                                nemonico: datax.nemonico,
                                descripcion: datax.descripcion,
                            }
                        }
                    )
    
                } else {
    
                    res.json(
                        {
                            code: '01',
                            messagge: datax.mesajeExito,
                            data: {
                                imgFail: datax.imgSuccess,
                                promocion: datax.nombre,
                                nemonico: datax.nemonico,
                                descripcion: datax.descripcion,
                            }
                        })
                }
            }
    
    
        }
    
    }

}

module.exports = { GetPromocion, AddPromocion, PausarPromocion, ActivarPromocion, UpdatePromocion, DeletePromocion, GetPromocionById, TestearCodigo }
