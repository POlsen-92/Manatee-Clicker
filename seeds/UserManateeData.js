const { UserManatee } = require('../models');

const seedUserManatees = async () => {
  const userManateeData = await UserManatee.bulkCreate([
    {
    user_id: 1,
    manatee_id: 4,
    },
    {
    user_id: 1,
    manatee_id: 3,
    },
    {
    user_id: 2,
    manatee_id: 3,
    },
    {
    user_id: 3,
    manatee_id: 2,
    },
    {
    user_id: 4,
    manatee_id: 1,
    },
  ], {
    individualHooks: true,
    returning: true,
  });
}

module.exports = seedUserManatees;