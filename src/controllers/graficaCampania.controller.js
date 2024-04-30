const { sequelize } = require("../database/database");

const ObtenerParticipacionesByFecha = async (req, res) => {
  const { anio, mes } = req.body;

  try {
    console.log(req.body);

    const participantes = await sequelize.query(
      `SELECT p.idCampania,c.nombre, 
      COUNT(p.idCampania) as participantes 
      FROM participacions p
      JOIN campania c ON c.id  = p.idCampania  
      WHERE YEAR(p.fecha) = :anio
      AND  MONTH(p.fecha) = :mes
      GROUP BY p.idCampania,c.nombre;
      `,
      {
        replacements: { anio: anio, mes: mes },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.json(participantes)
  } catch (error) {
    console.error("Error al obtener los participantes por año y mes:", error);
    throw error;
  }
};

const ObtenerAnio = async (req, res) => {
    try {
      const anios = await sequelize.query(
        `SELECT YEAR(fecha) anioValido
         FROM participacions 
         GROUP BY YEAR(fecha);`,
         {
           type: sequelize.QueryTypes.SELECT,
         }
      );
      
      res.json(anios);
    } catch (error) {
      console.error("Error al obtener años válidos:", error);
      throw error;
    }
  };

  const ObtenerMes = async (req, res) => {    
    const { anioValido } = req.body;

    console.log(anioValido);

    try {      
      const meses = await sequelize.query(
        `SELECT MONTH(fecha) mesValido
         FROM participacions
          WHERE YEAR(fecha) = :anioValido 
          GROUP BY MONTH(fecha)
        `,
        {
          replacements: { anioValido: anioValido },
          type: sequelize.QueryTypes.SELECT,
        }
      );
      res.json(meses)
    } catch (error) {
      console.error("Error al obtener los meses validos:", error);
      throw error;
    }
  };


module.exports = { ObtenerParticipacionesByFecha, ObtenerAnio,ObtenerMes };
