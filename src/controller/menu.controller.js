const { Menu } = require('../models/menu');

//controllador paa obtener la lista de Columnaes
const GetMenus = async (req, res) => {
    try {
        const trx = await Menu.findAll({
            where: {
                estado: 1
            }
        })
        res.json(trx)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar obtener la lista de menus.' });
    }
}