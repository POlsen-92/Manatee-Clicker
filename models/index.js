const User = require("./User");
const Manatee = require("./Manatee");
const UserManatee = require("./UserManatee");

User.belongsToMany(Manatee,{
    through: UserManatee,
    unique: false,
    foreignKey: 'user_id',
});

Manatee.belongsToMany(User,{
    through: UserManatee,
    unique: false,
    foreignKey: 'manatee_id',
})

module.exports={
    User,
    Manatee,
    UserManatee
};