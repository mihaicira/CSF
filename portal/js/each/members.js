function fetch_members(){
    database.ref("users").once("value")
        .then((snapshot)=>{
            const users = snapshot.val()
            users.forEach((user)=>{
                if (user.id !== "0"){
                    let nume = user.nume
                    let rankDF = user.rankDF.id !== 999 ? `(${RANKS[user.rankDF.id]})` : "";
                    let rankAF = user.rankAF.id !== 999 ? `(${RANKS[user.rankAF.id]})` : "";
                    document.getElementById("members-container").insertAdjacentHTML("beforeend", `<div class="member">&bull;<p><a href="">${nume}</a></p><p>${rankDF}</p><p>${rankAF}</p></div>`)
                }
            })
            document.getElementById("members-count").insertAdjacentText("beforeend",users.length-1)
        })
    return true
}
fetch_members()

function changeButton(){
    if(isUserLoggedIn())
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Deconecteaza-te </button>' )
    else
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Conecteaza-te </button>' )
}
changeButton()