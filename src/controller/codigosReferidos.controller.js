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

    const {username} = req.body;
    try {



        const codigo = await codigoReferidos.findOne(
            {where: {
                username: username,
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
                username
            });

            res.json(codigo);

        }

        
    } catch (error) {
        console.error(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de Categoria.' });
    }
}

module.exports = {getCodigoReferido}