let pointsOnHandText = document.getElementById("poh-text");
let costAccountant = document.getElementById("cost-accountant");
let costPolicemanatee = document.getElementById("cost-policeman");
let costLawyer = document.getElementById("cost-lawyer");
let costUnicorn = document.getElementById("cost-unicorn");
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
            const userId = data.id 
            tempId = userId

            accountantLevel = data.manatees[0].user_manatee.count
            policemanateeLevel = data.manatees[1].user_manatee.count
            lawyerLevel = data.manatees[2].user_manatee.count
            unicornLevel = data.manatees[3].user_manatee.count
            clickValue = accountantLevel + (policemanateeLevel * 10) + (unicornLevel * 100)+ (lawyerLevel * 1000)

            manateeLevel.innerHTML = clickValue
            const lifetimePoints = data.lifetime_points
            lifetimePointsText.innerHTML = lifetimePoints
            pointsOnHand = data.points_on_hand
            pointsOnHandText.value = pointsOnHand
            
            costAccountant.innerHTML = (accountantLevel+1) * 10;
            costPolicemanatee.innerHTML = (policemanateeLevel+1) *100;
            costLawyer.innerHTML = (lawyerLevel+1) *1000;
            costUnicorn.innerHTML = (unicornLevel+1) *10000;

        })
    }

// UPDATE() FUNCTION THAT SAVES THE STATS ON SCREEN TO THE CURRENT NUMBERS
const update = () =>{
        fetch("/api/users/updatepoints", {
        method: "PUT",
        body: JSON.stringify({
            points_on_hand: pointsOnHandText.value,
            lifetime_points:lifetimePointsText.innerHTML
        }),
        headers:{"Content-Type":"application/json"}
    })
    .then(response=>{
        onLoad();
    })
}

// MANATEE BUTTON THAT ADDS TO SCORE
document.getElementById("click-button").addEventListener("click", ()=>{
    const power = Number(manateeLevel.innerHTML)+1
    lifetimePointsText.innerHTML = Number(lifetimePointsText.innerHTML) + (power)
    pointsOnHandText.value = Number(pointsOnHandText.value) + (power)
    update()
});

// FUNCTION THAT HANDLES THE PURCHASE OF NEW MANATEES
buyButton.forEach((el)=>{el.addEventListener("click", (event) => {
    event.preventDefault()
    const id = el.id    
    let cost = Number(el.parentElement.lastElementChild.innerHTML)

    if (Number(pointsOnHandText.value) >= cost) {
            fetch(`/api/usermanatees`, {
                method: "PUT",
                body: JSON.stringify({
                    manatee_id:id,
                }),
                headers:{"Content-Type":"application/json"}
            })
            pointsOnHandText.value= pointsOnHandText.value - cost
            update()
        }
    }
)})


onLoad()