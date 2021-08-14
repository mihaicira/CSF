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


    const ranks = [];
    //vezi ce pui in ranks RANKS["aaf"] / RANKS["adf"] / amandoua
    if(document.getElementById('MembruAF').checked){
        if(document.getElementById('MembruDF').checked)
            ranks.push(RANKS["aaf"],RANKS["adf"])
        else
            ranks.push(RANKS["aaf"])
    }else
        ranks.push(RANKS["adf"])

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

            else{
                let accountData = {
                    email:email,
                    password: $.MD5(password),
                    nume: nume + " " + prenume,
                    rank:ranks
                }
                document.getElementById("loadingAnimation").style.opacity="1"
                createNewUser(accountData)
                accountData.rank = null;
                setTimeout(()=>{
                    logIn(accountData)
                },2000)

            }
        })
    return false;
}

$(document).ready(function () {
    $('.submit-btn').click(function() {
        let checked = $("input[type=checkbox]:checked").length;

        if(!checked) {
            alert("Trebuie sa selectati cel putin un rol: Membru DF / Membru AF");
            return false;
        }
    });

});

