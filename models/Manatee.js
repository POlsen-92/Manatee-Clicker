const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Manatee extends Model { }

Manatee.init(
    {   
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        manatee_bonus: {//score evaluation
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'manatee'
    }
);

module.exports = Manatee;

