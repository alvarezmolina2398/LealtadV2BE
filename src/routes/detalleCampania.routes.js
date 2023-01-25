const { Router } = require('express');
const router = Router();
const{
    getParametrosCampania, 
    getPremiosCampania, 
    getPresupuestoCampania, 
    getPrarametrobyId,
    getPremiobyId,
    getPresupuestobyId,
    UpdateParametro,
    UpdatePremio,
    UpdatePresupuesto,
    UpdateEtapa
} = require('../controller/detallesCampania.controller')

const pathParam = 'parametros';
const pathPremio = 'premios';
const pathPresu = 'presupuesto';
const pathEtapa = 'etapa';

//rutas del proyecto
router.get(`/${pathParam}/:idEtapa`, getParametrosCampania);
router.get(`/${pathPremio}/:idEtapa`, getPremiosCampania);
router.get(`/${pathPresu}/:idEtapa`, getPresupuestoCampania);
router.get(`/${pathParam}/edith/:id`, getPrarametrobyId);
router.get(`/${pathPremio}/edith/:id`, getPremiobyId);
router.get(`/${pathPresu}/edith/:id`, getPresupuestobyId);
router.put(`/${pathParam}/update/:id`, UpdateParametro);
router.put(`/${pathPremio}/update/:id`, UpdatePremio);
router.put(`/${pathPresu}/update/:id`, UpdatePresupuesto);
router.put(`/${pathEtapa}/update/:id`, UpdateEtapa);


module.exports = router;