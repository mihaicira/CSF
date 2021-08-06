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
        nume: "none",
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

    database.ref('users/'+userId).set(User)
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

