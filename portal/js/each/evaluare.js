const EVAL_ID = location.search.slice(1).split("&")[0].split("=")[1]
const PUB = location.search.slice(1).split("&")[1].split("=")[1]

database.ref(PUB+"/propuneri/"+EVAL_ID).once('value')
    .then((snapshot)=>{
        console.log(snapshot.val())
        //daca nu exista propunere, stergi animatia, pui mesaj

        //daca exista: stergi animatia, momentan atat {... verificari cu authorized() ...}
    })


function authorized(){
    //verifica daca contributia are status  1 sau 2
    //verifica daca userul este unul dintre evaluatori si daca nu cumva si-a efectuat deja evaluarea

    //pass

    //returneaza true / false
}