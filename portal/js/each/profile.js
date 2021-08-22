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
    USER = USERS.find(user => user.id == USER_ID)
    if(USER === undefined){
        console.log("not found")
    }
    else{
        document.getElementById("text_nume").innerText = USER.nume
        document.getElementById("text_nume").insertAdjacentHTML("afterend",`<a id="text_email" href="mailto:${USER.email}">${USER.email}</a>`)
        const TEMP_isItMe = true
        if(TEMP_isItMe){
            //adaug buton pt schimbare date

            //adaug formularul pt schimbare date

            //adaug functia mea cu care sunt logat

        }
        else{
            //adaug toate functiile mele din DB intr-un obiect separat, intre "profile-data-container" si "articles-container"
            
        }

        console.log("found")
    }
})
