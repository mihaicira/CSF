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
                <input type="nume" placeholder="Introdu nume" name="nume" >
            </div>

            <div>
                <b>Prenume</b>
                <input type="prenume" placeholder="Introdu prenume" name="prenume" >
            </div>

            <div>
                <b>Email</b>
                <input type="email" placeholder="Introdu email" name="email" >
            </div>
            <button  class="btn">Schimba date </button>
            <button type="button" class="btn cancel" onclick="closePopup()">Inchide</button>
        </div>`)


            //adaug functia mea cu care sunt logat
            document.getElementById("profile-rank").insertAdjacentHTML('beforeend',`<h3>${RANKS[getUserRank()].nume}</h3>`)

            const my_rank = getUserRank()
            const PUB = RANKS[getUserRank()]["df-contributii-finalizate-panel"] === true ? "DF" : "AF"
            const pub = PUB.toLowerCase()
            const Contributions = USER.contributions
            const Evaluations = USER.evaluations

            //contributiile mele
            if(RIGHTS[my_rank]["contributii-propuse-panel"] === true) {
                database.ref('DF/propuneri').once('value')
                    .then((snap) => {
                        const propuneri = snap.val()

                        Contributions.forEach((contrib) => {
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

            }
            //evaluarile mele
            //trebuie verificat daca rankul meu imi permite sa vad panelul asta

            if(RIGHTS[my_rank]["articole-evaluate-panel"] === true){

                document.getElementById("articole_evaluate_titlu").insertAdjacentHTML("beforeend",`<div>Articole evaluate</div>`)
                database.ref('DF/evaluari').once('value')
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

            // articole de evaluat

            if(RIGHTS[my_rank]["articole-de-evaluat-panel"] === true){

                document.getElementById("articole_de_evluat_titlu").insertAdjacentHTML("beforeend",`<div>Articole de evaluat</div>`)

                document.getElementById("articole_de_evaluat_lista").insertAdjacentHTML("beforeend", `
                      <div class="article-box">
                    <div>
                        <div class="text_nume_articol "> Nume articol</div>
                        <div class="text-secundar-articol">Propus in 14/05/2021</div>
                    </div>
                    <svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg>
                </div>
                        `)

            }


            // ARTICOLE CE TREBUIE ATRIBUITE EVALUATORILOR-

            if(RIGHTS[my_rank][`${pub}df-articole-assign-panel`] === true){

                document.getElementById("articole_evaluate_titlu").insertAdjacentHTML("beforeend",`<div>Articole ce trebuie atribuite evaluatorilor</div>`)

                document.getElementById("articole_evaluate_lista").insertAdjacentHTML("beforeend", `
                       <div class="assign-article-container">
                    <div>
                        <div class="assign-article-info-container">
                            <p>Nume articol &emsp; <svg class="redirect-svg" viewBox="0 0 25 25" fill="none"><path d="M23.8636 0.0303345H14.7727C14.1451 0.0303345 13.6363 0.527406 13.6363 1.14054C13.6363 1.75367 14.1451 2.25075 14.7727 2.25075H21.1202L9.42378 13.6779C8.97999 14.1114 8.97999 14.8143 9.42378 15.2479C9.64561 15.4646 9.93643 15.573 10.2273 15.573C10.5181 15.573 10.8089 15.4647 11.0308 15.2478L22.7273 3.82077V10.0221C22.7273 10.6352 23.2361 11.1323 23.8637 11.1323C24.4913 11.1323 25.0001 10.6352 25.0001 10.0221V1.14054C25 0.527406 24.4912 0.0303345 23.8636 0.0303345Z" fill="black"/><path d="M19.3182 11.1322C18.6906 11.1322 18.1818 11.6293 18.1818 12.2424V22.2342H2.27271V6.69143H12.5C13.1276 6.69143 13.6364 6.19436 13.6364 5.58123C13.6364 4.96809 13.1276 4.47107 12.5 4.47107H1.13638C0.508789 4.47107 0 4.96814 0 5.58128V23.3444C0 23.9575 0.508789 24.4545 1.13638 24.4545H19.3182C19.9458 24.4545 20.4546 23.9575 20.4546 23.3443V12.2424C20.4545 11.6293 19.9458 11.1322 19.3182 11.1322Z" fill="black"/></svg></p>
                            <p>Autor: Elton John</p>
                            <p>Propus in 13 Aprilie 2021, 21:21</p>
                            <p>btn</p>
                        </div>
                        <div class="assign-article-evals-container">
                            <p>Selecteaza evaluatori</p>
                            <div>
                                <label>Evaluator 1</label>
                                <select>
                                    <option value="bla">bla</option>
                                    <option value="bla">blablabla</option>
                                    <option value="bla">bla</option>
                                </select>

                            </div>
                            <div>
                                <label>Evaluator 2</label>
                                <select>
                                    <option value="bla">bla</option>
                                    <option value="bla">blablablablablabla blablablablablabla blablablablablabla</option>
                                    <option value="bla">bla</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button>Finalizeaza fara evaluare</button>
                        <button>Trimite spre evaluare</button>
                    </div>

                </div>
                        `)


            }


            //Contributii in curs de procesare

             if(RIGHTS[my_rank][`${pub}-contributii-wip-panel`] === true){

                    document.getElementById("articole_evaluate_titlu").insertAdjacentHTML("beforeend",`<div>Contributii in curs de procesare</div>`)

                    document.getElementById("articole_evaluate_lista").insertAdjacentHTML("beforeend", `
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

                document.getElementById("articole_finalizate_titlu").insertAdjacentHTML("beforeend",`<div>Contributii finalizate de mine</div>`)

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




