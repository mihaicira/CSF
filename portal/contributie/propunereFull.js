let CORRECT_URL = true
let PROP_ID = "", PUB = "";

try{

    PROP_ID = location.search.slice(1).split("&")[0].split("=")[1]
    PUB = location.search.slice(1).split("&")[1].split("=")[1]


}
catch{
    CORRECT_URL = false
}



function changeButton(){
    if(isUserLoggedIn()){
        document.getElementById("header-second-line").insertAdjacentHTML('beforeend',`<button onclick='window.location.href="../profile.html?user=${getUserId()}"'>Page de profile</button>`)
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",`<p id='connected-as' ">Connexion en tant que  ${RANKS[getUserRank()].nume} </button>` )
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Déconnexion</button>' )
    }

    else{
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Connexion </button>' )
    }
}
changeButton()


if(!CORRECT_URL){
    document.getElementById("propunere-container").insertAdjacentHTML("afterbegin",`<h2>${GeneralErrors["doesnt-exist"]}</h2>`)
}
else {
    console.log(PUB.toUpperCase()+"/propuneri/"+ PROP_ID)
    database.ref(PUB.toUpperCase()+"/propuneri/"+ PROP_ID).once('value')
        .then((snapshot) => {
            let dbObj = snapshot.val()
            let userRank = JSON.parse(window.sessionStorage.getItem("accountStatus")).account.rank
            let userID = JSON.parse(window.sessionStorage.getItem("accountStatus")).account.id

            if(dbObj){
                var autoriHTML = ""
                try{
                    dbObj.autori_secundari.forEach((autor)=>{
                        autoriHTML +=`
                <br>
                &emsp;&emsp;
                ${autor.nume}
                &emsp;
                <a href="mailto:${autor.email}">${autor.email}</a>
                &emsp;
                (${autor.rol})
                `
                    })
                }
                catch{
                    autoriHTML = "N/A"
                }

                if(["admin","rsdf","redresdf","redresaf"].includes(userRank) || userID===dbObj.id_autor) {

                    var HTML = `
        <h1 id="publicatie"></h1>
         <p> Proposition de contribution</p>
        
        <div class="propunere-pair">
            <span>Auteur de l'article</span>
            <span>${dbObj.autor}</span>
        </div>
        
        <div class="propunere-pair">
            <span>Tous les auteurs (noms, email, rôle)</span>
            <span>${autoriHTML}</span>
        </div>
        
        <div class="propunere-pair">
            <span>Langue d'écriture:</span>
            <span>${dbObj.limba_articol}</span>
        </div>
        
        <div class="propunere-pair">
            <span>Section</span>
            <span>${dbObj.rubrica}</span>
        </div>
        
        <div class="propunere-pair">
            <span>Rôle</span>
            <span>${dbObj.calitate}</span>
        </div>
        
        <div class="propunere-pair">
            <span>Contribution</span>
            <span id="articol-link"></span>
        </div>
        
        <div class="propunere-pair">
            <span>Notice biobibliographique</span>
            <span id="nota-bio"></span>
        </div>
        
      
       <p>Métadonnées</p>
        
       <div class="propunere-pair">
            <span>Article initial</span>
            <span>${dbObj.articol_initial}</span>
        </div>
        
         <div class="propunere-pair">
            <span>Titre</span>
            <span>${dbObj.titlu}</span>
        </div>
        
         <div class="propunere-pair">
            <span>Sous-titre</span>
            <span>${dbObj.subtitlu}</span>
        </div>
        
         <div class="propunere-pair">
            <span>Résumé</span>
            <span>${dbObj.rezumat}</span>
        </div>
        
        <div class="propunere-pair">
            <span>Langue</span>
            <span>${dbObj.limba}</span>
        </div>
        
        <div class="propunere-pair">
            <span>Mots-clés</span>
            <span>${dbObj.cuvinte_cheie}</span>
        </div>
        
        <div class="propunere-pair">
            <span>Références bibliographiques</span>
            <span>${dbObj.referinte}</span>
        </div>

        <div class="propunere-pair">
            <span>Status contribution</span>
            <span>(${dbObj.stadiu}) - ${CONTRIBUTION_STATUS[dbObj.stadiu]}</span>
        </div>`
                    document.getElementById("propunere-container").insertAdjacentHTML("beforeend", HTML)

                    var propunereRef = firebase.storage().ref(`${PUB.toUpperCase()}/${dbObj.fisier_propunere}`);
                    propunereRef.getDownloadURL()
                        .then((url) => {
                            $("#articol-link").html(`<span><a href="${url}" target="__blank" style="color: black"><svg width="30" height="30" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="512" height="512" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0" transform="scale(0.00195312)"/></pattern><image id="image0" width="512" height="512" xlink:href="data:image/png;base64,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"/></defs></svg></a></span>`)
                        })
                        .catch((error) => {
                            $("#articol-link").html(`<span>Error: ${error.code}</span>`)
                        });

                    var propunereRef = firebase.storage().ref(`${PUB.toUpperCase()}/${dbObj.fisier_nota}`);
                    propunereRef.getDownloadURL()
                        .then((url) => {
                            $("#nota-bio").html(`<span><a href="${url}" target="__blank" style="color: black"><svg width="30" height="30" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="512" height="512" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0" transform="scale(0.00195312)"/></pattern><image id="image0" width="512" height="512" xlink:href="data:image/png;base64,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"/></defs></svg></a></span>`)
                        })
                        .catch((error) => {
                            $("#nota-bio").html(`<span>Error: ${error.code}</span>`)
                        });

                    if(PUB==="DF") document.getElementById("publicatie").insertAdjacentHTML("afterbegin","Dialogues Francophones")
                    if(PUB==="AF") document.getElementById("publicatie").insertAdjacentHTML("afterbegin","Agapes Francophones")
                    if(["admin"].includes(userRank)){
                    document.getElementById("propunere-container").insertAdjacentHTML('beforeend',`
                    <p>Ștergere</p>
                    <div class="propunere-pair">
                        <button onclick="deleteContribution('${PUB}','${dbObj.id}')" class="effacer"></button>
                        </div>
                    `)}
                }
                else{
                    document.getElementById("propunere-container").insertAdjacentHTML("afterbegin",`<h2>${GeneralErrors["not-authorized"]}</h2>`)
                }
            }
            else document.getElementById("propunere-container").insertAdjacentHTML("afterbegin",`<h2>${GeneralErrors["doesnt-exist"]}</h2>`)

        })
}


