const { UserManatee } = require('../models');

const seedUserManatee = async () => {
  const userManateeData = await UserManatee.bulkCreate([
    {
      manatee_id: '1',
      manatee_bonus: '',
     },
    {
      manatee_id: '1',
      manatee_bonus: '',
     },
    {
      manatee_id: '',
      manatee_bonus: '',
     },
    {
      manatee_id: '',
      manatee_bonus: '',
    },
  ], {
    individualHooks: true,
    returning: true,
  });
}

module.exports = seedUserManatee;