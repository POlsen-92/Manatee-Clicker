const chngeUN = document.getElementById('chngUN-form')
const chngePW = document.getElementById('chngPW-form')

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
                location.href('/dashboard')
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
                location.href('/dashboard')
            } else {
                alert('Something Went Wrong')
            }
        })
    }
});


