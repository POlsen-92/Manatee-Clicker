const chngeUN = document.getElementById('chngUN-form')
const chngePW = document.getElementById('chngPW-form')
const deleteUser = document.getElementById('btnDel')

//this script controls updating username for user
chngeUN.addEventListener('submit', async (e) => {
    e.preventDefault()

    const newUN = document.getElementById('newUN').value
    const curPW = document.getElementById('currentPW1').value
    
    if(newUN && curPW){
        const resp = await fetch('/api/users/updateUN', {
            method: 'PUT',
            body: JSON.stringify({username:newUN, password:curPW}),
            headers: { 'Content-Type': 'application/json' }
        })
        if(resp.ok){
            alert("Username has Been Changed")
            location.replace('/settings')
        } else {
            alert('Your Password was Incorrect')
        }
    } else {
        alert('Something Went Wrong')
    }
});


//this script controls updating password for user
chngePW.addEventListener('submit', (e) => {
    e.preventDefault()

    const currentPW = document.getElementById('currentPW2').value
    const newPW = document.getElementById('newPW').value

    if(currentPW && newPW){
        fetch('/api/users/updatePW', {
            method: 'PUT',
            body: JSON.stringify({password:currentPW, newPassword:newPW}),
            headers: { 'Content-Type': 'application/json' }
        }).then(res=>{
            if(res.ok){
                alert("Password Has Been Changed")
                location.replace('/settings')
            } else {
                alert('Your Password Was Incorrect')
            }
        })
    }
});

//this script controls the delete button

deleteUser.addEventListener('click', (e) => {
    e.preventDefault()
    if (window.confirm("Do You Really Want To Delete Your Account?")) {
        fetch('/api/users/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then(res=>{
            if(res.ok){
                alert("Account Has Been Deleted")
                location.replace('/login')
            } else {
                alert('Something Went Wrong')
            }
        }) 
      } else {
          alert("Account Was Not Deleted")
      }
})
