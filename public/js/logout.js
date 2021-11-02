const signOut = document.getElementById('signoutbtn')

signOut.addEventListener('click', async (e) => {
    e.preventDefault()

    const signout = await fetch('/api/users/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    if(signout.ok){
        console.log(signout)
        location.replace('/login')
    } else {
        alert("something went wrong")
    }
})
