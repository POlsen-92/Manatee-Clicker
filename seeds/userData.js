const { User } = require('../models');

const seedUsers = async () => {
  const userData = await User.bulkCreate([
    {
      username: 'POlsen92',
      password: 'password',
      lifetime_points: 500,
      points_on_hand: 200,
     },
    {
      username: 'Specsnstats',
      password: 'password',
      lifetime_points: 200,
      points_on_hand: 100,
     },
    {
      username: 'jmarq019',
      password: 'password',
      lifetime_points: 300,
      points_on_hand: 250,
     },
    {
      username: 'chloeharris1',
      password: 'password',
      lifetime_points: 500,
      points_on_hand: 400,
    },
  ], {
    individualHooks: true,
    returning: true,
  });
}

module.exports = seedUsers;