const generateId = ()=>{
    //returneaza un string de 10 caractere, fiecare caracter fiind un element random din multimea {0...9,a...Z}
    const numbers = "0123456789"
    const lowerCase = "abcdefghijklmnopqrstuvwxyz"
    const upperCase = lowerCase.toUpperCase()
    const randomness = numbers + lowerCase + upperCase

    return "pass";
}

const createNewUser = (data) =>{
    //param data = dictionar care contine datele preluate din formularul de Sign Up
    const userId = generateId()

    const User = {
        id: userId,
        email: "none",
        password: "none",
        nume: data.nume,
        rankDF:{
            id: 909,
            name: RANKS["999"]
        },
        rankAF:{
            id: 909,
            name: RANKS["999"]
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

const sessionStorageLogIn = (email,pass)=>{
    let data = {
        isLogged: "false",
        account:{
            email:email,
            password:pass
        }
    }
    window.sessionStorage.setItem("accountStatus",data)
}

const sessionStorageLogOut = ()=>{
    let data = {
        isLogged: "false",
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
                        console.log("found")
                    }
            })
            if(!USER_FOUND){
                console.log("not found")
            }
        })
}

const dict = {"email":"admin@admin","password":"None"}
const dict2 = {"email":"admin@admin","password":"admin@admin"}

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

