const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lifeExpectancy: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://pbs.twimg.com/media/D6mH_epWwAAl8Yn.jpg',
    },
  }, { timestamps: false }
  );
};
