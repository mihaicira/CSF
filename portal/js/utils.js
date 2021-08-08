const generateId = ()=>{return Date.now()}

const createNewUser = (data) =>{
    //param data = dictionar care contine datele preluate din formularul de Sign Up
    const userId = generateId()

    const User = {
        id: userId,
        email: data.email,
        password: data.password,
        nume: data.nume,
        rankDF:{
            id: 999,
            nume: RANKS["999"]
        },
        rankAF:{
            id: 999,
            nume: RANKS["999"]
        },
        contributions:[],
        evals:[],
        needToEval:[],
        finishedByMe:[]
    }

    database.ref('users').once("value")
        .then((snapshot)=>{
            const USERS = snapshot.val()
            USERS.push(User)
            let updates = {}
            updates["/users"] = USERS
            database.ref().update(updates)
        })
    return true;
}

const localStorageLogIn = (data)=>{
    let localData = {
        isLogged: true,
        account:{
            email:data.email,
            password:data.password
        }
    }
    window.localStorage.setItem("accountStatus",JSON.stringify(localData))

}

const localStorageLogOut = ()=>{
    let data = {
        isLogged: false,
        account:null
    }
    window.localStorage.setItem("accountStatus",JSON.stringify(data))
    //let obj = JSON.parse(...)
}

const LogOut = ()=>{
    localStorageLogOut()
    window.location.reload()
}


const logIn = (data) => {
    //param = un dictionar cu doua keys: mail & pass
    //verifica daca exista mailul respectiv in baza de date. Daca exista, verifica parolele.
    database.ref("users").once('value')
        .then((snapshot)=>{
            const Users = snapshot.val()
            let USER_FOUND = false
            Users.forEach((user)=>{
                if(user.email === data.email)
                    if(user.password === data.password){
                        USER_FOUND = true
                        localStorageLogIn(data)
                        window.location.href="./index.html"
                        console.log("found")
                    }
            })
            if(!USER_FOUND){
                blinkError(LoginSignupErrors[5])
            }
        })
}

const isUserLoggedIn = ()=>{
    // true daca este logat / false altfel

    if(JSON.parse(window.localStorage.getItem("accountStatus"))=== null ){
        // verificam daca are ceva in local storage, daca nu are nimic punem isLogged=false si return false
        localStorageLogOut()
        return false
    }

    else
        // stim ca accountStatus nu e null deci in isLogged poate fi ori true ori fals, returnam oricare ar fi
        return JSON.parse(window.localStorage.getItem("accountStatus")).isLogged
}

const dict = {"email":"admin@admin","password":"None"}
const dict2 = {"email":"admin@admin","password":"admin@admin"}

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



