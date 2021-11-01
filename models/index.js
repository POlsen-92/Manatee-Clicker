const User = require("./User");
const Manatee = require("./Manatee");

User.hasMany(Manatee,{
    foreignKey: manatee_bonus,
    onDelete:"CASCADE"
});

Manatee.belongsTo(User,{
    foreignKey: manatee_bonus,
})

module.exports={
    User,
    Manatee,
};