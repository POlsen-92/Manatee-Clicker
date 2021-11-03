const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

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
    accountantCost: {
      type: DataTypes.INTEGER,
      defaultValue:10
    },
    policeManateeCost: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    },
    lawyerCost: {
      type: DataTypes.INTEGER,
      defaultValue: 500
    },
    unicornCost: {
      type: DataTypes.INTEGER,
      defaultValue: 1000
    }
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
