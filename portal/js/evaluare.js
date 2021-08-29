const EVAL_ID = location.search.slice(1).split("&")[0].split("=")[1]

database.ref("propuneri/"+EVAL_ID).once('value')
    .then((snapshot)=>{
        console.log(snapshot.val())
    })

function authorized(){
    //verifica daca contributia are status  2 sau 3
    //verifica daca userul este unul dintre evaluatori si daca nu cumva si-a efectuat deja evaluarea

    //pass

    //returneaza true / false
}