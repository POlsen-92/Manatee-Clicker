const User = require("./User");
const Manatee = require("./Manatee");

User.belongsToMany(Manatee,{
    through: UserManatee,
    foreignKey: 'manatee_bonus',
});

Manatee.belongsTo(User,{
    foreignKey: 'manatee_bonus',
})

module.exports={
    User,
    Manatee,
};