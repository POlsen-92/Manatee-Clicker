const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isAlphanumeric:true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        lifetime_points: {
            type: DataTypes.INTEGER,
            default: 0
        },
        points_on_hand: {
            type: DataTypes.INTEGER,
            default: 0
        },
        bonus_total: {
            type: DataTypes.INTEGER,
            default: 1
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 5);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 5);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = User;