function changeButton(){
    if(isUserLoggedIn()){
        document.getElementById("header-second-line").insertAdjacentHTML('beforeend',`<button href="">Pagina de profil</button>`)
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Deconecteaza-te </button>' )
    }

    else{
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Conecteaza-te </button>' )
    }

}
changeButton()

function denyButtonIfNotLoggedIn(paramBool){
    if(!isUserLoggedIn())
        alert("Nu sunteți conectat. Conectați-vă pentru a continua.")
    else{
        if(paramBool===true)
            window.location.href="profile.html"
        else
            window.location.href="members.html"
    }
}
