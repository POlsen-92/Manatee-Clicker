const User = require("./User");
const Level = require("./ManateeLevel");

User.belongsTo(ManateeLevel,{
    onDelete:"CASCADE"
});

Level.belongsToMany(User,{
    through:"score_requirement"
})

module.exports={
    User,
    Level,
};