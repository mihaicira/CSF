function changeButton(){
    if(isUserLoggedIn()){
            document.getElementById("header-second-line").insertAdjacentHTML('beforeend',`<button onclick='window.location.href="./profile.html?user=${getUserId()}"'>Page de profile</button>`)

        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",`<p id='connected-as' ">Connexion en tant que  ${RANKS[getUserRank()].nume} </button>` )
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Déconnexion</button>' )
    }

    else{
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Connexion </button>' )
    }
}
changeButton()

function redirectToForm(location){
    if(!isUserLoggedIn())
        alert("Vous n’êtes pas connecté. Connectez-vous pour continuer.")
    else
        window.location.href=location

}
