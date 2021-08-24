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
            document.getElementById("profile-rank").insertAdjacentHTML('beforeend',`<h3>${getUserRank().id}</h3>`)

        }
        else{
            raiseUserNotFound()
        }

    }
})


function raiseUserNotFound(){
    document.getElementsByClassName("profile_box")[0].innerHTML = `
                    <img src="./media/profile_page_top.jpg" id="top_imag">
                        <div class="profile-data-container">
                            <div class="profile-data">
                                <p id="text_nume">Utilizatorul nu a fost gasit.</p>
                            </div>
                        </div>`
}




