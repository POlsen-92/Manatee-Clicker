const loginForm = document.getElementById('login-form')
const signupForm = document.getElementById('signup-form')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const loginUser = document.getElementById('username-login').value
    const loginPassword = document.getElementById('password-login').value

    if(loginUser && loginPassword){
        const resp = await fetch('/api/users/signin', {
            method: 'POST',
            body: JSON.stringify({ username:loginUser, password:loginPassword }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(resp.ok){
            console.log(resp);
            location.replace('/dashboard')
        } else {
            alert('Your username or password is not correct!')
        }
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const signupUsername = document.getElementById('username-create').value
    const signupPassword = document.getElementById('password-create').value

    if(signupUsername && signupPassword){
        const resp = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username:signupUsername, password:signupPassword }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(resp.ok){
            location.href = '/dashboard'
        } else {
            alert('User already exists?')
        }
    }
});