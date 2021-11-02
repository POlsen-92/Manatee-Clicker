let pointsOnHandText = document.getElementById("poh-text");
const costAccountant = document.getElementById("cost-accountant");
const costPolicemanatee = document.getElementById("cost-policemanatee");
const manateeLevel = document.getElementById("manatee-level");
const leaderboardPlace = document.getElementById("leaderboardPlace");
const buyButton = document.querySelectorAll(".buy-button");
let lifetimePointsText = document.getElementById("lifetime-points");

let tempLifetimePoints
let tempPointsOnHand
let tempClickValue
let tempId

// grabs all api info, and puts all info on page when loaded
const onLoad = () => {
    fetch("/api/users/info")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            const userId = data.id 
            tempId = userId

            const accountantLevel = data.manatees[0].user_manatee.count
            const policemanateeLevel = data.manatees[1].user_manatee.count
            const unicornLevel = data.manatees[3].user_manatee.count
            const lawyerLevel = data.manatees[2].user_manatee.count
            const clickValue = policemanateeLevel + accountantLevel+ unicornLevel+ lawyerLevel
            manateeLevel.innerHTML = clickValue
            tempclickValue = clickValue

            const lifetimePoints = data.lifetime_points
            lifetimePointsText.innerHTML = lifetimePoints
            tempLifetimePoints = lifetimePoints

            pointsOnHand = data.points_on_hand
            pointsOnHandText.value = pointsOnHand
            tempPointsOnHand=  pointsOnHand
            
        })
    }
    
    console.log(tempPointsOnHand+tempClickValue)
console.log(tempLifetimePoints)
console.log(tempClickValue)

// const add = ()=>{
//     pointsOnHandText.innerHTML = 
// }

const add = ()=>{
    fetch("api/users/updatepoints/"), {
        method: "PUT",
        body: JSON.stringify({
            points_on_hand: 100000,
            lifetime_points:1000000
        }),
        headers:{"Content-Type":"application/json"}
    }
}

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

onLoad()
