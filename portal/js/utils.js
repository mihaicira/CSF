

const generateId = ()=>{return Date.now()}

const createNewUser = (data) =>{
    //param data = dictionar care contine datele preluate din formularul de Sign Up
    const userId = generateId()

    const User = {
        id: userId,
        email: data.email,
        password: data.password,
        nume: data.nume,
        ranks:data.rank,
        contributions:[],
        evals:[],
        needToEval:[],
        finishedByMe:[]
    }

    database.ref('users').once("value")
        .then((snapshot)=>{
            const USERS = snapshot.val()
            console.log(User)
            USERS.push(User)
            let updates = {}
            updates["/users"] = USERS
            database.ref().update(updates)
        })
    return true;
}

const sessionStorageLogIn = (data)=>{
    let localData = {
        isLogged: true,
        account:{
            id:data.id,
            nume:data.nume,
            email:data.email,
            password:data.password,
            rank:data.rank
        }
    }
    window.sessionStorage.setItem("accountStatus",JSON.stringify(localData))
}

const sessionStorageLogOut = ()=>{
    let data = {
        isLogged: false,
        account:null
    }
    window.sessionStorage.setItem("accountStatus",JSON.stringify(data))
    //let obj = JSON.parse(...)
}

const LogOut = ()=>{
    sessionStorageLogOut()
    window.location.reload()
}

const logIn = (data,login=true) => {
    //param = un dictionar cu doua keys: mail & pass
    //verifica daca exista mailul respectiv in baza de date. Daca exista, verifica parolele.
    database.ref("users").once('value')
        .then((snapshot)=>{
            const Users = snapshot.val()
            let USER_FOUND = false
            Users.forEach((user)=>{
                if(user.email === data.email)
                    if(user.password === data.password){
                        data['nume']=user.nume
                        data['id']=user.id
                        sessionStorageLogIn(data)
                        window.location.href="./index.html"
                        USER_FOUND = true
                    }
            })
            if(!USER_FOUND){
                blinkError(LoginSignupErrors[5])
            }
        })
}

function getUserId(){
    return JSON.parse(window.sessionStorage.getItem("accountStatus")).account.id
}

function getUserRank(){
    return JSON.parse(window.sessionStorage.getItem("accountStatus")).account.rank
}

const isUserLoggedIn = ()=>{
    // true daca este logat / false altfel
    if(JSON.parse(window.sessionStorage.getItem("accountStatus"))=== null ){
        // verificam daca are ceva in local storage, daca nu are nimic punem isLogged=false si return false
        sessionStorageLogOut()
        return false
    }
    else
        // stim ca accountStatus nu e null deci in isLogged poate fi ori true ori fals, returnam oricare ar fi
        return JSON.parse(window.sessionStorage.getItem("accountStatus")).isLogged
}

function validateEmail(email) {
    // true daca adresa de email este valida
    // false altfel
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function minimizeNavbar(){
    document.getElementById("header-first-line").style.height = "7vh";
    document.getElementById("header-second-line").style.height= "5vh";
    document.getElementById("header-second-line").style.top= "7vh";
}

function maximizeNavbar(){
    document.getElementById("header-first-line").style.height = "12vh";
    document.getElementById("header-second-line").style.height= "8vh";
    document.getElementById("header-second-line").style.top= "12vh";
}

function blinkError(err){
    //folosit la formularele de login / sign up, afiseaza erori in functie de caz
    let blink = document.getElementById("form-error")
    blink.innerText = err
    blink.style.opacity = "1"
    setTimeout(()=>{
        blink.style.opacity = "0"
        setTimeout(()=>{
            blink.style.opacity = "1"
            setTimeout(()=>{
                blink.style.opacity = "0"
            },1500)
        },700)
    },1500)
}

function verifyIfUserHasRank(){
    // let rank = sessionStorage.parse...
        return true
}

function DateToString(date){
    let info= date.toString().split(" ")
    let day= info[2]
    let month= months_short[info[1]]
    let year= info[3]
    let hour= info[4].split(":")[0]
    let min= info[4].split(":")[1]
    let dateString = day+" "+month+" "+year+", "+hour+":"+min

    return dateString
}

function StringToDate(date){
    let info= date.split(" ")
    return new Date(info[2].slice(0,-1),months_num[info[1]],info[0],info[3].split(":")[0],info[3].split(":")[1])
}

function openPopUp() {
    document.getElementById("myForm").style.transform = "rotateX(0deg)";
    document.getElementById("myForm").style.pointerEvents="initial"
}

function closePopup() {
    document.getElementById("myForm").style.transform = "rotateX(90deg)";
    document.getElementById("myForm").style.pointerEvents="none"
}

function getDropdownValue(id){
    return $(`#${id}`).find(":selected").text()
}

function getTextValue(elem){
    const value = elem.val()
    return value
}



if(!verifyIfUserHasRank()){
    redirect(chooserank)
}


