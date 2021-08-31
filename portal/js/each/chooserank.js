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
    database.ref("users/"+getUserId()).once('value')
        .then((snapshot)=>{
            const User = snapshot.val()
            const ranks = User.ranks
            let single = {key: null,true_occurences: 0}
            for(const [key,value] of Object.entries(ranks)){
                if(value){
                    single.key = RANKS[key].id
                    single.true_occurences += 1
                }
            }
            if(single.true_occurences === 1)
                chooseRank(RANKS[single.key].id)
            else
                for(const [key,value] of Object.entries(ranks)){
                    try {
                        if (RANKS[key].id.includes("admin") && value)
                            document.getElementById("header-third-line").insertAdjacentHTML("beforeend", `<button onclick='chooseRank(RANKS.${key}.id)'>${RANKS[key].nume}</button>`)
                        if (RANKS[key].id.includes("df") && value)
                            document.getElementById("header-fourth-line").insertAdjacentHTML("beforeend", `<button onclick='chooseRank(RANKS.${key}.id)'>${RANKS[key].nume}</button>`)
                        if (RANKS[key].id.includes("af") && value)
                            document.getElementById("header-fifth-line").insertAdjacentHTML("beforeend", `<button onclick="chooseRank(RANKS.${key}.id)">${RANKS[key].nume}</button>`)
                    }
                    catch {
                        //pass
                    }
                }
        })
}
addButtons()