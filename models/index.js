const User = require("./User");
const Level = require("./ManateeLevel");

User.belongsTo(ManateeLevel,{
    onDelete:"CASCADE"
});

ManateeLevel.belongsToMany(User,{
    through:"score_requirement"
})

module.exports={
    User,
    ManateeLevel,
};