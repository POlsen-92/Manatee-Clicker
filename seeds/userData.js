const { User } = require('../models');

const seedUsers = async () => {
  const userData = await User.bulkCreate([
    {
      username: 'POlsen92',
      password: 'password',
      lifetime_points: ,
      points_on_hand: ,
      manatee_bonus: [1,2,3,3],

    },
    {
      username: 'Specsnstats',
      password: 'password',
      lifetime_points: ,
      points_on_hand: ,
      manatee_bonus: [1,1,2],
    },
    {
      username: 'jmarq019',
      password: 'password',
      lifetime_points: ,
      points_on_hand: ,
      manatee_bonus: [1,1],
    },
    {
      username: 'chloeharris1',
      password: 'password',
      lifetime_points: ,
      points_on_hand: ,
      manatee_bonus: [1,2,2,3,4],
    },
  ], {
    individualHooks: true,
    returning: true,
  });
}

module.exports = seedUsers;