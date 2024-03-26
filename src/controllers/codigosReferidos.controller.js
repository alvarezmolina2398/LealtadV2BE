const { codigoReferidos } = require('../models/codigoReferidos');


const generarCodigoReferido = () => {
    let codigo = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const characterLength = characters.length;

    for (let i= 0; i<=10; i++){

        codigo += characters.charAt(Math.floor(Math.random() * characterLength));

    }

    return codigo;
}

const getCodigoReferido = async (req,res) => {

    const {customerId} = req.body;
    try {



        const codigo = await codigoReferidos.findOne(
            {where: {
                customerId: customerId,
                estado: 1
            }, attributes:['codigo']}
        )

        if(codigo !== null){

            res.json(codigo);

        } else{

            const codigo = generarCodigoReferido()
            const fecha = new Date();

            await codigoReferidos.create({
                codigo,
                fecha,
                customerId
            });

            res.json(codigo);

        }

        
    } catch (error) {
        console.error(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de Categoria.' });
    }
}

const getCodigoReferidoByPhone = async (phone) => {
    
}


const actualizarCodigoReferido = async (idReferido, nuevoCodigo) => {
    try {
        const cod = await CodigoReferido.findByPk(idReferido);
        if (!cod) {
            throw new Error('El código referido especificado no existe');
        }

        // Actualiza el campo `codigo` con el nuevo código
        cod.codigo = nuevoCodigo;

        // Guarda los cambios en la base de datos
        await cod.save();

        return { status: true, message: 'Datos guardados exitosamente.' };
    } catch (error) {
        return { status: false, message: 'Error modificando registro: '  + error.message };
    }
};

module.exports = {getCodigoReferido, actualizarCodigoReferido}