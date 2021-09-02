function changeButton(){
    if(isUserLoggedIn()){
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",`<p id='connected-as' ">Conectat ca ${RANKS[getUserRank()].nume} </button>` )
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Déconnexion </button>' )
    }

    else
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Connexion </button>' )
}

if(RIGHTS[getUserRank()]["access-cieft-page"]){
    $(".cieft-members").html(`<h1>Inscrieri CIEFT</h1>
                                <div class="panel">
                                    <h2>Numar participanti: <span id="numberOfMembers"></span></h2>
                                    <button onclick="DeleteList()">Sterge lista</button>
                                </div>                                
                                <div id="list"></div>
                                `)

    database.ref('cieft').once('value')
        .then((snapshot)=>{
            const users = snapshot.val()
            if(users){
                document.getElementById("numberOfMembers").innerText = users.length
                users.forEach((user)=>{
                    document.getElementById("list").insertAdjacentHTML("beforeend",`
                     <div class="member">
                    <a href="wda">${user.nume}</a>
                    <div class="member-data">
                        <p><span>Affiliation académique ou lieu d’exercice: </span>${user.afilierea}</p>
                        <p><span>Statut: </span>${user.statut}</p>
                        <p><span>Titre de la communication: </span>${user.titlu}</p>
                        <p><span>Section du colloque: </span>${user.sectiune_colocviu}</p>
                        <p><span>Résumé: </span>${user.rezumat}</p>
                        <p><span>Cinq mots clefs: </span>${user.cuv_cheie}</p>
                        <p><span>Bibliographie: </span> ${user.bibliografie}</p>
                        <p><span>Notice biobibliographique: </span>${user.nota_bibliografica}</p>
                    </div>
                </div>`)
                })
            }
            else{
                document.getElementById("numberOfMembers").innerText = 0
            }

        })
}
else{
    $(".cieft-members").html(`<h1>${GeneralErrors["not-authorized"]}</h1>`)
}


function DeleteList(){
    var r = confirm("Sunteti pe cale sa stergeti intreaga lista de participanti la colocviu. Continuati?")
    if(r){
        let updates = {}
        updates["cieft"] = null
        database.ref().update(updates)
        window.location.reload()
    }
}

changeButton()