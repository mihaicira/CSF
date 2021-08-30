function changeButton(){
    if(isUserLoggedIn())
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Deconecteaza-te </button>' )
    else
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Conecteaza-te </button>' )
}
changeButton()

const USER_ID = location.search.slice(1).split("&")[0].split("=")[1]
let USER;

database.ref("users").once('value')
.then((snapshot)=>{
    const USERS = snapshot.val()
    USER = USERS[USER_ID]
    if(USER === undefined){
        // raiseUserNotFound()
    }
    else{
        document.getElementById("text_nume").innerText = USER.nume
        document.getElementById("text_nume").insertAdjacentHTML("afterend",`<a id="text_email" href="mailto:${USER.email}">${USER.email}</a>`)
        if(getUserId() === USER.id){
            //it is me
            //adaug buton pt schimbare date

            //adaug formularul pt schimbare date

            //adaug functia mea cu care sunt logat
            document.getElementById("profile-rank").insertAdjacentHTML('beforeend',`<h3>${RANKS[getUserRank().id].nume}</h3>`)

            const Contributions = USER.contributions
            const Evaluations = USER.evaluations

            //contributiile mele
            database.ref("DF/propuneri").once('value')
                .then((snap)=>{
                    const propuneri = snap.val()

                    Contributions.forEach((contrib)=>{
                        const propunere = propuneri[contrib]

                        document.getElementById("contributii_propuse_lista").insertAdjacentHTML("beforeend", `
                        <div class="article-box">
                        <div>
                        <div class="text_nume_articol "> ${propunere.titlu}</div>
                        <div class="text-secundar-articol">Propus in ${propunere.data}</div>
                        </div>
                        <svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg>
                        </div>
                        `)
                    })
                })


            //evaluarile mele
            //trebuie verificat daca rankul meu imi permite sa vad panelul asta
            database.ref("DF/evaluari").once('value')
                .then((snap)=>{
                    const evaluari = snap.val()
                    Evaluations.forEach((eval)=>{
                        eval = eval.toString()
                        const EV = eval.split("-")[1]
                        const evaluare = evaluari[eval.split("-")[0]][EV]
                        document.getElementById("articole_evaluate_lista").insertAdjacentHTML("beforeend", `
                       <div class="article-box">
                    <div>
                        <div class="text_nume_articol "> ${evaluare.titlu} </div>
                        <div class="text-secundar-articol">Evaluat in ${evaluare.data}</div>
                    </div>
                    <svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg>
                </div>
                        `)
                    })
                })





        }
        else{
            console.log("guest")
        }

    }
})


function raiseUserNotFound(){
    document.getElementsByClassName("profile_box")[0].innerHTML = `
                    <img src="./media/profile_page_top.jpg" id="top_imag">
                        <div class="profile-data-container">
                            <div class="profile-data">
                                <p id="text_nume">Nom d’utilisateur introuvable.</p>
                            </div>
                        </div>`
}




