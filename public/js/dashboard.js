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

// RELOAD PAGE ON EVERY 5 CLICKS
var timesClicked = 0
const buttonOnScreen = document.querySelectorAll(".button-on-screen")
buttonOnScreen.forEach(button=>{

    button.addEventListener("click", ()=>{
        console.log("button clicked")
        timesClicked++
        console.log(timesClicked)
        if(timesClicked == 5){
            location.reload()
        }
    })
})


// push info outside of the function to use and change it
// based off of the level of each manatee, determine the cost of that manatee for the user
// save that cost to a variable
// display that cost onto the page
// use that cost in the second function for deducting Points on Hand




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

            accountantLevel = data.manatees[0].user_manatee.count
            policemanateeLevel = data.manatees[1].user_manatee.count
            unicornLevel = data.manatees[3].user_manatee.count
            lawyerLevel = data.manatees[2].user_manatee.count
            clickValue = (policemanateeLevel * 10) + accountantLevel + (unicornLevel* 100)+ (lawyerLevel * 100000)

            manateeLevel.innerHTML = clickValue
            const lifetimePoints = data.lifetime_points
            lifetimePointsText.innerHTML = lifetimePoints
            pointsOnHand = data.points_on_hand
            pointsOnHandText.value = pointsOnHand
            
            costAccountant.innerHTML = (accountantLevel+1) * 10
            costPolicemanatee.innerHTML = (policemanateeLevel+1) *1000
            costLawyer.innerHTML = (lawyerLevel+1) *100000
            costUnicorn.innerHTML = (unicornLevel+1) *1000

        })
    }

// UPDATE() FUNCTION THAT SAVES THE STATS ON SCREEN TO THE CURRENT NUMBERS
const update = ()=>{
    // console.log()
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
// document.getElementById("save-button").addEventListener("click", ()=>{
//     update()
//     alert("Stats Saved!")
// })

// MANATEE BUTTON THAT ADDS TO SCORE
document.getElementById("click-button").addEventListener("click", ()=>{
    const power = Number(manateeLevel.innerHTML)+1
    console.log(`clickpower:${power}`)
    lifetimePointsText.innerHTML = Number(lifetimePointsText.innerHTML) + (power)
    pointsOnHandText.value = Number(pointsOnHandText.value) + (power)
    update()
});

// FUNCTION THAT HANDLES THE PURCHASE OF NEW MANATEES
buyButton.forEach((el)=>{el.addEventListener("click", (event) => {
    event.preventDefault()
    const id = el.id    
    let cost = Number(el.parentElement.lastElementChild.innerHTML)

    console.log("Cost = "+cost)
    console.log("Points on Hand = " +pointsOnHandText.value)
    if (Number(pointsOnHandText.value) > cost) {
        console.log("========STARTING FETCH============")
            fetch(`/api/usermanatees`, {
                method: "PUT",
                body: JSON.stringify({
                    manatee_id:id,
                }),
                headers:{"Content-Type":"application/json"}
            })
            console.log("=============FETCH COMPLETE==========")
            pointsOnHandText.value= pointsOnHandText.value - cost
            console.log(`cost:${cost}`)
            update()
            onLoad()
        }
    }
)})


onLoad()
// window.setInterval(update, 5000)
