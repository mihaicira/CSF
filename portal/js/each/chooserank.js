function changeButton(){
    if(isUserLoggedIn())
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Deconecteaza-te </button>' )
    else
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Conecteaza-te </button>' )
}
changeButton()

function chooseRank(Rank){

    let userData = JSON.parse(window.sessionStorage.getItem("accountStatus"))
    userData.account['rank']=Rank
    sessionStorage.setItem("accountStatus",JSON.stringify(userData))
    window.location.href="index.html"

}



function addButtons(){
    database.ref("users").once('value')
        .then((snapshot)=>{
            Users = snapshot.val()
            const userData = JSON.parse(window.sessionStorage.getItem("accountStatus")).account
            Users.forEach((user)=> {
                if (user.email === userData.email){
                    if (user.password === userData.password) {
                        const ranks = user.ranks
                        if(ranks.length === 1)
                            chooseRank(RANKS[ranks[0].id])
                        else
                        ranks.forEach((ranks)=>{
                            if(ranks.id.includes("df")){
                                document.getElementById("header-third-line").insertAdjacentHTML("beforeend",`<button onclick='chooseRank(RANKS.${ranks.id})'>${ranks.nume}</button>`)
                            }else{
                               document.getElementById("header-fourth-line").insertAdjacentHTML("beforeend",`<button onclick="chooseRank(RANKS.${ranks.id})">${ranks.nume}</button>`)
                            }

                        })
                    }
                }
            })
        })
}
addButtons()