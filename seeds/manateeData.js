const { Manatee } = require('../models');

const seedManatees = async () => {
    const manateeData = await Manatee.bulkCreate([
        {
            id: 1,
            name:"Accountant Manatee"
        },
        {
            id: 2,
            name:"PoliceManatee",
        },
        {
            id: 3,
            name:"Judge Manatee",
        },
        {
            id: 4,
            name:"Rainbow Manatee",
        },
    ],{
        individualHooks:true
    });
}
 

module.exports = seedManatees;
