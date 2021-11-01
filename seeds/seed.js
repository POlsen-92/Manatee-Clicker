const sequelize = require('../config/connection');
const User = require('../models/User');
const seedUsers = require('./userData');
const seedManatees = require('./manateeData')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers()
  console.log('\n----- USERS SEEDED -----\n');

  await seedManatees()
  console.log('\n----- MANATEES SEEDED -----\n');

  process.exit(0);
};

seedDatabase();