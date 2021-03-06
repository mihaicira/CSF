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

const X_SVG = `<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">                    <g clip-path="url(#clip0)">                        <path d="M10.9181 5.09851L9.67517 3.90836C9.5037 3.74414 9.22529 3.74403 9.0537 3.90836L7.5 5.39603L5.94629 3.90836C5.77482 3.74414 5.49641 3.74403 5.32482 3.90836L4.08187 5.09851C3.91025 5.26281 3.91025 5.52924 4.08187 5.69357L5.63554 7.18124L4.08184 8.6689C3.91022 8.8332 3.91022 9.09964 4.08184 9.26396L5.32479 10.4541C5.49627 10.6183 5.77467 10.6184 5.94627 10.4541L7.5 8.96645L9.0537 10.4541C9.22517 10.6183 9.50358 10.6184 9.67517 10.4541L10.9181 9.26396C11.0897 9.09967 11.0897 8.83323 10.9181 8.6689L9.36445 7.18124L10.9182 5.69357C11.0897 5.52924 11.0897 5.26281 10.9181 5.09851ZM8.43222 6.88372C8.2606 7.04802 8.2606 7.31445 8.43222 7.47878L9.98593 8.96645L9.36445 9.56154L7.81075 8.07387C7.63913 7.90954 7.3609 7.90954 7.18927 8.07387L5.63557 9.56154L5.0141 8.96645L6.5678 7.47878C6.73942 7.31448 6.73942 7.04805 6.5678 6.88372L5.0141 5.39605L5.63557 4.80096L7.18927 6.28863C7.36087 6.45293 7.63913 6.45293 7.81075 6.28863L9.36445 4.80096L9.98593 5.39605L8.43222 6.88372Z" fill="black"/>                        <path d="M7.5 0C3.37034 0 0 3.22732 0 7.18124C0 11.1354 3.37058 14.3625 7.5 14.3625C11.6297 14.3625 15 11.1352 15 7.18124C15 3.2271 11.6294 0 7.5 0ZM7.5 13.5209C3.84911 13.5209 0.878906 10.677 0.878906 7.18124C0.878906 3.68552 3.84911 0.841551 7.5 0.841551C11.1509 0.841551 14.1211 3.68552 14.1211 7.18124C14.1211 10.677 11.1509 13.5209 7.5 13.5209Z" fill="black"/>                    </g>                    <defs>                        <clipPath id="clip0">                            <rect width="15" height="14.3625" fill="white"/>                        </clipPath>                    </defs>                </svg>`
const OK_SVG = `<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">                    <path d="M7.5 0C3.37034 0 0 3.22732 0 7.18124C0 11.1354 3.37058 14.3625 7.5 14.3625C11.6297 14.3625 15 11.1352 15 7.18124C15 3.2271 11.6294 0 7.5 0ZM7.5 13.5209C3.84911 13.5209 0.878906 10.677 0.878906 7.18124C0.878906 3.68552 3.84911 0.841551 7.5 0.841551C11.1509 0.841551 14.1211 3.68552 14.1211 7.18124C14.1211 10.677 11.1509 13.5209 7.5 13.5209Z" fill="black"/>                    <path d="M3.5 7L6 10.5L12 4" stroke="black"/>                </svg>`
const LINK_SVG = `<svg class="link-svg" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2727 0.847588H9.45451C9.05286 0.847588 8.72723 1.17886 8.72723 1.58748C8.72723 1.9961 9.05286 2.32738 9.45451 2.32738H13.5169L6.0312 9.94294C5.74717 10.2319 5.74717 10.7003 6.0312 10.9893C6.17317 11.1337 6.35929 11.206 6.54542 11.206C6.73154 11.206 6.9177 11.1338 7.0597 10.9892L14.5454 3.37371V7.50657C14.5454 7.91519 14.8711 8.24646 15.2727 8.24646C15.6744 8.24646 16 7.91519 16 7.50657V1.58748C16 1.17886 15.6744 0.847588 15.2727 0.847588Z" fill="black"/><path d="M12.3636 8.24645C11.962 8.24645 11.6363 8.57772 11.6363 8.98635V15.6453H1.45453V5.28691H8C8.40166 5.28691 8.72728 4.95564 8.72728 4.54701C8.72728 4.13839 8.40166 3.80715 8 3.80715H0.727281C0.325625 3.80715 0 4.13842 0 4.54705V16.3852C0 16.7938 0.325625 17.1251 0.727281 17.1251H12.3637C12.7653 17.1251 13.0909 16.7938 13.0909 16.3852V8.98635C13.0909 8.57772 12.7653 8.24645 12.3636 8.24645Z" fill="black"/></svg>`

