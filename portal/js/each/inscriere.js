$("form").submit(function (e){
    e.preventDefault()

    //database prepare
    console.log("testtttttttttttt")
    let formData = {
        blabla:"blabla"
    }

    // database send
    // database.ref("cieft").once('value')
    //     .then((snapshot)=>{
    //         let users = snapshot.val()
    //         if(users === null){
    //             //primul, users = [obj]
    //         }
    //         else{
    //             //push in array, users = [..., obj]
    //         }
    //
    //         //saving
    //         let updates = {}
    //         updates['/cieft'] = users
    //         database.ref().update(updates)
    //     })

})


