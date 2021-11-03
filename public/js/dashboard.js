let pointsOnHandText = document.getElementById("poh-text");
const costAccountant = document.getElementById("cost-accountant");
const costPolicemanatee = document.getElementById("cost-policemanatee");
const manateeLevel = document.getElementById("manatee-level");
const leaderboardPlace = document.getElementById("leaderboardPlace");
const buyButton = document.querySelectorAll(".buy-button");
let lifetimePointsText = document.getElementById("lifetime-points");
let accountantLevel
let policemanateeLevel
let unicornLevel
let lawyerLevel
let clickValueOutside

// GRABS ALL API INFO, AND POPULATES THE PAGE WITH THE INFO
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
            const clickValue = (policemanateeLevel * 10) + accountantLevel + (unicornLevel* 100)+ (lawyerLevel * 50)
            manateeLevel.innerHTML = clickValue
            const lifetimePoints = data.lifetime_points
            lifetimePointsText.innerHTML = lifetimePoints
            pointsOnHand = data.points_on_hand
            pointsOnHandText.value = pointsOnHand
        })
    }

// UPDATE() FUNCTION THAT SAVES THE STATS ON SCREEN TO THE CURRENT NUMBERS
const update = ()=>{
        fetch("/api/users/updatepoints", {
        method: "PUT",
        body: JSON.stringify({
            points_on_hand: pointsOnHandText.value,
            lifetime_points:lifetimePointsText.innerHTML
        }),
        headers:{"Content-Type":"application/json"}
    })
    .then(response=>response.json())
}

// SAVE BUTTON THAT RUNS UPDATE()
document.getElementById("save-button").addEventListener("click", ()=>{
    update()
    alert("Stats Saved!")
})

// MANATEE BUTTON THAT ADDS TO SCORE
document.getElementById("click-button").addEventListener("click", ()=>{
    const power = Number(manateeLevel.innerHTML)+1
    console.log(power)
    lifetimePointsText.innerHTML = Number(lifetimePointsText.innerHTML) + (power)
    pointsOnHandText.value = Number(pointsOnHandText.value) + (power)
});

// FUNCTION THAT HANDLES THE PURCHASE OF NEW MANATEES
buyButton.forEach((el)=>{el.addEventListener("click", (event) => {
    event.preventDefault()
    const id = el.id
    console.log(el)
    let cost = el.parentElement.lastElementChild.innerHTML * accountantLevel
    console.log(cost)
    console.log(el.parentElement.lastElementChild.innerHTML)
    if (pointsOnHandText.value >= cost) {
            fetch(`/api/usermanatees`, {
                method: "PUT",
                body: JSON.stringify({
                    manatee_id:id,
                }),
                headers:{"Content-Type":"application/json"}
            })
            console.log("=============FETCH COMPLETE==========")
            pointsOnHandText.value= pointsOnHandText.value - cost
        }
    }
)})

onLoad()