const chngeUN = document.getElementById('chngUN-form')
const chngePW = document.getElementById('chngPW-form')
const deleteUser = document.getElementById('btnDel')

//this script controls updating username for user
chngeUN.addEventListener('submit', async (e) => {
    e.preventDefault()

    const userObj={
        username:document.querySelector('#newUN').value,
        password:document.querySelector('#currentPW1').value
    }

    if(userObj.username && userObj.password){
        fetch('/api/users/updateUN', {
            method: 'PUT',
            body: JSON.stringify(userObj),
            headers: { 'Content-Type': 'application/json' }
        }).then(res=>{
            if(res.ok){
                console.log(res);
                alert("Username has Been Changed")
                location.href('/settings')
            } else {
                alert('Something Went Wrong')
            }
        })
    }
});


//this script controls updating password for user
chngePW.addEventListener('submit', (e) => {
    e.preventDefault()

    const userObj={
        password:document.querySelector('#currentPW2').value,
        newPassword:document.querySelector('#newPW').value
    }

    if(userObj.password && userObj.newPassword){
        fetch('/api/users/updatePW', {
            method: 'PUT',
            body: JSON.stringify(userObj),
            headers: { 'Content-Type': 'application/json' }
        }).then(res=>{
            if(res.ok){
                console.log(res);
                alert("Password Has Been Changed")
                location.href('/settings')
            } else {
                alert('Something Went Wrong')
            }
        })
    }
});

//this script controls the delete button

deleteUser.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('/api/users/delete', {
        method: 'DELETE',
    }).then(res=>{
        if(res.ok){
            console.log(res);
            alert("Account Has Been Deleted")
        } else {
            console.log(err)
            alert('something went wrong')
        }
    })
})
