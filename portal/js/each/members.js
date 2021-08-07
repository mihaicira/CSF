function fetch_members(){
    database.ref("users").once("value")
        .then((snapshot)=>{
            const users = snapshot.val()
            users.forEach((user)=>{
                if (user.id !== "0"){
                    let nume = user.nume
                    let rankDF = user.rankDF.id !== 999 ? `(${user.rankDF.nume})` : "";
                    let rankAF = user.rankAF.id !== 999 ? `(${user.rankAF.nume})` : "";
                    console.log("Nume: ",nume ," ",rankDF," ",rankAF)
                }
            })
        })
    return true
}