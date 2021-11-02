const pohText = document.getElementById("poh-text");
const costAccountant = document.getElementById("cost-accountant");
const costPolicemanatee = document.getElementById("cost-policemanatee");
const manateeLevel = document.getElementById("manatee-level");
const leaderboardPlace = document.getElementById("leaderboardPlace");
const buyButton = document.querySelectorAll(".buy-button")

//TODO: insert variable declarations for db info

// function pointsIncreaser() {
//     let clickValue
//     if (!accountantLevel) {
//         clickValue = 1;
//         return clickValue;
//     } else if (accountantLevel && !policemanateeLevel) {
//         clickValue = 1 * accountantLevel
//     } else clickValue = (1 * accountantLevel) + (100 * policemanateeLevel)
//     manateeLevel.innerHTML = "Manatee Level: " + clickValue
// }

buyButton.forEach((el)=>{el.addEventListener("click", (event) => {
    event.preventDefault()
    const id = el.id
    console.log(id)
    if (poh >= (10 * (accountantLevel + 1))) {
        if (!accountant) {
            fetch("/api/manatees"), {
                method: "POST",
                body: JSON.stringify({
                    manatee_id: id,
                    count: 1
                })
            }
        } else {
            fetch(`/api/usermanatees/`, {
                method: "PUT",
                body: JSON.stringify({
                    manatee_id:id
                })
            })
        }
    }
})})

function buyPolicemanatee() {
    // TODO: if statement where if User doesnt have an policemanatee, then to create one. Else, to increment the number in UserManatee by 1
}

function playSound() {
    // plays feel-good sound when clicking the buttons
}