const leaderboardEl = document.getElementById('leaderboard-content');

// MODAL
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("stuff-close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// this function will get all users and sort them by lifetime score
function getTopUsers(){
        fetch('api/users/leaders', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(data => {
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
                //appending the rows to the table body
                leaderboardEl.appendChild(toplistContentEL);
            }

        });
};

getTopUsers();
