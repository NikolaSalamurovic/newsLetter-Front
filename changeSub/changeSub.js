const form = document.getElementById('changeSub-form')
form.addEventListener('submit', registerUser)

let checkYes = document.getElementById('subscribeBox1')
let checkNo = document.getElementById('subscribeBox2')
let submitBtn = document.getElementById('submitBtn')
let logoutBtn = document.getElementById('logoutBtn')

checkYes.addEventListener('click', disableNoBtn)
checkNo.addEventListener('click', disableYesBtn)
logoutBtn.addEventListener('click', logout)


function disableNoBtn(){
    if(checkYes.checked){
        checkNo.disabled = true;
    } else{
        checkNo.disabled = false;
    }
    checkSubmit();
}

function disableYesBtn(){
    if(checkNo.checked){
        checkYes.disabled = true;
    } else{
        checkYes.disabled = false;
    }
    checkSubmit();
}

function checkSubmit(){
    if(!checkNo.checked && !checkYes.checked){
        submitBtn.disabled = true;
    }else {
        submitBtn.disabled = false;
    }
}

async function registerUser(event){
    event.preventDefault()
    
    if(checkYes.checked){
        subscription = true;
    }
    if(checkNo.checked){
        subscription = false;
    }

    const result = await fetch('http://localhost:3000/api/change-sub', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
                body: JSON.stringify({

                    newSubscribe: subscription,
                    token: localStorage.getItem('token')
                })

                }).then((res) => res.json());

                if (result.status === 'ok'){
                    alert('Du har uppdaterat din subscription.')
                    location.reload()
                } else{
                    alert(result.error)
            }


}

if(localStorage.getItem("token") === null){
    document.body.innerHTML = ""

    let div2 = document.createElement('div')
    div2.innerHTML = "Du är inte inloggad, klicka på länken för att logga in"

    let loginLink = document.createElement('a');
    loginLink.setAttribute('href', '/login/login.html')
    loginLink.innerHTML = "Logga in"
    
    let div = document.createElement('div')
    div.setAttribute('class', 'd-flex-column container mx-auto justify-content-center mt-4')

    document.body.append(div)
    div.append(div2, loginLink)
}

function logout(){
    localStorage.clear()
    window.location= '/login/login.html'
}





