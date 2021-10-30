const { User } = require('../models');

const userdata = [
  {
    username: 'POlsen92',
    score: 1000,
  },
  {
    username: 'Specsnstats',
    score: 2000,
  },
  {
    username: 'jmarq019',
    score: 1500,
  },
  {
    username: 'chloeharris1',
    score: 500,
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;