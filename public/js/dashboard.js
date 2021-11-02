const pointsOnHandText = document.getElementById("poh-text");
const costAccountant = document.getElementById("cost-accountant");
const costPolicemanatee = document.getElementById("cost-policemanatee");
const manateeLevel = document.getElementById("manatee-level");
const leaderboardPlace = document.getElementById("leaderboardPlace");
const buyButton = document.querySelectorAll(".buy-button");
const lifetimePointsText = document.

//TODO: insert variable declarations for db info
const update = () => {
    fetch("/api/users/info")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)

            // const accountantLevel = data.manatees[0].user_manatee.count
            // const policemanateeLevel = data.manatees[1].user_manatee.count
            // const lawyerLevel = data.manatees[2].user_manatee.count
            // const clickValue = policemanateeLevel + accountantLevel+ lawyerLevel
            // manateeLevel.innerHTML = clickValue

            const lifetimePoints = data.lifetime_points
            lifetimePointsText.innerHTML = lifetimePoints

            pointsOnHand = data.points_on_hand
            pointsOnHandText.innerHTML = pointsOnHand
        })
}
update()

// const add = ()=>{
//     lifetimePoints = lifetimePoints + bonusTotal
//     lifetimePointsText.innerHTML = lifetimePoints

//     pointsOnHand = pointsOnHand + bonusTotal
//     pointsOnHandText.value = pointsOnHand
// }

// buyButton.forEach((el)=>{el.addEventListener("click", (event) => {
//     event.preventDefault()
//     const id = el.id
//     console.log(id)
//     if (poh >= (10 * (accountantLevel + 1))) {
//         if (!accountant) {
//             fetch("/api/manatees"), {
//                 method: "POST",
//                 body: JSON.stringify({
//                     manatee_id: id,
//                     count: 1
//                 }),
//                 headers:{"Content-Type":"application/json"}
//             }
//         } else {
//             fetch(`/api/usermanatees/`, {
//                 method: "PUT",
//                 body: JSON.stringify({
//                     manatee_id:id
//                 }),
//                 headers:{"Content-Type":"application/json"}
//             })
//         }
//     }
// })})