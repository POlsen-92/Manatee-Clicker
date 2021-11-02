const { UserManatee } = require('../models');

const seedUserManatees = async () => {
  const userManateeData = await UserManatee.bulkCreate([
    {
    user_id: 1,
    manatee_id: 4,
    count: 2
    },
    {
    user_id: 1,
    manatee_id: 3,
    count:4
    },
    {
    user_id: 2,
    manatee_id: 1,
    count: 6
    },
    {
    user_id: 2,
    manatee_id: 2,
    count: 6
    },
    {
    user_id: 2,
    manatee_id: 3,
    count: 6
    },
    {
    user_id: 2,
    manatee_id: 4,
    count: 6
    },
    {
    user_id: 3,
    manatee_id: 2,
    count: 1
    },
    {
    user_id: 4,
    manatee_id: 1,
    count: 0
    },
  ], {
    individualHooks: true,
    returning: true,
  });
}

module.exports = seedUserManatees;