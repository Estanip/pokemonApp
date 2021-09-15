const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    // Tipo model
    sequelize.define('tipo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    })
};

