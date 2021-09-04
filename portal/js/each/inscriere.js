$("form").submit(function (e){
    e.preventDefault()

    //database prepare
    let formData = {
        user_id:getUserId(),
        afilierea:document.querySelector("input[id='afiliere']").value,
        statut:document.querySelector("input[id='statut']").value,
        titlu:document.querySelector("input[id='titlu']").value,
        sectiune_colocviu:document.querySelector("input[id='sectiune']").value,
        rezumat: getTextValue($("#rezumat")),
        cuv_cheie: getTextValue($("#cuvintecheie")),
        bibliografie: getTextValue($("#bibliografie")),
        nota_bibliografica: getTextValue($("#notabiobibliografica")),
        nume: JSON.parse(window.sessionStorage.getItem("accountStatus")).account.nume
    }

    // database send
    database.ref("cieft").once('value')
        .then((snapshot)=>{
            let users = snapshot.val()
            if(users === null){
                 users = [formData]
            }
            else{
                users.push(formData)
            }

            //saving
            let updates = {}
            updates['/cieft'] = users
            database.ref().update(updates)
                .then(()=>{
                    $("#formular-container").html(`<h1>${FormEnds["cieft"]}</h1>`)
                })
        })

})

function changeButton(){
    if(isUserLoggedIn()){
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",`<p id='connected-as' ">Connexion en tant que  ${RANKS[getUserRank()].nume} </button>` )
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Déconnexion </button>' )
    }

    else
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Connexion </button>' )
}
changeButton()