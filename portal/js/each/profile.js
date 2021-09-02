function changeButton(){
    if(isUserLoggedIn())
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Deconecteaza-te </button>' )
    else
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Conecteaza-te </button>' )
}
changeButton()

const USER_ID = location.search.slice(1).split("&")[0].split("=")[1]
let USER,USERS;
let USER_RANKS;
let nothing_here

var PUB = "admin"
if (RANKS[getUserRank()].id.includes("df"))
    PUB = "DF"
if (RANKS[getUserRank()].id.includes("af"))
    PUB = "AF"


database.ref("users").once('value')
.then((snapshot)=>{
    USERS = snapshot.val()
    USER = USERS[USER_ID]
    if(USER === undefined){
        // raiseUserNotFound()
    }
    else{

        document.getElementById("text_nume").innerText = USER.nume
        if(PUB !== "admin")
            document.getElementById("text_nume").insertAdjacentHTML("afterend",`<a id="text_email" href="mailto:${USER.email}">${USER.email}</a>`)
        if(getUserId() === USER.id){
            //it is me

            if(PUB !== "admin"){
                //adaug buton pt schimbare date
                document.getElementById("profile_data").insertAdjacentHTML("beforeend",`
                <svg onclick="openPopUp()" width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.3051 14.749C20.0025 14.749 19.7572 15.0511 19.7572 15.4238V21.4148C19.7561 22.5324 19.021 23.438 18.1135 23.4391H2.73957C1.83209 23.438 1.0969 22.5324 1.09583 21.4148V3.83151C1.0969 2.71422 1.83209 1.80858 2.73957 1.80726H7.60444C7.90708 1.80726 8.15236 1.50521 8.15236 1.13251C8.15236 0.760083 7.90708 0.457764 7.60444 0.457764H2.73957C1.22724 0.459872 0.00171223 1.9691 0 3.83151V21.4151C0.00171223 23.2775 1.22724 24.7867 2.73957 24.7888H18.1135C19.6258 24.7867 20.8513 23.2775 20.853 21.4151V15.4238C20.853 15.0511 20.6078 14.749 20.3051 14.749Z" fill="black"/>
                <path d="M20.6361 1.4493C19.6731 0.263482 18.112 0.263482 17.1491 1.4493L7.37394 13.4873C7.30695 13.5698 7.25858 13.672 7.23333 13.7843L5.94787 19.4994C5.895 19.7337 5.94872 19.9846 6.08827 20.1567C6.22803 20.3286 6.43179 20.3947 6.62206 20.3299L11.2629 18.7466C11.354 18.7155 11.4371 18.6559 11.5041 18.5734L21.279 6.53523C22.2404 5.34862 22.2404 3.42769 21.279 2.24108L20.6361 1.4493ZM8.5678 13.9258L16.568 4.07345L19.1481 7.25083L11.1477 17.1032L8.5678 13.9258ZM8.05242 15.1994L10.1137 17.7382L7.26243 18.711L8.05242 15.1994ZM20.5042 5.58109L19.9231 6.29669L17.3428 3.11904L17.9241 2.40344C18.4589 1.74477 19.3262 1.74477 19.8611 2.40344L20.5042 3.19522C21.0382 3.85468 21.0382 4.92189 20.5042 5.58109Z" fill="black"/>
                </svg>
`)

                //adaug formularul pt schimbare date
                document.getElementById("myForm").insertAdjacentHTML("afterbegin",`
                     <div class="form-popup">
                    <div>
                        <b>Nume</b>
                        <input type="nume" placeholder="Introdu nume" name="nume" value="${USER.nume.split(' ')[0]}">
                    </div>
        
                    <div>
                        <b>Prenume</b>
                        <input type="prenume" placeholder="Introdu prenume" name="prenume" value="${USER.nume.split(' ')[1]}">
                    </div>
        
                    <div>
                        <b>Email</b>
                        <input type="email" placeholder="Introdu email" name="email" value="${USER.email}">
                    </div>
                    <button  class="btn">Schimba date </button>
                    <button type="button" class="btn cancel" onclick="closePopup()">Inchide</button>
                </div>`)
            }

            //adaug functia mea cu care sunt logat
            document.getElementById("profile-rank").insertAdjacentHTML('beforeend',`<h3>${RANKS[getUserRank()].nume}</h3>`)

            const my_rank = getUserRank()

            const pub = PUB.toLowerCase()
            const Contributions = USER.contributions
            const Evaluations = USER.evaluations


            //members link
            if(RIGHTS[my_rank]["access-members-page"])
                document.getElementById("container-contributii").insertAdjacentHTML('beforeend',`<a href="./members.html">Accesează pagina cu membrii platformei</a>`)

            if(RIGHTS[my_rank]["access-cieft-page"])
                document.getElementById("container-contributii").insertAdjacentHTML('beforeend',`<a href="./cieft.html">Accesează pagina cu membrii înscriși la colocviu</a>`)


            //contributiile mele
            if(RIGHTS[my_rank]["contributii-propuse-panel"] === true ) {
                document.getElementById("container-contributii").insertAdjacentHTML("beforeend",`
                <div class="panel" >
                <h2 class="titlu-panel" >Contributii propuse</h2>
                <div class="list" id="contributii_propuse_lista">
                </div>
                </div>`)

                if (Contributions){
                database.ref(`${PUB}/propuneri`).once('value')
                    .then((snap) => {
                        const propuneri = snap.val()
                        nothing_here = true;
                        Contributions.forEach((contrib) => {
                            const propunere = propuneri[contrib.split('-')[0]]
                            const pubname = contrib.split('-')[1]
                            if(pubname === pub){
                                        document.getElementById("contributii_propuse_lista").insertAdjacentHTML("beforeend", `
                                <div class="article-box">
                                <div>
                                <div class="text_nume_articol "> ${propunere.titlu}</div>
                                <div class="text-secundar-articol">Propus in ${propunere.data}</div>
                                </div>
                                <a href="./contributie/propunereFull.html?ID=${propunere.id}&PUB=${PUB}"><svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg></a>
                                </div>
                                `)
                                nothing_here = false;
                            }
                        })
                        if(nothing_here)
                            document.getElementById("articole_de_evaluat_lista").insertAdjacentHTML('beforeend',`<p>${ProfileErrors["no-contrib-prop"]}</p>`)
                    })
                 }
                 else
                    document.getElementById("contributii_propuse_lista").insertAdjacentHTML("beforeend",`<p>${ProfileErrors["no-contrib-prop"]}</p>`)

            }

            //evaluarile mele
            if(RIGHTS[my_rank]["articole-evaluate-panel"] === true){
                document.getElementById("container-contributii").insertAdjacentHTML("beforeend",`
                 <div class="panel">
                 <h2 class="titlu-panel" id="articole_evaluate_titlu">Articole evaluate</h2>
                 <div class="list" id="articole_evaluate_lista">
                    </div>
                    </div>`)

            if (Evaluations)    {
                database.ref(`${PUB}/evaluari`).once('value')
                    .then((snap)=>{
                        const evaluari = snap.val()
                        nothing_here = true;
                        Evaluations.forEach((eval)=> {
                            eval = eval.toString()
                            const id = eval.split("-")[0]
                            const EV = eval.split("-")[1]
                            const evaluare = evaluari[eval.split("-")[0]][EV]
                            const pubname = eval.split('-')[2]
                            if(pubname === pub){
                                document.getElementById("articole_evaluate_lista").insertAdjacentHTML("beforeend", `
                                       <div class="article-box">
                                    <div>
                                        <div class="text_nume_articol "> ${evaluare.titlu} </div>
                                        <div class="text-secundar-articol">Evaluat in ${evaluare.data}</div>
                                    </div>
                                    <a href="./contributie/evaluare.html?ID=${id}&PUB=${PUB}&EV=${EV}"><svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg></a>
                                </div>
                                        `)
                                nothing_here = false;
                            }
                        })
                        if(nothing_here)
                            document.getElementById("articole_de_evaluat_lista").insertAdjacentHTML('beforeend',`<p>${ProfileErrors["no-art-eval"]}</p>`)
                    })
            }
            else
                document.getElementById("articole_evaluate_lista").insertAdjacentHTML("beforeend",`<p>${ProfileErrors["no-art-eval"]}</p>`)
            }

            // articole de evaluat
            if(RIGHTS[my_rank]["articole-de-evaluat-panel"] === true){
                document.getElementById("container-contributii").insertAdjacentHTML("beforeend",`
                     <div class="panel">
                        <h2 class="titlu-panel" id="articole_de_evluat_titlu">Articole de evaluat</h2>
                        <div class="list" id="articole_de_evaluat_lista">

                         </div>
                    </div>
                `)
                if(USER.to_evaluate){
                    database.ref(`${PUB}/propuneri`).once('value')
                        .then((snap)=>{
                            const propuneri = snap.val()
                             nothing_here = true;
                            USER.to_evaluate.forEach((prop)=>{
                                const id = prop.split('-')[0]
                                const ev = prop.split('-')[1]
                                const pubname = prop.split('-')[2]
                                if(pubname === pub){
                                    document.getElementById("articole_de_evaluat_lista").insertAdjacentHTML("beforeend", `
                                      <div class="article-box">
                                    <div>
                                        <div class="text_nume_articol ">${propuneri[id].titlu}</div>
                                        <div class="text-secundar-articol">Propus in ${propuneri[id].data}</div>
                                    </div>
                                    <a href="./contributie/evaluare.html?ID=${id}&PUB=${PUB}&EV=${ev}"><svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg></a>
                                </div>
                                        `)
                                    nothing_here = false
                                }
                            })
                            if(nothing_here)
                                document.getElementById("articole_de_evaluat_lista").insertAdjacentHTML('beforeend',`<p>${ProfileErrors["no-art-to-eval"]}</p>`)
                        })
                }
                else{
                    document.getElementById("articole_de_evaluat_lista").insertAdjacentHTML('beforeend',`<p>${ProfileErrors["no-art-to-eval"]}</p>`)
                }
            }

            // ARTICOLE CE TREBUIE ATRIBUITE EVALUATORILOR-
            if(RIGHTS[my_rank][`${pub}-articole-assign-panel`] === true){

                let evaluatori = []
                for(const [key,user] of Object.entries(USERS)){
                    if(user.ranks["ev"+pub])
                        evaluatori.push([user.nume, user.id])


                }

                document.getElementById("container-contributii").insertAdjacentHTML("beforeend",`
                      <div class="panel">
                    <h2 class="titlu-panel" id="trebuie_atribuite_titlu">Articole ce trebuie atribuite evaluatorilor</h2>
                    <div class="list" id="trebuie_atribuite_lista">
        
                    </div>
                </div>
                `)

                database.ref(PUB + "/propuneri").once("value")
                    .then((snap) => {
                        const propuneri = snap.val()
                        for(const [key,contributie] of Object.entries(propuneri)){
                            if( contributie.stadiu === 1){
                                document.getElementById("trebuie_atribuite_lista").insertAdjacentHTML("beforeend", `
                             <div class="assign-article-container" id="assign-article-${contributie.id}">
                            <div>
                            <div class="assign-article-info-container">
                                <p>${contributie.titlu} &emsp; <svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg></p>
                                <p>Autor: ${contributie.autor}</p>
                                <p>Propus in ${contributie.data}</p>
                             </div>
                        <div class="assign-article-evals-container">
                            <p>Selecteaza evaluatori</p>
                            <div>
                                <label>Evaluator 1</label>
                                <select id="${contributie.id}-assign-evaluatori-1"><option value="none" selected>None</option> </select>
                            </div>
                            <div>
                                <label>Evaluator 2</label>
                                <select id="${contributie.id}-assign-evaluatori-2"><option value="none" selected>None</option></select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onclick="finalizeazaFaraEvaluare('${contributie.id}')">Finalizeaza fara evaluare</button>
                        <button onclick="trimiteSpreEvaluare('${contributie.id}')">Trimite spre evaluare</button>
                    </div>

                </div>
                        `)
                                evaluatori.forEach((evaluator) => {
                                    document.getElementById(`${contributie.id}-assign-evaluatori-1`).insertAdjacentHTML("beforeend", `
                                <option value="${evaluator[1]}">${evaluator[0]}</option>
                                `)
                                    document.getElementById(`${contributie.id}-assign-evaluatori-2`).insertAdjacentHTML("beforeend", `
                                <option value="${evaluator[1]}">${evaluator[0]}</option>
                                `)
                                })
                            }
                        }

                    })
            }

            //Contributii in curs de procesare
             if(RIGHTS[my_rank][`${pub}-contributii-wip-panel`]){
                 document.getElementById("container-contributii").insertAdjacentHTML("beforeend",`
                   <div class="panel">
                    <h2 class="titlu-panel" id="contributii_in_procesare_titlu">Contributii in curs de procesare</h2>
                    <div class="list" id="contributii_in_procesare_lista">
        
                    </div>
                </div>
                `)



                    document.getElementById("contributii_in_procesare_lista").insertAdjacentHTML("beforeend", `
                        <div class="article-box wip-container">
                    <div class="flex">
                        <div class="flex-col">
                            <p class="wip-title">Titlu contributie &emsp; <svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg></p>
                            <p>Jon Bovi</p>
                            <p>23 August 2323, 14:29</p>
                        </div>
                        <div class="wip-status">
                            <p>Status contributie:</p>
                            <p>(1) - Trimis pentru evaluare</p>
                        </div>
                    </div>
                    <hr>
                    <div class="flex">
                        <div class="wip-eval-container flex">
                                <div>
                                    <p>Evaluator 1:</p>
                                    <p>Frida Kahlo</p>
                                </div>
                            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">                    <g clip-path="url(#clip0)">                        <path d="M10.9181 5.09851L9.67517 3.90836C9.5037 3.74414 9.22529 3.74403 9.0537 3.90836L7.5 5.39603L5.94629 3.90836C5.77482 3.74414 5.49641 3.74403 5.32482 3.90836L4.08187 5.09851C3.91025 5.26281 3.91025 5.52924 4.08187 5.69357L5.63554 7.18124L4.08184 8.6689C3.91022 8.8332 3.91022 9.09964 4.08184 9.26396L5.32479 10.4541C5.49627 10.6183 5.77467 10.6184 5.94627 10.4541L7.5 8.96645L9.0537 10.4541C9.22517 10.6183 9.50358 10.6184 9.67517 10.4541L10.9181 9.26396C11.0897 9.09967 11.0897 8.83323 10.9181 8.6689L9.36445 7.18124L10.9182 5.69357C11.0897 5.52924 11.0897 5.26281 10.9181 5.09851ZM8.43222 6.88372C8.2606 7.04802 8.2606 7.31445 8.43222 7.47878L9.98593 8.96645L9.36445 9.56154L7.81075 8.07387C7.63913 7.90954 7.3609 7.90954 7.18927 8.07387L5.63557 9.56154L5.0141 8.96645L6.5678 7.47878C6.73942 7.31448 6.73942 7.04805 6.5678 6.88372L5.0141 5.39605L5.63557 4.80096L7.18927 6.28863C7.36087 6.45293 7.63913 6.45293 7.81075 6.28863L9.36445 4.80096L9.98593 5.39605L8.43222 6.88372Z" fill="black"/>                        <path d="M7.5 0C3.37034 0 0 3.22732 0 7.18124C0 11.1354 3.37058 14.3625 7.5 14.3625C11.6297 14.3625 15 11.1352 15 7.18124C15 3.2271 11.6294 0 7.5 0ZM7.5 13.5209C3.84911 13.5209 0.878906 10.677 0.878906 7.18124C0.878906 3.68552 3.84911 0.841551 7.5 0.841551C11.1509 0.841551 14.1211 3.68552 14.1211 7.18124C14.1211 10.677 11.1509 13.5209 7.5 13.5209Z" fill="black"/>                    </g>                    <defs>                        <clipPath id="clip0">                            <rect width="15" height="14.3625" fill="white"/>                        </clipPath>                    </defs>                </svg>
                        </div>
                        <div class="wip-eval-container flex">
                                <div>
                                    <p>Evaluator 2:</p>
                                    <p>Freddy Mercury</p>
                                </div>
                            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">                    <g clip-path="url(#clip0)">                        <path d="M10.9181 5.09851L9.67517 3.90836C9.5037 3.74414 9.22529 3.74403 9.0537 3.90836L7.5 5.39603L5.94629 3.90836C5.77482 3.74414 5.49641 3.74403 5.32482 3.90836L4.08187 5.09851C3.91025 5.26281 3.91025 5.52924 4.08187 5.69357L5.63554 7.18124L4.08184 8.6689C3.91022 8.8332 3.91022 9.09964 4.08184 9.26396L5.32479 10.4541C5.49627 10.6183 5.77467 10.6184 5.94627 10.4541L7.5 8.96645L9.0537 10.4541C9.22517 10.6183 9.50358 10.6184 9.67517 10.4541L10.9181 9.26396C11.0897 9.09967 11.0897 8.83323 10.9181 8.6689L9.36445 7.18124L10.9182 5.69357C11.0897 5.52924 11.0897 5.26281 10.9181 5.09851ZM8.43222 6.88372C8.2606 7.04802 8.2606 7.31445 8.43222 7.47878L9.98593 8.96645L9.36445 9.56154L7.81075 8.07387C7.63913 7.90954 7.3609 7.90954 7.18927 8.07387L5.63557 9.56154L5.0141 8.96645L6.5678 7.47878C6.73942 7.31448 6.73942 7.04805 6.5678 6.88372L5.0141 5.39605L5.63557 4.80096L7.18927 6.28863C7.36087 6.45293 7.63913 6.45293 7.81075 6.28863L9.36445 4.80096L9.98593 5.39605L8.43222 6.88372Z" fill="black"/>                        <path d="M7.5 0C3.37034 0 0 3.22732 0 7.18124C0 11.1354 3.37058 14.3625 7.5 14.3625C11.6297 14.3625 15 11.1352 15 7.18124C15 3.2271 11.6294 0 7.5 0ZM7.5 13.5209C3.84911 13.5209 0.878906 10.677 0.878906 7.18124C0.878906 3.68552 3.84911 0.841551 7.5 0.841551C11.1509 0.841551 14.1211 3.68552 14.1211 7.18124C14.1211 10.677 11.1509 13.5209 7.5 13.5209Z" fill="black"/>                    </g>                    <defs>                        <clipPath id="clip0">                            <rect width="15" height="14.3625" fill="white"/>                        </clipPath>                    </defs>                </svg>
                        </div>
                    </div>
                    <button disabled>Finalizeaza</button>
                </div>
                          
                        `)
        }

            //contributii finalizate de mine
            if(RIGHTS[my_rank][`${pub}-contributii-finalizate-panel`] === true){

                document.getElementById("container-contributii").insertAdjacentHTML("beforeend",`
                    <div class="panel">
                    <h2 class="titlu-panel" id="articole_finalizate_titlu">Contributii finalizate de mine</h2>
                    <div class="list" id="articole_finalizate_lista">
        
                    </div>
                </div>
                `)


                document.getElementById("articole_finalizate_lista").insertAdjacentHTML("beforeend", `
                      <div class="article-box fbm-container flex-col">
                    <div class="flex-col fbm-top">
                        <p class="fbm-title">Nume articol &emsp; <svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg></p>
                        <p>Autor: Adi Minune</p>
                        <p>Propus in 13 Aprilie 2021, 21:21</p>
                    </div>
                    <div class="flex fbm-btm">
                        <div class="flex">
                            <div>
                                <p>Evaluator 1:</p>
                                <p>John Jo</p>
                            </div>
                            <svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg>
                        </div>

                        <div class="flex">
                            <div>
                                <p>Evaluator 2:</p>
                                <p>Bo Burghnam</p>
                            </div>
                            <svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg>
                        </div>
                    </div>
                </div>
                        `)

            }

        }
        else{
            //SUPERVISOR RANK-CHANGE
            if(RIGHTS[getUserRank()]["change-ranks"])
            {
                USER_RANKS = USER.ranks
                document.getElementById("container-contributii").insertAdjacentHTML("beforeend",`
                    <div id="change-rank-container">
                    <h3 id="change-ranks-of">Schimba functiile lui <i>${USER.nume}</i></h3>
                    <div>
                       ${RIGHTS[getUserRank()]["change-to-rsdf"] ? '<input type="checkbox" id="rsdf" name="role" value="rsdf" '+(USER.ranks["rsdf"] ? 'checked' : '')+'><label for="rsdf">'+RANKS["rsdf"].nume+'</label><br>' : ''}
                       ${RIGHTS[getUserRank()]["change-to-redresdf"] ? '<input type="checkbox" id="redresdf" name="role" value="redresdf" '+(USER.ranks["redresdf"] ? 'checked' : '')+'><label for="redresdf">'+RANKS["redresdf"].nume+'</label><br>' : ''}
                       ${RIGHTS[getUserRank()]["change-to-redresaf"] ? '<input type="checkbox" id="redresaf" name="role" value="redresaf" '+(USER.ranks["redresaf"] ? 'checked' : '')+'><label for="redresaf">'+RANKS["redresaf"].nume+'</label><br>' : ''}
                       ${RIGHTS[getUserRank()]["change-to-mcaf"] ? '<input type="checkbox" id="mcaf" name="role" value="mcaf" '+(USER.ranks["mcaf"] ? 'checked' : '')+'><label for="mcaf">'+RANKS["mcaf"].nume+'</label><br>' : ''}
                       ${RIGHTS[getUserRank()]["change-to-mcdf"] ? '<input type="checkbox" id="mcdf" name="role" value="mcdf" '+(USER.ranks["mcdf"] ? 'checked' : '')+'><label for="mcdf">'+RANKS["mcdf"].nume+'</label><br>' : ''}
                       ${RIGHTS[getUserRank()]["change-to-evdf"] ? '<input type="checkbox" id="evdf" name="role" value="evdf" '+(USER.ranks["evdf"] ? 'checked' : '')+'><label for="evdf">'+RANKS["evdf"].nume+'</label><br>' : ''}
                       ${RIGHTS[getUserRank()]["change-to-evaf"] ? '<input type="checkbox" id="evaf" name="role" value="evaf" '+(USER.ranks["evaf"] ? 'checked' : '')+'><label for="evaf">'+RANKS["evaf"].nume+'</label><br>' : ''}
                            </div>
                            <button onclick="updateRanks()">Schimba</button>
                        </div>`)
            }
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

function finalizeazaFaraEvaluare(id){
    console.log(id)
    //fac referinta in db catre publicatia id
    //schimb stadiul publicatiei in 5
    //pun inapoi obiectul in db (salvez)
    database.ref(PUB+"/propuneri/"+id).once("value")
        .then((snapshot)=>{
            let propunere = snapshot.val()
            propunere.stadiu = 5

            let updates = {}
            updates[PUB+"/propuneri/"+id] = propunere
            database.ref().update(updates)

            $("#assign-article-"+id).html("Propunerea a fost finalizata")
            }
        )




    //
    // contributie.stadiu=5
}

function trimiteSpreEvaluare(id){
    console.log(id)

    //fac referinta in db catre publicatia id
    database.ref(PUB+"/propuneri/"+id).once("value")
        .then((snapshot)=>{
            let propunere = snapshot.val()
            propunere.stadiu = 2

            const eval1 = $(`#${propunere.id}-assign-evaluatori-1`).val()
            const eval2 = $(`#${propunere.id}-assign-evaluatori-2`).val()

            if(eval1 === "none" || eval2 === "none")
                return

            propunere.evaluare_1.evaluator = eval1
            propunere.evaluare_2.evaluator = eval2

            let updates = {}
            updates[PUB+"/propuneri/"+id] = propunere
            database.ref().update(updates)

            database.ref(`users/${eval1}`).once('value')
                .then((snap)=>{
                    let user = snap.val()
                    if(user.to_evaluate)
                        user.to_evaluate.push(`${id}-1-${PUB.toLowerCase()}`)
                    else
                        user.to_evaluate = [`${id}-1-${PUB.toLowerCase()}`]
                    updates = {}
                    updates[`users/${eval1}`] = user
                    database.ref().update(updates)
                })

            database.ref(`users/${eval2}`).once('value')
                .then((snap)=>{
                    let user = snap.val()
                    if(user.to_evaluate)
                        user.to_evaluate.push(`${id}-2`)
                    else
                        user.to_evaluate = [`${id}-2`]
                    updates = {}
                    updates[`users/${eval2}`] = user
                    database.ref().update(updates)

                    $("#assign-article-"+id).html("Propunerea a fost trimisa catre evaluare.")
                })
        })

    //fac referinta in db catre evaluatorul 1, ii adaug la array-ul to_evaluate un string de forma `${publicatie.id}-1`, salvez obiectul in db (update)
    //fac referinta in db catre evaluatorul 2, ii adaug la array-ul to_evaluate un string de forma `${publicatie.id}-2`, salvez obiectul in db (update)

}

function updateRanks(){
    let new_ranks = {
        "aaf" :  USER_RANKS["aaf"],
        "adf" :  USER_RANKS["adf"],
        "admin" : USER_RANKS["admin"],
        "evaf" :  document.getElementById("evaf").checked,
        "evdf" :  document.getElementById("evdf").checked,
        "mcaf" :  document.getElementById("mcaf").checked,
        "mcdf" :  document.getElementById("mcdf").checked,
        "redresaf" :  document.getElementById("redresaf").checked,
        "redresdf" :  document.getElementById("redresdf").checked,
        "rsdf" :  document.getElementById("rsdf").checked
    }
    let logs = []
    for(const [key,value] of Object.entries(new_ranks)){
        if(new_ranks[key] !== USER_RANKS[key]){
            if(USER_RANKS[key] === true)
                logs.push(`[delete-rank] ${USERS[getUserId()].nume} i-a sters lui ${USERS[USER_ID].nume} functia de ${RANKS[key].nume} la ${DateToString(new Date())}`)
            else
                logs.push(`[add-rank] ${USERS[getUserId()].nume} i-a adaugat lui ${USERS[USER_ID].nume} functia de ${RANKS[key].nume} la ${DateToString(new Date())}`)
        }
    }

    if(logs.length === 0){
        alert("Nu a avut loc nicio schimbare.")
    }
    else{
        //update user ranks
        let updates = {}
        updates[`users/${USER_ID}/ranks`] = new_ranks
        database.ref().update(updates)

        //update logs
        database.ref('logs').once('value')
            .then((snapshot)=>{
                let DBlogs = snapshot.val()
                if(!DBlogs)
                    DBlogs = logs
                else
                    DBlogs = DBlogs.concat(logs)

                updates = {}
                updates[`logs`] = DBlogs
                database.ref().update(updates)

                alert("Schimbarile au fost efectuate.")
            })
    }

}