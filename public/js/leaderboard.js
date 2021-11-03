const leaderboardEl = document.getElementById('leaderboard-content');


// this function will get all users and sort them by lifetime score
async function getTopUsers(){

    const usersArray = [];

    usersArray = await fetch('api/users/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    usersArray.sort((a,b) =>{

        return b.lifetime_points - a.lifetime_points;

    });
    //returning an array of users sorted in descending order by lifetime score
    return usersArray;

}

//variable will contain the sorted array of users
const topUsers = getTopUsers();



for (let j = 0; j < topUsers.length; j++){

    //this variable is the user position in the leaderboard
    let k = j++;
    //creating the rows that will go inside the table body
    let toplistEl = document.createElement('tr');
    //adding the content to the rows with the user's data
    let toplistContentEL.innerHTML=`
<th scope="row" class="col-2">${k}</th>
<td class="col-2">${topUsers.[j].username}</td>
<td class="col-2">${topUsers.[j].lifetime_points}</td>
`;

//appending the rows to the table body
leaderboardEl.appendChild(toplistEl);

}