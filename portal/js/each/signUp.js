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
    let rank_aaf = false
    let rank_adf = false
    if(document.getElementById('MembruAF').checked){
        if(document.getElementById('MembruDF').checked) {
            rank_aaf = true
            rank_adf = true
        }
        else
            rank_aaf = true
    }
    else
        rank_adf = true

    database.ref("users").once("value")
        .then((snapshot)=>{
            const users = snapshot.val()
            let found= false

            if(users){
                for(const [id,user] of Object.entries(users))
                    if(user.email === email)
                        found = true
            }


            if (found){
                blinkError(LoginSignupErrors[4])
            }

            else{
                let accountData = {
                    email:email,
                    password: $.MD5(password),
                    nume: prenume + " " + nume,
                    ranks:{
                        "admin":false,
                        "rsdf":false,
                        "redresdf":false,
                        "redresaf":false,
                        "mcdf":false,
                        "mcaf":false,
                        "evdf":false,
                        "evaf":false,
                        "aaf":rank_aaf,
                        "adf":rank_adf,
                    }
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

$(document).ready(function () {
    $('.submit-btn').click(function() {
        let checked = $("input[type=checkbox]:checked").length;

        if(!checked) {
            alert("Trebuie sa selectati cel putin o redactie");
            return false;
        }
    });

});

