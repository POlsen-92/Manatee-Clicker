const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Manatee extends Model { }

Manatee.init(
    {   
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        }
    },
    {
        sequelize,
        orderBy: ['id', 'ASC'],
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'manatee',
    }
);

module.exports = Manatee;

