const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserManatee extends Model {}

UserManatee.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    manatee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'manatee',
        key: 'id'
      }
    },
    manatee_bonus: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
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
