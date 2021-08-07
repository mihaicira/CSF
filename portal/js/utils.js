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

const sessionStorageLogIn = (data)=>{
    let sessionData = {
        isLogged: true,
        account:{
            email:data.email,
            password:data.password
        }
    }
    window.sessionStorage.setItem("accountStatus",sessionData)
}

const sessionStorageLogOut = ()=>{
    let data = {
        isLogged: false,
        account:null
    }
    window.sessionStorage.setItem("accountStatus",data)
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
                        sessionStorageLogIn(data)
                        window.location.href="./index.html"
                        console.log("found")
                    }
            })
            if(!USER_FOUND){
                console.log("not found")
            }
        })
}

const isUserLoggedIn = ()=>{
    // true daca este logat / false altfel
    if (window.sessionStorage.getItem("accountStatus") === null)
        return false
    else
        return window.sessionStorage.getItem("accountStatus").isLogged
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

