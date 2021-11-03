const scorerank = require('scorerank');

const url = 'redis://127.0.0.1:6379';
const options = { prefix: 'scores' };
 
const score = scorerank(url, options);

const usersArray = [];

async function getUsers(){

    const usersArray = await fetch('api/users/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    return usersArray;

}

usersArray = getUsers();

console.log(usersArray);

