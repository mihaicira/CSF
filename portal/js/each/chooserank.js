function changeButton(){
    if(isUserLoggedIn())
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Deconecteaza-te </button>' )
    else
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Conecteaza-te </button>' )
}
changeButton()


database.ref("users").once('value')
.then((snapshot)=>{
    const userData = 1//getStorageData
    Users.forEach((user)=>{
        if(user.email === userData.email)
            if(user.password === userData.password){
                const ranks = user.ranks
            }
    })
})