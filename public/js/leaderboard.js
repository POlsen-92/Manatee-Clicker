const leaderboardEl = document.getElementById('leaderboard-content');

// this function will get all users and sort them by lifetime score
function getTopUsers(){
           
        fetch('api/users/leaders', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(data => {
            
           console.log(data);
for (let j = 0; j < data.length; j++){
    //this variable is the user position in the leaderboard
    let k = j + 1;
    //creating the rows that will go inside the table body
    let toplistContentEL = document.createElement('tr');
    //adding the content to the rows with the user's data
    toplistContentEL.innerHTML = `
<td class="col-6">${data[j].username}</td>
<td class="col-6">${data[j].lifetime_points}</td>
`
console.log(leaderboardEl)
//appending the rows to the table body
leaderboardEl.appendChild(toplistContentEL);
    }

        });
};

getTopUsers();
