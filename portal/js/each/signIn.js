function signIn(){
    let email = document.querySelector("input[name='email']").value
    let password = document.querySelector("input[name='password']").value

    let accountData = {
        email:email,
        password: $.MD5(password),
        rank:null
    }

    document.getElementById("loadingAnimation").style.opacity="1"

    logIn(accountData)

    return false
}

