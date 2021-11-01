const { Manatee } = require('../models');

const seedManatees = async () => {
    const manateeData = await Manatee.bulkCreate([
        {
            name:"Accountant",
            manatee_bonus: ['1','3','4']
        },
        {
            name:"PoliceMan",
            manatee_bonus: '4'
        },
        {
            name:"Lawyer",
            manatee_bonus: '3'
        },
        {
            name:"Unicorn",
            manatee_bonus: '2'
        },
    ],{
        individualHooks:true
    });
}
 

module.exports = seedManatees;
