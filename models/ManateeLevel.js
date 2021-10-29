const User = require('./User');

class ManateeLevel extends Model { }

ManateeLevel.init(
    {
        score_requirement: {
            type: DataTypes.INTEGER,
            default: 0
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'level'
    }
);

module.exports = ManateeLevel;