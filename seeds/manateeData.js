const { Manatee } = require('../models');

const seedManatees = async () => {
    const manateeData = await Manatee.bulkCreate([
        {
            name:"Accountant",
            manatee_bonus: 1
        },
        {
            name:"PoliceMan",
            manatee_bonus: 2
        },
        {
            name:"Lawyer",
            manatee_bonus: 3
        },
        {
            name:"Unicorn",
            manatee_bonus: 4
        },
    ],{
        individualHooks:true
    });
}
 

module.exports = seedManatees;
