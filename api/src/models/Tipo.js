const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    // Tipo model
    sequelize.define('tipos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: false
    })
};

