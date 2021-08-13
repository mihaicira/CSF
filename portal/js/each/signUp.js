function signUp(){
    let prenume = document.querySelector("input[name='firstName']").value
    let nume = document.querySelector("input[name='lastName']").value
    let email = document.querySelector("input[name='email']").value
    let password = document.querySelector("input[name='password']").value

    if(!validateEmail(email)){
        blinkError(LoginSignupErrors[3])
        return false;
    }

    if(password.length <= 3){
        blinkError(LoginSignupErrors[1])
        return false;
    }

    if(password !== document.querySelector("input[name='confirmpassword']").value){
        blinkError(LoginSignupErrors[2])
        return false;
    }

    database.ref("users").once("value")
        .then((snapshot)=>{
            const users = snapshot.val()
            let found= false
            console.log(users)
            users.forEach((user)=>{
                if (user.email === email)
                    found = true
            })
            if (found){
                blinkError(LoginSignupErrors[4])
            }
            const ranks = [];
            //vezi ce pui in ranks RANKS["aaf"] / RANKS["adf"] / amandoua
            // if(aaf.selected)
            //     ranks.push(RANKS["aaf"])
            // if(adf.selected)
            //     ranks.push(RANKS["adf"])
             // ranks = [RANKS["aaf"], RANKS["adf"]]
            else{
                let accountData = {
                    email:email,
                    password: $.MD5(password),
                    nume: nume + " " + prenume,
                    rank:ranks
                }
                document.getElementById("loadingAnimation").style.opacity="1"
                createNewUser(accountData)
                setTimeout(()=>{
                    logIn(accountData)
                },2000)

            }
        })
    return false;
}
