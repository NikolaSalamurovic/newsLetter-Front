const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if(document.getElementById('subscribeBox').checked){
        subscription = true;
    } else {
        subscription = false;
    }

    const result = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                subscription
            })
        }).then((res) => res.json())

        if(result.status === 'ok'){
            alert('Sucessful')
            location.reload()
        } else{
            alert(result.error)
        }
        console.log(result);
}
if(localStorage.getItem("token") !== null){
    document.body.innerHTML = ""
    let logoutBtn = document.createElement('button')
    logoutBtn.setAttribute('id', 'logoutBtn')
    logoutBtn.addEventListener('click', logout)
    logoutBtn.innerHTML = "Logga ut"

    let div2 = document.createElement('div')
    div2.innerHTML = "Du är redan inloggad. Logga ut om du vill registrera en annan användare. Du kan även ändra din subscription via knappen nedan."

    let changeSubBtn = document.createElement('button')
    changeSubBtn.setAttribute('id', 'changeSubBtn')
    changeSubBtn.innerHTML = "Ändra sub"
    changeSubBtn.addEventListener('click', redirectPage)

    let div = document.createElement('div')
    div.setAttribute('class', 'd-flex-column container mx-auto justify-content-center mt-4')

    document.body.append(div)
    div.append(div2, changeSubBtn, logoutBtn)
    
}
function logout(){
    localStorage.clear()
    location.reload()
}

function redirectPage(){
    window.location= '/changeSub/changeSub.html'
}