let USERS;
if(RIGHTS[getUserRank()]["access-contrib-page-af"] || RIGHTS[getUserRank()]["access-contrib-page-df"]){
    database.ref("users").once("value")
        .then((snapshot)=>{
            USERS = snapshot.val()

            const OBJECTS = []
            database.ref("DF/propuneri").once("value")
                .then((snap)=>{
                    const data = snap.val()
                    if(data && RIGHTS[getUserRank()]["access-contrib-page-df"])
                    for(const [key,obj] of Object.entries(data)){
                        OBJECTS.push(obj)
                    }

                    //AF...
                    database.ref("AF/propuneri").once("value")
                        .then((ndsnap)=>{
                            const nddata = ndsnap.val()
                            if(nddata && RIGHTS[getUserRank()]["access-contrib-page-af"])
                                for(const [key,obj] of Object.entries(nddata)){
                                    OBJECTS.push(obj)
                                }

                            //after AF...
                            insertObjects(OBJECTS)
                        })
                })
        })
}
else{
    $(".contributii-container").html(`<h1>${GeneralErrors["not-authorized"]}</h1>`)
}



function insertObjects(objects){
    objects.sort((obj1,obj2)=>(StringToDate(obj1.data) < StringToDate(obj2.data)) ? 1 : -1)

    objects.forEach((obj)=>{

        //finalizat_de
        let finalizat_de = X_SVG
        if(obj.finalizatDe)
            finalizat_de = obj.finalizatDe.user_nume + ' (' +obj.finalizatDe.data  +')'
        //finalizat_de

        //eval
        let eval1name = "n/a"
        let eval1svg = X_SVG
        let eval2name= "n/a"
        let eval2svg = X_SVG
        if(obj.evaluare_1.completed) {
            eval1svg = `<a href="./evaluare.html?ID=${obj.id}&PUB=${obj.publicatie}&EV=1">${LINK_SVG}</a>`
        }
        if(obj.evaluare_1.evaluator!=="none"){
            eval1name = USERS[obj.evaluare_1.evaluator].nume;
        }
        if(obj.evaluare_2.completed) {
            eval2svg =  `<a href="./evaluare.html?ID=${obj.id}&PUB=${obj.publicatie}&EV=2">${LINK_SVG}</a>`
        }
        if(obj.evaluare_2.evaluator!=="none"){
            eval2name = USERS[obj.evaluare_2.evaluator].nume;
        }
        //eval


        document.getElementsByTagName("table")[0].insertAdjacentHTML("beforeend",`
                        <tr>
                            <td><a href="../profile.html?user=${obj.id_autor}" target="_blank">${obj.autor}</a></td>
                            <td>${obj.publicatie}</td>
                            <td>${eval1name}</td>
                            <td>${eval1svg}</td>
                            <td>${eval2name}</td>
                            <td>${eval2svg}</td>
                            <td>${obj.stadiu}</td>
                            <td>${obj.data}</td>
                            <td>${finalizat_de}</td>
                            <td><a href="./propunereFull.html?id=${obj.id}&pub=${obj.publicatie}">${LINK_SVG}</a></td>
                        </tr>
                        `)
    })
}