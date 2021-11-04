const { Manatee } = require('../models');

const seedManatees = async () => {
    const manateeData = await Manatee.bulkCreate([
        {
            name:"Accountant",
        },
        {
            name:"PoliceMan",
        },
        {
            name:"Lawyer",
        },
        {
            name:"Unicorn",
        },
    ],{
        individualHooks:true
    });
}
 

module.exports = seedManatees;
