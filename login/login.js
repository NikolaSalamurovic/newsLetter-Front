const form = document.getElementById('loginForm');
form.addEventListener('submit', login);

async function login(event){
    event.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const result = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('Got the token:', result.data);
        localStorage.setItem('token', result.data);
        location.reload()
    } else {
        alert(result.error)
        console.log(result.error)
    }
}
if(localStorage.getItem("token") !== null){
    document.body.innerHTML = ""

    let div2 = document.createElement('div')
    div2.innerHTML = "Du är inloggad. Klicka dig vidare på knapparna under."

    let logoutBtn = document.createElement('button')
    logoutBtn.setAttribute('id', 'logoutBtn')
    logoutBtn.addEventListener('click', logout)
    logoutBtn.innerHTML = "Logga ut"

    let changeSubBtn = document.createElement('button')
    changeSubBtn.setAttribute('id', 'changeSubBtn')
    changeSubBtn.innerHTML = "Ändra sub"
    changeSubBtn.addEventListener('click', redirectPage)

    let div1 = document.createElement('div')
    div1.setAttribute('class', 'd-flex-column container mx-auto justify-content-center mt-4')
    document.body.append(div1)
    div1.append(div2, changeSubBtn, logoutBtn)
    
}
function logout(){
    localStorage.clear()
    location.reload()
}

function redirectPage(){
    window.location= '/changeSub/changeSub.html'
}
