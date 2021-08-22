var FILE_UPLOAD;
var FILE2_UPLOAD;

var autor,autori;


function scrollToAutori(){
    $('html, body').animate({
        scrollTop: ($("#persons-table").offset().top-200)
    }, 100);
}

function autoriCorespondentiCheck(){
    var rows = document.getElementById("persons-table").querySelectorAll("tr");
    var Autori =[];

    for (var i = 1; i < rows.length; i+=1) {
        var DATA = rows[i].querySelectorAll("td");
        Autori.push([DATA[0].innerText,DATA[1].innerText,DATA[2].innerText,DATA[3].firstChild.checked ])
    }
    if(Autori.length === 0) {
        scrollToAutori()
        alert("Vă rugăm adăugați autori.")
        return false;
    }
    var autoriCorespondenti = 0
    Autori.forEach((each)=>{
        if(each[3] === true){
            autoriCorespondenti += 1
            autor = each[0]
        }

    })

    if(autoriCorespondenti === 0){
        scrollToAutori()
        alert("Vă rugăm bifați un autor ca fiind corespondent.")
        return false;
    }

    if(autoriCorespondenti > 1){
        scrollToAutori()
        alert("O singura persoana poate fi autor corespondent.")
        return false;
    }


    autori = Autori
    console.log(autori)
    return true;
}

document.getElementById('articol-fisier').addEventListener('change', function (e){
    const extension = e.target.files[0].name.split(".")[1]
    if(["docx","doc"].includes(extension))
        FILE_UPLOAD = e.target.files[0];
    else{
        $("#articol-fisier").val('')
        alert("Files must have .doc / .docx extension")
    }
});

document.getElementById('nota-fisier').addEventListener('change', function (e){
    const extension = e.target.files[0].name.split(".")[1]
    if(["docx","doc"].includes(extension))
        FILE2_UPLOAD = e.target.files[0];
    else{
        $("#nota-fisier").val('')
        alert("Files must have .doc / .docx extension")
    }

});

function getDropdownValue(id){
    return $(`#${id}`).find(":selected").text()
}

function getTextValue(elem){
    const value = elem.val()
    return value
}

$("#formular-container>form").submit(function(e) {
    //prevent page from refreshing
    e.preventDefault();

    /*****DATABASE PREPARE******/
    const propunereID = generateId()
    const fisier_propunere = propunereID + "-df-" + "userId"+"-propunere"
    const fisier_notabibliografica =propunereID + "-df-" + "userId"+"-notabibliografica"


    const realtimeDatabaseForm = {
        autor: JSON.parse(window.sessionStorage.getItem("accountStatus")).account.nume,
        limba_articol: getDropdownValue('limba-articol'),
        rubrica: getDropdownValue('rubrica'),
        calitate: document.querySelector("input[name='calitate']").value,
        // cale_fisier: file1,
        // cale_nota: file2,
        articol_initial: getDropdownValue('Articol-initial'),
        titlu: document.querySelector("input[id='titlu']").value,
        subtitlu: document.querySelector("input[id='sub-titlu']").value,
        rezumat: getTextValue($("#titlu")),
        limba: getDropdownValue('limba-dwn'),
        cuvinte_cheie: getTextValue($("#cuvinte-cheie")),
        referinte: getTextValue($("#referinte")),
        data:DateToString(new Date())
    }

    console.log(realtimeDatabaseForm)
    /*****DATABASE UPLOAD******/

    //upload data

    //upload file

    //update user contributions list

    //
    // uploadFile(FILE_UPLOAD,file1);
    //
    // uploadFile(FILE2_UPLOAD,file2);
    //
    // uploadData(realtimeDatabaseForm);

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

function changeButton(){
    if(isUserLoggedIn())
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Deconecteaza-te </button>' )
    else
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'../login.html\'">Conecteaza-te </button>' )
}
changeButton()


function uploadFileToDF(file,path){
    console.log("path: ",path)
    var storageRef = firebase.storage().ref('DF/'+ path);
    storageRef.put(file)
        .then((snapshot)=>{
            //pass
            //success
        })
}

function uploadDataToDF(object) {
    //Send to firebase
    const path = 'reviste/df/'+new Date().getFullYear()

    var ref = firebase.database().ref(path)
    ref.push(object)
        .then((snapshot)=>{
            $("#formular-container").css("animation","1s rotate-form forwards linear")
            window.scrollTo(0,0);
            setTimeout(()=>{
                $("#formular-container>h2").remove();
                $("#formular-container>form").remove();
            },500)
        })
        .catch(()=>{
            console.log("error")
        })
        .finally(()=>{
            console.log("finally")
        })
}