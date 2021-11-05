const signOut = document.getElementById('signoutbtn')

//This script enables the signout functionality 
signOut.addEventListener('click', async (e) => {
    e.preventDefault()

    const signout = await fetch('/api/users/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    if(signout.ok){
        alert("You Have Been Signed Out")
        location.replace('/login')
    } else {
        alert("something went wrong")
    }
})
