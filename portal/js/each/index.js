function changeButton(){
    if(isUserLoggedIn()){
        document.getElementById("header-second-line").insertAdjacentHTML('beforeend',`<button onclick='window.location.href="./profile.html?user=${getUserId()}"'>Pagina de profil</button>`)
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Deconecteaza-te </button>' )
    }

    else{
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Conecteaza-te </button>' )
    }
}
changeButton()

function redirectToForm(location){
    if(!isUserLoggedIn())
        alert("Nu sunteți conectat. Conectați-vă pentru a continua.")
    else
        window.location.href=location

}
