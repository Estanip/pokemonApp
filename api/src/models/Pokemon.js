const { DataTypes, Sequelize } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemons', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER
    },
    force: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  })
};