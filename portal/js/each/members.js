function fetch_members(){
    database.ref("users").once("value")
        .then((snapshot)=>{
            const users = snapshot.val()

            document.getElementById("members-count").insertAdjacentText("beforeend",Object.entries(users).length-1)

            for(const [id,user] of Object.entries(users)){
                if (user.id != "0"){
                    let userString = `<div class="member">&bull;<p><a href="./profile.html?user=${user.id}" target="_blank">${user.nume}</a></p>`
                    user.ranks.forEach((rank)=>{
                        if(rank.id.includes("df"))
                            userString += `<p class="rank-df">${RANKS[rank.id].nume}</p>`
                        else
                            userString += `<p class="rank-af">${RANKS[rank.id].nume}</p>`
                    })
                    userString += "</div>"
                    document.getElementById("members-container").insertAdjacentHTML("beforeend", userString)
                }
            }
            document.getElementById("loadingAnimation").style.display="none";
        })
    return true
}
fetch_members()

function changeButton(){
    if(isUserLoggedIn())
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Déconnexion </button>' )
    else
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Connexion </button>' )
}
changeButton()