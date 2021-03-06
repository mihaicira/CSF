function fetch_members(){
    database.ref("users").once("value")
        .then((snapshot)=>{
            const users = snapshot.val()

            document.getElementById("members-count").insertAdjacentText("beforeend",Object.entries(users).length-1)

            for(const [id,user] of Object.entries(users)){
                if (!user.ranks["admin"]){
                    let userString = `<div class="member">&bull;<p><a href="./profile.html?user=${user.id}">${user.nume}</a></p>`
                    for(const [key,value] of Object.entries(user.ranks)){
                        if(value){
                            if(key.includes("df"))
                                userString += `<p class="rank-df">${RANKS[key].nume}</p>`
                            else
                                userString += `<p class="rank-af">${RANKS[key].nume}</p>`
                        }
                    }
                    userString += "</div>"
                    document.getElementById("members-container").insertAdjacentHTML("beforeend", userString)
                }
            }
            document.getElementById("loadingAnimation").style.display="none";
        })
    return true
}

function fetch_logs(){
    database.ref("logs").once("value")
        .then((snapshot)=>{
            const logs = snapshot.val()
            logs.forEach((log)=>{
                document.getElementById("logs").insertAdjacentHTML('afterbegin',`<p>${log}</p>`)
            })
        })
}

function changeButton(){
    if(isUserLoggedIn()){
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",`<p id='connected-as' ">Connexion en tant que ${RANKS[getUserRank()].nume} </button>` )
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Déconnexion </button>' )
    }

    else
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Connexion </button>' )
}


if(RIGHTS[getUserRank()]["access-members-page"]){
    fetch_members()
    if(RIGHTS[getUserRank()]["edit-view-logs"]){
        document.getElementsByClassName("members-container-box")[0].insertAdjacentHTML('afterend',`<section id="logs-container">
                                                                                                                            <h1>Istoric schimbări funcții</h1>
                                                                                                                            <div id="logs"></div>
                                                                                                                        </section>`)
        fetch_logs()
    }
}
else
    $(".members-container-box").html(`<h1>${GeneralErrors["not-authorized"]}</h1>`)
changeButton()