let CORRECT_URL = true
let EVAL_ID = "", PUB = "", EV = "";
let FISIER_ADNOTARI_DOC = {
    file: "n/a",
    extension: "n/a"
}
try{
     EVAL_ID = location.search.slice(1).split("&")[0].split("=")[1]
     PUB = location.search.slice(1).split("&")[1].split("=")[1]
     EV = location.search.slice(1).split("&")[2].split("=")[1]
}
catch{
    CORRECT_URL = false
}


const FORMULAR = `
<h2>Formular pentru evaluarea contributiilor</h2>
<form>
   <p>*Toate câmpurile sunt obligatorii.</p>
   <h3>SOLICITARE DE EVALUARE</h3>
   <h4>&emsp;&emsp;Ați fost desemnat ca potențial evaluator al articolului supus atenției redacției revistei Dialogues francophones. Rezumatul propunerii și datele de evaluare sunt prezentate în continuare. Sperăm că veți accepta să faceți evaluarea acestui articol.</h4>
   <h4>Rezumatul propunerii</h4>
   <p><i id="autocomplete-rezumat"></i></p>
   <h4>Tip de evaluare: evaluator anonim, contribuție anonimizată </h4>
   <p>Detalii privitoare la articolul supus evaluării<br>            Calendar (input cu data) – aici trebuie sa fie doua<br>            Unu pentru “termenul de acceptare a invitației de a evalua”<br>            Si ”termenul de predare a raportului de evaluare”<br>        </p>
   <h3>ACORD-CADRU</h3>
   <h4>Politica editorială a revistei. Metodologie de evaluare</h4>
   <p>  &emsp;&emsp;Revista Dialogues francophones  stabilește o temă pentru fiecare număr prin consultarea membrilor comitetului științific. Calitatea articolelor publicate în Dialogues francophones rezultă din evaluarea temeinică a contribuțiilor trimise pe adresa revistei.<br>            &emsp;&emsp;Textele trimise pe adresa redacției sunt evaluate, în prima etapă, de comitetul de redacției al Dialogues francophones pentru a stabili gradul de adecvare la tematica anunțată.<br>            &emsp;&emsp;Redacția Dialogues francophones trimite textele evaluatorilor după obținerea raportului de originalitate (Ithenticate, Turnitin etc.) pentru fiecare articol.<br>            &emsp;&emsp;Evaluarea dublu anonimizată – a autorului și a evaluatorilor – este efectuată de cel puțin doi cercetători în domeniu (alții decât membrii comitetului de redacție), membri în comitetul științific sau experți la care se apelează ocazional.<br>            &emsp;&emsp;În fiecare număr al revistei, lista evaluatorilor este actualizată.<br>            &emsp;&emsp;În procesul de evaluare, membrii comitetului științific și experții-evaluatori ad hoc au în vedere următoarele criterii :<br>            &emsp;&emsp;&emsp;&emsp;1.&emsp;Respectarea protocolului de tehnoredactare (nerespectarea antrenează respingerea automată a articolului)<br>            &emsp;&emsp;&emsp;&emsp;2.&emsp;Originalitatea subiectului tratat în articolul supus evaluării<br>            &emsp;&emsp;&emsp;&emsp;3.&emsp;Adecvarea acestuia la tematica numărului<br>            &emsp;&emsp;&emsp;&emsp;4.&emsp;Relevanța studiului propus, problematica și argumentarea<br>            &emsp;&emsp;&emsp;&emsp;5.&emsp;Calitatea resurselor bibliografice.<br>            &emsp;&emsp;•&emsp;Se apreciază:<br>            &emsp;&emsp;&emsp;&emsp;&bull;&emsp;Părțile originale și corect editate în materialul supus evaluării,<br>            &emsp;&emsp;&emsp;&emsp;&bull;&emsp;Referințele bibliografice primare, exegeza acestora dacă o impune subiectul;<br>            &emsp;&emsp;&emsp;&emsp;&bull;&emsp;Bunele practici în materie de integritate în prezentarea rezultatelor de cercetare<br>            &emsp;&emsp;•&emsp;Se sancționează:<br>            &emsp;&emsp;&emsp;&emsp;&bull;&emsp;absența surselor primare din bibliografie  în favoarea referințele bibliografice secundare,<br>            &emsp;&emsp;&emsp;&emsp;&bull;&emsp;dubla citare incomplet semnalată,<br>            &emsp;&emsp;&emsp;&emsp;&bull;&emsp;preluarea de idei cât și preluarea de text fără citările de rigoare,<br>            &emsp;&emsp;&emsp;&emsp;&bull;&emsp;citatele care depășesc 10 rânduri;<br>            <br><br>Toți colaboratorii  vor fi informați cu privire la acceptarea sau refuzul propunerii lor prin intermediul platformei Dialogues francophones .        </p>
   <br><br>
   <hr>
   <br><br>        
   <h3>DESCĂRCARE ȘI EVALUARE</h3>
   <h4>Descarcare:</h4>
   <p id="fill-download-link"></p>
   <h4>Evaluarea:</h4>
   <h4>Articolul supus evaluării corespunde ariei dumneavoastră de competență?</h4>
   <input type="radio" id="Da1"  name="arie_competenta" value="Da" required>        <label for="Da1">Da</label>        <br>        <input type="radio" id="Nu1" name="arie_comepetenta" value="Nu">        <label for="Nu1">Nu</label>        
   <h4>Este titlul articolului clar, informativ  și conform propunerii pe care o anunță?</h4>
   <input type="radio" id="Da2"  name="conformitate_titlu" value="Da" required>        <label for="Da2">Da</label>        <br>        <input type="radio" id="Nu2" name="conformitate_titlu" value="Nu">        <label for="Nu2">Nu</label>        
   <h4>Rezumatul poate fi considerat complet?</h4>
   <input type="radio" id="Da3"  name="completitudine_rezumat" value="Da" required>        <label for="Da3">Da</label>        <br>        <input type="radio" id="Nu3" name="completitudine_rezumat" value="Nu">        <label for="Nu3">Nu</label>        
   <h4>Cuvintele cheie sunt adecvate propunerii de articol?</h4>
   <input type="radio" id="Perfect adecvate"  name="cuv_cheie_adecvate" value="Perfect adecvate" required>        <label for="Perfect adecvate">Perfect adecvate</label>        <br>        <input type="radio" id="Suficient de adecvate" name="cuv_cheie_adecvate" value="Suficient de adecvate">        <label for="Suficient de adecvate">Suficient de adecvate</label>        <br>        <input type="radio" id="Parțial adecvate"  name="cuv_cheie_adecvate" value="Parțial adecvate">        <label for="Parțial adecvate">Parțial adecvate</label>        <br>        <input type="radio" id="Insuficient adecvate" name="cuv_cheie_adecvate" value="Insuficient adecvate">        <label for="Insuficient adecvate">Insuficient adecvate</label>        <br>        
   <h4>Originalitatea conținutului?</h4>
   <input type="radio" id="Complet original"  name="originalitate" value="Complet original" required>        <label for="Complet original">Complet original</label>        <br>        <input type="radio" id="original2" name="originalitate" value="Idei originale imbricate într-un text care sintetizează teorii arhicunoscute, inedită interpretare a corpusului">        <label for="original2">Idei originale imbricate într-un text care sintetizează teorii arhicunoscute, inedită interpretare a corpusului</label>        <br>        <input type="radio" id="original3" name="originalitate" value="Modeste elemente de originalitate: reproducere a unor idei comune, sinteză a punctelor de vedere teoretice urmată de o analiză de corpus">        <label for="original3">Modeste elemente de originalitate: reproducere a unor idei comune, sinteză a punctelor de vedere teoretice urmată de o analiză de corpus</label>        <br>        <input type="radio" id="original4" name="originalitate" value="Lipsit de originalitate">        <label for="original4">Lipsit de originalitate</label>        
   <h4>Actualitatea și relevanța cercetării relatate în acest articol?</h4>
   <input type="radio" id="actualitate1"  name="actualitate" value="Perfect actuală și relevantă" required>        <label for="actualitate1">Perfect actuală și relevantă</label>        <br>        <input type="radio" id="actualitate2" name="actualitate" value="Actuală și suficient de relevantă">        <label for="actualitate2">Actuală și suficient de relevantă</label>        <br>        <input type="radio" id="actualitate3" name="actualitate" value="Parțial relevantă, nonactuală">        <label for="actualitate3">Parțial relevantă, nonactuală</label>        <br>        <input type="radio" id="actualitate4" name="actualitate" value="Lipsă de relevanță și de actualitate">        <label for="actualitate4">Lipsă de relevanță și de actualitate</label>        
   <h4>Coerența și argumentația </h4>
   <input type="radio" id="fb1"  name="coerenta" value="Foarte bine" required>        <label for="fb1">Foarte bine</label>        <br>        <input type="radio" id="b1" name="coerenta" value="Bine">        <label for="b1">Bine</label>        <br>        <input type="radio" id="s1" name="coerenta" value="Suficient">        <label for="s1">Suficient</label>        <br>        <input type="radio" id="i1" name="coerenta" value="Insuficient">        <label for="i1">Insuficient</label>        
   <h4>Limba și calitatea redactării  </h4>
   <input type="radio" id="fb2"  name="redactare" value="Foarte bine" required>        <label for="fb2">Foarte bine</label>        <br>        <input type="radio" id="b2" name="redactare" value="Bine">        <label for="b2">Bine</label>        <br>        <input type="radio" id="s2" name="redactare" value="Suficient">        <label for="s2">Suficient</label>        <br>        <input type="radio" id="i2" name="redactare" value="Insuficient">        <label for="i2">Insuficient</label>        
   <h4>Structura, planul și organizarea textului </h4>
   <input type="radio" id="fb3"  name="structura" value="Foarte bine" required>        <label for="fb3">Foarte bine</label>        <br>        <input type="radio" id="b3" name="structura" value="Bine">        <label for="b3">Bine</label>        <br>        <input type="radio" id="s3" name="structura" value="Suficient">        <label for="s3">Suficient</label>        <br>        <input type="radio" id="i3" name="structura" value="Insuficient">        <label for="i3">Insuficient</label>        
   <h4>Claritatea obiectivelor expuse </h4>
   <input type="radio" id="fb4"  name="obiective" value="Foarte bine" required>        <label for="fb4">Foarte bine</label>        <br>        <input type="radio" id="b4" name="obiective" value="Bine">        <label for="b4">Bine</label>        <br>        <input type="radio" id="s4" name="obiective" value="Suficient">        <label for="s4">Suficient</label>        <br>        <input type="radio" id="i4" name="obiective" value="Insuficient">        <label for="i4">Insuficient</label>        
   <h4>Fundamentele teoretice </h4>
   <input type="radio" id="fb5"  name="fundamente" value="Foarte bine" required>        <label for="fb5">Foarte bine</label>        <br>        <input type="radio" id="b5" name="fundamente" value="Bine">        <label for="b5">Bine</label>        <br>        <input type="radio" id="s5" name="fundamente" value="Suficient">        <label for="s5">Suficient</label>        <br>        <input type="radio" id="i5" name="fundamente" value="Insuficient">        <label for="i5">Insuficient</label>        
   <h4>Metoda de cercetare utilizată</h4>
   <input type="radio" id="fb6"  name="cercetare" value="Foarte bine" required>        <label for="fb6">Foarte bine</label>        <br>        <input type="radio" id="b6" name="cercetare" value="Bine">        <label for="b6">Bine</label>        <br>        <input type="radio" id="s6" name="cercetare"value="Suficient">        <label for="s6">Suficient</label>        <br>        <input type="radio" id="i6" name="cercetare" value="Insuficient">        <label for="i6">Insuficient</label>        
   <h4>Rezultatele cercetării sunt corelate cu obiectivele acesteia</h4>
   <input type="radio" id="fb7"  name="rezultate" value="Foarte bine" required>        <label for="fb7">Foarte bine</label>        <br>        <input type="radio" id="b7" name="rezultate" value="Bine">        <label for="b7">Bine</label>        <br>        <input type="radio" id="s7" name="rezultate" value="Suficient">        <label for="s7">Suficient</label>        <br>        <input type="radio" id="i7" name="rezultate" value="Insuficient">        <label for="i7">Insuficient</label>        
   <h4>Concluziile reflectă demersul cercetării </h4>
   <input type="radio" id="fb8"  name="concluzii" value="Foarte bine" required>        <label for="fb8">Foarte bine</label>        <br>        <input type="radio" id="b8" name="concluzii" value="Bine">        <label for="b8">Bine</label>        <br>        <input type="radio" id="s8" name="concluzii" value="Suficient">        <label for="s8">Suficient</label>        <br>        <input type="radio" id="i8" name="concluzii" value="Insuficient">        <label for="i8">Insuficient</label>        
   <h4>Referințele bibliografice sunt structurate în conformitate cu importanța lor în cercetare: surse primare, surse secundare (exegeze), corpus etc.</h4>
   <input type="radio" id="fb9"  name="referinte" value="Foarte bine" required>        
   <label for="fb9">Foarte bine</label>        
   <br>        <input type="radio" id="b9" name="referinte" value="Bine" >        <label for="b9">Bine</label>        <br>        <input type="radio" id="s9" name="referinte" value="Suficient">        <label for="s9">Suficient</label>        <br>        <input type="radio" id="i9" name="referinte" value="Insuficient">        <label for="i9">Insuficient</label>        <br><br><br><br>        <label>Comentarii (cca 150 - 200 de cuvinte, dacă este necesar)</label><br>        
   <textarea rows="10" id="comentarii"></textarea>
   <h4>Recomandări:</h4>
   <select id="recomandari">
      <option>Acceptarea textului fără modificări</option>
      <option>Revizuirea aspectelor semnalate</option>
      <option>Reevaluare necesară</option>
      <option>Refuzarea textului</option>
   </select>
   <br><br><br><br>        
   <h4>Fișierul cu adnotări</h4>
   <p>Încărcați fișierul .word care conține adnotările necesare</p>
   <input type="file" name="adnot" id="adnot-fisier">        
   <h3>FINALIZARE PROCES DE EVALUARE </h3>
   <h4>Redacția revistei Dialogues francophones vă mulțumește pentru că ați acceptat să faceți evaluarea acestui articol.</h4>   
   <input type="submit" id="submit">    
</form>
`

