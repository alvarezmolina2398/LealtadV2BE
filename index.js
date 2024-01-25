const express = require('express');
const {sequelize} = require('./src/database/database');


const app = express();
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE,PATCH');
    next();
});

//Seting
app.set('port', process.env.PORT || 3000);


//declacion de los MiddelWare
app.use(express.json());


app.use(require('./src/routes/transaccion.routes'));
app.use(require('./src/routes/columna.routes'));
app.use(require('./src/routes/categoria.routes'));
app.use(require('./src/routes/promocion.routes'));
app.use(require('./src/routes/departamento.routes'));
app.use(require('./src/routes/municipio.routes'));
app.use(require('./src/routes/rol.routes'));
app.use(require('./src/routes/terceros.routes'));
app.use(require('./src/routes/premio.routes'));
app.use(require('./src/routes/usuario.routes'));
app.use(require('./src/routes/campania.routes'));
app.use(require('./src/routes/detalleCampania.routes'));
app.use(require('./src/routes/menu.routes'));
app.use(require('./src/routes/pagina.routes'));
app.use(require('./src/routes/permisoUsuario.routes'))
app.use(require('./src/routes/cangepromocion.routes'))
app.use(require('./src/routes/asignarCategoria.routes'));
app.use(require('./src/routes/codigoReferidos.routes'));
app.use(require('./src/routes/participacionReferidos.routes'));
app.use(require('./src/routes/participacion.routes'));
app.use(require('./src/routes/premiacion.routes'));
//app.use(require('./src/routes/reportePromocion.routes'));
app.use(require('./src/routes/reporteReferidos.routes'));
app.use(require('./src/routes/loggin.routes'));
app.use(require('./src/routes/trxCampanias.routes'))


//corremos el servidor
app.listen(app.get('port'), () => {
    console.log('Server Running on Port: ' + app.get('port'));
    
}); 