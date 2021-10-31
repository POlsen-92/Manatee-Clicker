const User = require("./User");
const ManateeLevel = require("./ManateeLevel");

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