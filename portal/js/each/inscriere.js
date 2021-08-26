$("form").submit(function (e){
    e.preventDefault()

    //database prepare
    let formData = {
        user_id:getUserId(),
        afilierea:document.querySelector("input[id='afiliere']").value,
        statut:document.querySelector("input[id='statut']").value,
        titlu:document.querySelector("input[id='titlu']").value,
        sectiune_colocviu:document.querySelector("input[id='sectiune']").value,
        rezumat: getTextValue($("#rezumat")),
        cuv_cheie: getTextValue($("#cuvintecheie")),
        bibliografie: getTextValue($("#bibliografie")),
        nota_bibliografica: getTextValue($("#notabiobibliografica"))
    }

    // database send
    database.ref("cieft").once('value')
        .then((snapshot)=>{
            let users = snapshot.val()
            if(users === null){
                 users = [formData]
            }
            else{
                users.push(formData)
            }

            //saving
            let updates = {}
            updates['/cieft'] = users
            database.ref().update(updates)
        })

})