const chngeUN = document.getElementById('chngUN-form')
const chngePW = document.getElementById('chngPW-form')

//this script controls updating username for user
chngeUN.addEventListener('submit', async (e) => {
    e.preventDefault()
    const newUsername = document.getElementById('newUN').value
    const currentPassword = document.getElementById('currentPW').value

    if(newUsername && currentPassword){
        const resp = await fetch('/api/users/update', {
            method: 'PUT',
            body: JSON.stringify({ username:newUsername, password:currentPassword }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(resp.ok){
            console.log(resp);
            location.replace('/settings')
        } else {
            alert('Your password is not correct!')
        }
    }
});


//this script controls updating password for user
chngePW.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const currentPW = document.getElementById('currentPW').value
    const newPassword = document.getElementById('newPW').value

    if(currentPW && newPassword){
        const resp = await fetch('/api/users/update', {
            method: 'POST',
            body: JSON.stringify({ password:currentPW, newPassword:newPassword }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(resp.ok){
            location.href = '/settings'
        } else {
            alert('Your password is not correct!')
        }
    }
});


