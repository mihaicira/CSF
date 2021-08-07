function signUp(){
    let nume = document.querySelector("input[name='name']").value
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
            else{
                createNewUser({
                    email:email,
                    password: $.MD5(password),
                    nume: nume
                })
            }
        })



    return false;
}

function blinkError(err){
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