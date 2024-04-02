const { DataTypes } = require('sequelize');
const { sequelize, pronet } = require('../database/database');

// Modelos para la primera base de datos
const EncCampana = sequelize1.define('enc_campana', {
  nombreCampana: DataTypes.STRING,
  descripcionNotificacion: DataTypes.STRING,
});

const ParticipanteCampana = sequelize1.define('participante_campana', {
  fechaParticipacion: DataTypes.DATE,
  idTransaccion: DataTypes.INTEGER,
  idCampana: DataTypes.INTEGER,
  idUsuarioParticipante: DataTypes.INTEGER,
  descTransaccion: DataTypes.STRING,
  valorPremio: DataTypes.DECIMAL,
});

// Modelos para la segunda base de datos
const TblCustomer = pronet.define('tbl_customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  fk_userid: DataTypes.INTEGER,
});

const TblUserInformation = pronet.define('tblUserInformation', {
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  fname: DataTypes.STRING,
  lname: DataTypes.STRING,
});

const ReferidosIngresos = pronet.define('referidos_ingresos', {
  idreferidos_ingresos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  usuario: DataTypes.INTEGER,
});

const CodigosReferidos = pronet.define('codigos_referidos', {
  idcodigos_referidos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  codigo: DataTypes.STRING,
  idconfi_referidos: DataTypes.INTEGER,
});

const ConfiReferidos = pronet.define('confi_referidos', {
  idconfi_referidos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  opcion: DataTypes.STRING,
});
ParticipanteCampana.belongsTo(EncCampana, { foreignKey: 'idCampana' });
ParticipanteCampana.belongsTo(TblCustomer, { foreignKey: 'idUsuarioParticipante' });
ParticipanteCampana.belongsTo(ReferidosIngresos, { foreignKey: 'idTransaccion' });
ReferidosIngresos.belongsTo(CodigosReferidos, { foreignKey: 'idcodigosreferidos' });
CodigosReferidos.belongsTo(ConfiReferidos, { foreignKey: 'idconfireferidos' });
ReferidosIngresos.belongsTo(TblCustomer, { foreignKey: 'usuario' });
TblCustomer.belongsTo(TblUserInformation, { foreignKey: 'fk_userid' });
ReferidosIngresos.belongsTo(TblUserInformation, { foreignKey: 'usuario' });