function deleteContribution(pub,id){
    database.ref(`${pub.toUpperCase()}/propuneri/${id}`).once('value')
        .then((snapshot)=>{
            const contributie = snapshot.val()
            //FILES
            firebase.storage().ref(pub.toUpperCase()+'/'+contributie.fisier_nota).delete()
            firebase.storage().ref(pub.toUpperCase()+'/'+contributie.fisier_propunere).delete()
            database.ref(`${pub.toUpperCase()}/evaluari/${id}`).once('value')
                .then((snaps)=>{
                    let evaluari = snaps.val()
                    try{
                        if(contributie.evaluare_1.completed)
                            firebase.storage().ref(pub.toUpperCase()+'/'+evaluari[1].fisier_adnotari).delete()
                        if(contributie.evaluare_2.completed)
                            firebase.storage().ref(pub.toUpperCase()+'/'+evaluari[2].fisier_adnotari).delete()
                    }
                    catch{
                        console.log("failed")
                    }

                    //contributia autorului
                    database.ref(`users/${contributie.id_autor}`).once('value')
                        .then((snap)=>{
                            let user = snap.val()
                            console.log("b4 contrib: ",user.contributions )
                            console.log(`${id}-${pub.toLowerCase()}`)
                            user.contributions = deleteItemFromArray(`${id}-${pub.toLowerCase()}`,user.contributions)
                            console.log("after contrib: ",user.contributions )
                            let updates = {}
                            updates[`users/${contributie.id_autor}`] = user
                            database.ref().update(updates)
                        })

                    //de_evaluat de la cei doi evaluatori
                    if(contributie.evaluare_1.evaluator!=="none")
                        database.ref(`users/${contributie.evaluare_1.evaluator}`).once('value')
                            .then((snap)=>{
                                let user = snap.val()
                                if(user.to_evaluate) {
                                    console.log("array: ",user.to_evaluate)
                                    console.log("string: ",`${id}-1-${pub.toLowerCase()}`)
                                    user.to_evaluate = deleteItemFromArray(`${id}-1-${pub.toLowerCase()}`, user.to_evaluate)
                                    console.log("array after: ",user.to_evaluate)
                                }
                                if(user.evaluations){
                                    user.evaluations = deleteItemFromArray(`${id}-1-${pub.toLowerCase()}`,user.evaluations)
                                }
                                let updates = {}
                                updates[`users/${contributie.evaluare_1.evaluator}`] = user
                                database.ref().update(updates)
                            })
                    if(contributie.evaluare_2.evaluator!=="none")
                        database.ref(`users/${contributie.evaluare_2.evaluator}`).once('value')
                            .then((snap)=>{
                                let user = snap.val()
                                if(user.to_evaluate) {
                                    user.to_evaluate = deleteItemFromArray(`${id}-2-${pub.toLowerCase()}`, user.to_evaluate)
                                }
                                if(user.evaluations){
                                    user.evaluations = deleteItemFromArray(`${id}-2-${pub.toLowerCase()}`,user.evaluations)
                                }
                                let updates = {}
                                updates[`users/${contributie.evaluare_2.evaluator}`] = user
                                database.ref().update(updates)

                            })

                    //evaluarile
                    database.ref(`${pub.toUpperCase()}/evaluari/${id}`).remove()
                    database.ref(`${pub.toUpperCase()}/propuneri/${id}`).remove()

                    //contributia
                    database.ref(`${pub.toUpperCase()}/propuneri/${id}`).remove()
                        .then(()=>{
                            $("#propunere-container").html(`<h1>Contributia a fost stearsa.</h1>`)
                            window.scrollTo(0,0)
                        })
                })



        })
}

