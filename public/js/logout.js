const signOut = document.getElementById('signoutbtn')

//This script enables the signout functionality 
signOut.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('/api/users/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }).then(res=> {
    if(res.ok){
        alert("You Have Been Signed Out")
        location.replace('/login')
    } else {
        alert("something went wrong")
    }
})
})
