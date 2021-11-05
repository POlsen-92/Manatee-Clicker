const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

//The UserManatee model is a relational table of the User and Manatee models

class UserManatee extends Model {}

UserManatee.init(
  {
    manatee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'manatee',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
      },
    count: {
      type:DataTypes.INTEGER,
      defaultValue: 0
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_manatee',
  }
);

module.exports = UserManatee;