if(!CORRECT_URL){
    document.getElementById("loadingAnimation").style.opacity='0';
    document.getElementById("formular-container").insertAdjacentHTML("afterbegin",`<h2>${GeneralErrors["doesnt-exist"]}</h2>`)
}
else
    database.ref(PUB+"/propuneri/"+EVAL_ID).once('value')
        .then((snapshot)=>{
            let propunere = snapshot.val()
            document.getElementById("loadingAnimation").style.opacity='0';
            if(propunere){
                switch (authorized(propunere)){
                    //case 0 = Cand nu este nici sef nici evaluator ( neautorizat )
                    //case 1 = Cand contributia nu este completed si are rol de evaluator
                    //case 2 = Cand este evaluator si a evaluat deja contributia sau cand este boss si contributia e deja evaluata
                    //case 3 = Cand este boss si contributia nu este evaluata
                    case 0:
                        document.getElementById("formular-container").insertAdjacentHTML("afterbegin",`<h2>${GeneralErrors["not-authorized"]}</h2>`)
                        break

                    case 1:
                        document.getElementById("formular-container").insertAdjacentHTML("beforeend",FORMULAR)

                        //download prop link
                        var propunereRef = firebase.storage().ref(`${PUB.toUpperCase()}/${propunere.fisier_propunere}`);
                        propunereRef.getDownloadURL()
                            .then((url) => {
                                $("#fill-download-link").html(`<span><a href="${url}" target="__blank" style="color: black"><svg width="30" height="30" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="512" height="512" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0" transform="scale(0.00195312)"/></pattern><image id="image0" width="512" height="512" xlink:href="data:image/png;base64,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"/></defs></svg></a></span>`)
                            })
                            .catch((error) => {
                                $("#fill-download-link").html(`<span>Error: ${error.code}</span>`)
                            });

                        //rezumat autofill
                        $("#autocomplete-rezumat").html(propunere.rezumat)

                        //listener fisier !!
                        document.getElementById('adnot-fisier').addEventListener('change', function (e){
                            const extension = e.target.files[0].name.split(".")[1]
                            if(["docx","doc"].includes(extension))
                                FISIER_ADNOTARI_DOC.file = e.target.files[0];
                            else{
                                $("#articol-fisier").val('')
                                alert("Files must have .doc / .docx extension")
                            }
                            FISIER_ADNOTARI_DOC.extension = extension
                        });

                        //add submit event listener
                        $("#formular-container>form").submit(function(e) {
                            //prevent page from refreshing
                            e.preventDefault();

                            let databaseEvalForm = {
                                arieCompetenta:document.querySelector("input[name='arie_competenta']").value,
                                conformitateTitlu:document.querySelector("input[name='conformitate_titlu']").value,
                                completitudineRezumat:document.querySelector("input[name='completitudine_rezumat']").value,
                                cuvCheieAdecvate:document.querySelector("input[name='cuv_cheie_adecvate']").value,
                                originalitate:document.querySelector("input[name='originalitate']").value,
                                actualitate:document.querySelector("input[name='actualitate']").value,
                                coerenta:document.querySelector("input[name='coerenta']").value,
                                redactare:document.querySelector("input[name='redactare']").value,
                                structura:document.querySelector("input[name='structura']").value,
                                obiective:document.querySelector("input[name='obiective']").value,
                                fundamente:document.querySelector("input[name='fundamente']").value,
                                cercetare:document.querySelector("input[name='cercetare']").value,
                                rezultate:document.querySelector("input[name='rezultate']").value,
                                concluzii:document.querySelector("input[name='concluzii']").value,
                                referinte:document.querySelector("input[name='referinte']").value,
                                comentarii:getTextValue($("#comentarii")),
                                recomandari:getDropdownValue('recomandari'),
                                fisier_adnotari:`${propunere.id}-${PUB.toLowerCase()}-${getUserId()}-ev${EV}.${FISIER_ADNOTARI_DOC.extension}`,
                                data:DateToString(new Date())
                            }
                            console.log(databaseEvalForm)
                            //trimit evaluarea catre DB

                            //schimb proprietatea de completed de la propunere

                            //schimb status propunere xd

                            //adaug evaluarea in lista de evaluari de la profilul meu
                        });
                        break

                    case 2:
                        document.getElementById("formular-container").insertAdjacentHTML("afterbegin",`<h2>${GeneralErrors["TBA"]}</h2>`)
                        break

                    case 3:
                        document.getElementById("formular-container").insertAdjacentHTML("afterbegin",`<h2>${GeneralErrors["not-completed"]}</h2>`)
                        break

                    default:
                        document.getElementById("formular-container").insertAdjacentHTML("afterbegin",`<h2>authorized() value unknown: ${authorized(propunere)}</h2>`)
                        break;
                }
            }
            else document.getElementById("formular-container").insertAdjacentHTML("afterbegin",`<h2>${GeneralErrors["doesnt-exist"]}</h2>`)

        })


function authorized(val){
    let userRank = JSON.parse(window.sessionStorage.getItem("accountStatus")).account.rank.id
    let userID = JSON.parse(window.sessionStorage.getItem("accountStatus")).account.id
    //verificam daca userul este sef, apoi verificam daca evaluare este completata sau nu
    if(["redresdf","redresaf"].includes(userRank)){
        if(val['evaluare_'+EV]['completed']){
            return 2
        }
        else return 3
    }
    //daca userul nu este sef verificam daca este evaluator, dupa verificam daca este completata sau nu
    if(userID===val['evaluare_'+EV]['evaluator']){
        if(val['evaluare_'+EV]['completed']) return 2
        else return 1
    }
    //daca nu e nici sef nici evaluator nu are ce cauta aici
    return 0
}
