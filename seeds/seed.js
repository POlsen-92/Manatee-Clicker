const sequelize = require('../config/connection');
const seedUsers = require('./userData.js');
const seedManatees = require('./manateeData.js');
const seedUserManatees = require('./userManateeData.js')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers()
  console.log('\n----- USERS SEEDED -----\n');

  await seedManatees()
  console.log('\n----- MANATEES SEEDED -----\n');

  await seedUserManatees()
  console.log('\n----- USERMANATEES SEEDED -----\n');

  process.exit(0);
};

seedDatabase();