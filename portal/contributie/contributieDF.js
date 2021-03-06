let FISIER_PROPUNERE_DOC = {
    file: "n/a",
    extension: "n/a"
}
var FISIER_NOTABIBLIOGRAFICA_DOC = {
    file: "n/a",
    extension: "n/a"
};

function changeButton(){
    if(isUserLoggedIn()){
        document.getElementById("header-second-line").insertAdjacentHTML('beforeend',`<button onclick='window.location.href="../profile.html?user=${getUserId()}"'>Page de profile</button>`)
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",`<p id='connected-as' ">Connexion en tant que  ${RANKS[getUserRank()].nume} </button>` )
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Déconnexion</button>' )
    }

    else{
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Connexion </button>' )
    }
}
changeButton()


var autor;

document.getElementById('articol-fisier').addEventListener('change', function (e){
    const extension = e.target.files[0].name.split(".")[1]
    if(["docx","doc"].includes(extension))
        FISIER_PROPUNERE_DOC.file = e.target.files[0];
    else{
        $("#articol-fisier").val('')
        alert("Files must have .doc / .docx extension")
    }
    FISIER_NOTABIBLIOGRAFICA_DOC.extension = extension
});

document.getElementById('nota-fisier').addEventListener('change', function (e){
    const extension = e.target.files[0].name.split(".")[1]
    if(["docx","doc"].includes(extension))
        FISIER_NOTABIBLIOGRAFICA_DOC.file = e.target.files[0];
    else{
        $("#nota-fisier").val('')
        alert("Files must have .doc / .docx extension")
    }
    FISIER_PROPUNERE_DOC.extension = extension

});


$("#formular-container>form").submit(function(e) {
    //prevent page from refreshing
    e.preventDefault();

    /*****DATABASE PREPARE******/
    const propunereID = generateId()
    const fisier_propunere = propunereID + "-df-" + getUserId()+"-propunere."+FISIER_PROPUNERE_DOC.extension
    const fisier_notabibliografica =propunereID + "-df-" + getUserId() +"-notabibliografica."+FISIER_NOTABIBLIOGRAFICA_DOC.extension

    let autori_secundari = []
    for(let i = 0 ; i < $("#persons-table>tr").length ; i++)
        autori_secundari.push({
            nume:$("#persons-table>tr")[i].children[0].innerHTML,
            email:$("#persons-table>tr")[i].children[1].innerHTML,
            rol:$("#persons-table>tr")[i].children[2].innerHTML
        })


    const realtimeDatabaseForm = {
        publicatie: "DF", //!!!
        id: propunereID,//!!!
        id_autor: getUserId(),//!!!!
        stadiu: 1,//!!!
        autor: JSON.parse(window.sessionStorage.getItem("accountStatus")).account.nume,
        autori_secundari: autori_secundari,
        limba_articol: getDropdownValue('limba-articol'),
        rubrica: getDropdownValue('rubrica'),
        calitate: document.querySelector("input[name='calitate']").value,
        fisier_propunere: fisier_propunere,
        fisier_nota: fisier_notabibliografica,
        articol_initial: getDropdownValue('Articol-initial'),
        titlu: document.querySelector("input[id='titlu']").value,
        subtitlu: document.querySelector("input[id='sub-titlu']").value,
        rezumat: getTextValue($("#titlu")),
        limba: getDropdownValue('limba-dwn'),
        cuvinte_cheie: getTextValue($("#cuvinte-cheie")),
        referinte: getTextValue($("#referinte")),
        data:DateToString(new Date()),
        evaluare_1:{
            completed:false,
            evaluator:"none"
        },
        evaluare_2:{
            completed:false,
            evaluator:"none"}
    }

    console.log(realtimeDatabaseForm)
    /*****DATABASE UPLOAD******/

    //upload data
    uploadDataToDF(realtimeDatabaseForm)

    //upload file

    uploadFileToDF(FISIER_PROPUNERE_DOC.file,fisier_propunere)
    uploadFileToDF(FISIER_NOTABIBLIOGRAFICA_DOC.file,fisier_notabibliografica)


    //update user contributions list
    database.ref(`users/${getUserId()}`).once("value")
        .then((snapshot)=>{
            let user = snapshot.val()
            if(user.contributions)
                user.contributions.push(propunereID+'-df')
            else
                user.contributions = [propunereID+'-df']

            if(!user.ranks["adf"]) user.ranks["adf"] = true

            let updates = {}
            updates[`users/${getUserId()}`] = user
            database.ref().update(updates)
        })
});

function deleteId(id){
    $("#"+id).remove()
    if(document.querySelector("#persons-table>tr") === null)
        $("#persons-table").css("opacity","0")

}

$("#addPerson").click(()=>{
    const id = generateId();
    const name = $("#fill-person-name").val();
    const contact = $("#fill-person-contact").val();
    const role = $("#fill-person-role").val();

    if(name.trim() === "") return;
    if(contact.trim() === "") return;
    if(role.trim() === "") return;

    $("#persons-table").append(`
      <tr id="${id}">
        <td>${name}</td>
        <td>${contact}</td>
        <td>${role}</td>
        <td><button onclick="deleteId('${id}')" type="button"></button></td>
      </tr>
    `)

    $("#persons-table").css("opacity","1")

    $("#fill-person-name").val("");
    $("#fill-person-contact").val("");
    $("#fill-person-role").val("");

})



function uploadFileToDF(file,name){
    var storageRef = firebase.storage().ref('DF/'+ name);
    storageRef.put(file)
        .then((snapshot)=>{
            //pass
            console.log("done")
            //success
        })
        .catch((e)=>{
            console.log(e)
        })
}

function uploadDataToDF(object) {
    var ref = database.ref("DF/propuneri/"+object.id)
    ref.set(object)
        .then((snapshot)=>{
            $("#formular-container").html(`<h1>${FormEnds['prop']}</h1>`)
        })
        .catch((e)=>{
            console.log("Error: ",e)
            alert("An error has occured. Please don't close the page and contact the support team.")
        })
}