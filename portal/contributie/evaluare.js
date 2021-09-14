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

function changeButton(){
    if(isUserLoggedIn()){
        document.getElementById("header-second-line").insertAdjacentHTML('beforeend',`<button onclick='window.location.href="../profile.html?user=${getUserId()}"'>Page de profile</button>`)
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="LogOut()">Déconnexion</button>' )
    }

    else{
        document.getElementById("header-second-line").insertAdjacentHTML("beforeend",'<button onclick="window.location.href=\'login.html\'">Connexion </button>' )
    }
}
changeButton()

const FORMULAR_AF = `
<h2>Formulaire d’évaluation</h2>
<h3 class="titlu-publicatie">Agapes francophones</h3>
<form>
   <p>*Tous les champs sont obligatoires.</p>
   <h3>DEMANDE D’ÉVALUATION </h3>
   <h4>&emsp;&emsp;Vous avez été désigné évaluateur d’un article soumis au comité de rédaction du volume d’actes Agapes francophones. Vous trouverez ci-dessous le résumé de la proposition et les informations concernant le processus d’évaluation. Nous espérons que vous accepterez d’évaluer article ci-joint.</h4>
   <h4>Résumé</h4>
   <p><i id="autocomplete-rezumat"></i></p>
   <h4>Type d’évaluation : évaluateur anonyme, contribution anonymisée </h4>
   <h4>Calendrier</h4>
   <p>Nous vous prions de nous communiquer d’abord par e-mail votre accord d’évaluer, dans un délai de 15 jours, et de soumettre par la suite votre rapport d’évaluation dans un délai supplémentaire de 30 jours au maximum.</p>
   <h3>ACCORD-CADRE</h3>
   <h4>Ligne éditoriale. Processus d’évaluation</h4>
   <p>Les volumes d’actes Agapes francophones réunissent des contributions émanant des travaux du Colloque international d’études francophones (CIEFT), organisé annuellement à Timişoara (Roumanie). Le thème de chaque colloque est établi après consultation des membres du comité scientifique. La qualité scientifique des articles publiés ressort de l’évaluation rigoureuse des contributions envoyées au comité de rédaction.<br>
<br>
Dans une première étape, les textes reçus sont évalués par le comité de rédaction afin d’établir dans quelle mesure les sujets développés correspondent à la thématique et aux champs disciplinaires visés. <br>
<br>
Après avoir reçu le rapport d’originalité (Ithenticate, Turnitin, etc.) pour chaque article, le comité de rédaction envoie les textes aux évaluateurs. <br>
<br>
L’évaluation par les pair-e-s en « double aveugle » - anonymisation de l’auteur et des évaluateurs - est effectuée par au moins deux chercheurs (autres que les membres du comité de rédaction), membres du comité scientifique du volume ou experts sollicités occasionnellement. <br>
<br>
La liste des évaluateurs est mise à jour pour chaque volume d’actes.<br>
<br>
Dans le processus d’évaluation, les membres du comité scientifique et les experts-évaluateurs sollicités occasionnellement prennent en compte les critères suivants : <br>
&emsp;&emsp;1. L’observation de la feuille de style (le non-respect de cette feuille de style entraînera le rejet de l’article) ;<br>
&emsp;&emsp;2. L’originalité du sujet traité ; <br>
&emsp;&emsp;3. L’adéquation du sujet de l’article avec la thématique du numéro ;<br>
&emsp;&emsp;4. La pertinence de l’étude proposée, la problématique et l’argumentation ; <br>
&emsp;&emsp;5. La qualité des ressources bibliographiques.<br>
<br>
• On apprécie :<br>
&emsp;&emsp;o Les parties originales et correctement éditées du texte soumis à l’évaluation ;<br>
&emsp;&emsp;o Les références bibliographiques primaires, leur exégèse si le sujet l’exige ;<br>
&emsp;&emsp;o L’intégrité scientifique et la conduite des pratiques de recherche. <br>
<br>
• On sanctionne : <br>
&emsp;&emsp;o L’absence des sources primaires dans la bibliographie en faveur de références bibliographiques secondaires ; <br>
&emsp;&emsp;o La double citation signalée d’une manière incomplète ;<br>
&emsp;&emsp;o La reprise d’idées ainsi que de textes sans avoir indiqué adéquatement la source ; <br>
&emsp;&emsp;o Les citations de plus de dix lignes ;<br>
&emsp;&emsp;o L’utilisation de type mosaïque d’un bloc de texte sans avoir cité la source, en remplaçant certains mots à l’intérieur du texte et en préservant la structure globale de la phrase.<br>
<br>
Le comité de rédaction du volume d’actes Agapes francophones se charge d’informer par e-mail chaque collaborateur, -trice de l’acceptation ou du rejet de l’article soumis à évaluation.<br>
</p>
   <br><br>
   <hr>
   <br><br>        
   <h3>TÉLÉCHARGEZ ET ÉVALUEZ</h3>
   <h4>TÉLÉCHARGEZ:</h4>
   <p id="fill-download-link"></p>
   <h4>ÉVALUATION:</h4>
   <h4>L’article soumis à l’évaluation correspond-il à votre domaine de compétence ?</h4>
   <input type="radio" id="Da1"  name="arie_competenta" value="Oui" required>        <label for="Da1">Oui</label>        <br>        <input type="radio" id="Nu1" name="arie_competenta" value="Non">        <label for="Nu1">Non</label>        
   <h4>Le titre de l’article est-il clair, informatif et conforme à la proposition qu’il annonce ? </h4>
   <input type="radio" id="Da2"  name="conformitate_titlu" value="Oui" required>        <label for="Da2">Oui</label>        <br>        <input type="radio" id="Nu2" name="conformitate_titlu" value="Non">        <label for="Nu2">Non</label>        
   <h4>Le resumé est complét?</h4>
   <input type="radio" id="Da3"  name="completitudine_rezumat" value="Oui" required>        <label for="Da3">Oui</label>        <br>        <input type="radio" id="Nu3" name="completitudine_rezumat" value="Non">        <label for="Nu3">Non</label>        
   <h4>Les mots clés sont-ils adéquats à la proposition d’article ?</h4>
   <input type="radio" id="Perfect adecvate"  name="cuv_cheie_adecvate" value="Parfaitement adéquats" required>        <label for="Perfect adecvate">Parfaitement adéquats</label>        <br>        <input type="radio" id="Suficient de adecvate" name="cuv_cheie_adecvate" value="Suffisamment adéquats">        <label for="Suficient de adecvate">Suffisamment adéquats</label>        <br>        <input type="radio" id="Parțial adecvate"  name="cuv_cheie_adecvate" value="Partiellement adéquats">        <label for="Parțial adecvate">Partiellement adéquats</label>        <br>        <input type="radio" id="Insuficient adecvate" name="cuv_cheie_adecvate" value="Insuffisamment adéquats">        <label for="Insuficient adecvate">Insuffisamment adéquats</label>        <br>        
   <h4>S’agit-il d’une recherche originale ?</h4>
   <input type="radio" id="Complet original"  name="originalitate" value="Intégralement originale" required>        <label for="Complet original">Intégralement originale</label>        <br>        <input type="radio" id="original2" name="originalitate" value="Des idées originales insérées dans un texte qui synthétise des théories bien connues, une   interprétation originale du corpus,">        <label for="original2">Des idées originales insérées dans un texte qui synthétise des théories bien connues, une   interprétation originale du corpus,</label>        <br>        <input type="radio" id="original3" name="originalitate" value="Originalité modérée : reproduction d’idées communes, synthèse des points de vue théoriques suivie d’une analyse de corpus">        <label for="original3">Originalité modérée : reproduction d’idées communes, synthèse des points de vue théoriques suivie d’une analyse de corpus</label>        <br>        <input type="radio" id="original4" name="originalitate" value="Manque d’originalité">        <label for="original4">Manque d’originalité</label>        
   <h4>La démarche scientifique proposée est-elle actuelle et pertinente ?</h4>
   <input type="radio" id="actualitate1"  name="actualitate" value="Parfaitement actuelle et pertinente" required>        <label for="actualitate1">Parfaitement actuelle et pertinente</label>        <br>        <input type="radio" id="actualitate2" name="actualitate" value="Actuelle et suffisamment pertinente">        <label for="actualitate2">Actuelle et suffisamment pertinente</label>        <br>        <input type="radio" id="actualitate3" name="actualitate" value="Partiellement pertinente, non-actuelle">        <label for="actualitate3">Partiellement pertinente, non-actuelle</label>        <br>        <input type="radio" id="actualitate4" name="actualitate" value="Lipsă de relevanță și de actualitate">        <label for="actualitate4">Lipsă de relevanță și de actualitate</label>        
   <h4>La cohérence et l’argumentation</h4>
   <input type="radio" id="fb1"  name="coerenta" value="Très bien" required>        <label for="fb1">Très bien</label>        <br>        <input type="radio" id="b1" name="coerenta" value="Bien">        <label for="b1">Bien</label>        <br>        <input type="radio" id="s1" name="coerenta" value="Suffisant">        <label for="s1">Suffisant</label>        <br>        <input type="radio" id="i1" name="coerenta" value="Insuficient">        <label for="i1">Insuficient</label>        
   <h4>La langue et la qualité de l’écriture</h4>
   <input type="radio" id="fb2"  name="redactare" value="Très bien" required>        <label for="fb2">Très bien</label>        <br>        <input type="radio" id="b2" name="redactare" value="Bien">        <label for="b2">Bien</label>        <br>        <input type="radio" id="s2" name="redactare" value="Suffisant">        <label for="s2">Suffisant</label>        <br>        <input type="radio" id="i2" name="redactare" value="Insuficient">        <label for="i2">Insuficient</label>        
   <h4>La structure, le plan et l’organisation du texte</h4>
   <input type="radio" id="fb3"  name="structura" value="Très bien" required>        <label for="fb3">Très bien</label>        <br>        <input type="radio" id="b3" name="structura" value="Bien">        <label for="b3">Bien</label>        <br>        <input type="radio" id="s3" name="structura" value="Suffisant">        <label for="s3">Suffisant</label>        <br>        <input type="radio" id="i3" name="structura" value="Insuficient">        <label for="i3">Insuficient</label>        
   <h4>La clarté des objectifs exposés</h4>
   <input type="radio" id="fb4"  name="obiective" value="Très bien" required>        <label for="fb4">Très bien</label>        <br>        <input type="radio" id="b4" name="obiective" value="Bien">        <label for="b4">Bien</label>        <br>        <input type="radio" id="s4" name="obiective" value="Suffisant">        <label for="s4">Suffisant</label>        <br>        <input type="radio" id="i4" name="obiective" value="Insuficient">        <label for="i4">Insuficient</label>        
   <h4>Les fondements théoriques</h4>
   <input type="radio" id="fb5"  name="fundamente" value="Très bien" required>        <label for="fb5">Très bien</label>        <br>        <input type="radio" id="b5" name="fundamente" value="Bien">        <label for="b5">Bien</label>        <br>        <input type="radio" id="s5" name="fundamente" value="Suffisant">        <label for="s5">Suffisant</label>        <br>        <input type="radio" id="i5" name="fundamente" value="Insuficient">        <label for="i5">Insuficient</label>        
   <h4>La méthode de recherche utilisée</h4>
   <input type="radio" id="fb6"  name="cercetare" value="Très bien" required>        <label for="fb6">Très bien</label>        <br>        <input type="radio" id="b6" name="cercetare" value="Bien">        <label for="b6">Bien</label>        <br>        <input type="radio" id="s6" name="cercetare" value="Suffisant">        <label for="s6">Suffisant</label>        <br>        <input type="radio" id="i6" name="cercetare" value="Insuficient">        <label for="i6">Insuficient</label>        
   <h4>Les résultats de la recherche sont bien corrélés avec les objectifs envisagés</h4>
   <input type="radio" id="fb7"  name="rezultate" value="Très bien" required>        <label for="fb7">Très bien</label>        <br>        <input type="radio" id="b7" name="rezultate" value="Bien">        <label for="b7">Bien</label>        <br>        <input type="radio" id="s7" name="rezultate" value="Suffisant">        <label for="s7">Suffisant</label>        <br>        <input type="radio" id="i7" name="rezultate" value="Insuficient">        <label for="i7">Insuficient</label>        
   <h4>Les conclusions reflètent la démarche scientifique: </h4>
   <input type="radio" id="fb8"  name="concluzii" value="Très bien" required>        <label for="fb8">Très bien</label>        <br>        <input type="radio" id="b8" name="concluzii" value="Bien">        <label for="b8">Bien</label>        <br>        <input type="radio" id="s8" name="concluzii" value="Suffisant">        <label for="s8">Suffisant</label>        <br>        <input type="radio" id="i8" name="concluzii" value="Insuficient">        <label for="i8">Insuficient</label>        
   <h4>Les références bibliographiques sont structurées en fonction de leur importance dans la recherche : sources primaires, sources secondaires (exégèses), corpus, etc.</h4>
   <input type="radio" id="fb9"  name="referinte" value="Très bien" required>        
   <label for="fb9">Très bien</label>        
   <br>        <input type="radio" id="b9" name="referinte" value="Bien" >        <label for="b9">Bien</label>        <br>        <input type="radio" id="s9" name="referinte" value="Suffisant">        <label for="s9">Suffisant</label>        <br>        <input type="radio" id="i9" name="referinte" value="Insuficient">        <label for="i9">Insuficient</label>        <br><br><br><br>        <label>Commentaires (environ 100-150 mots, si nécessaire)  </label><br>        
   <textarea rows="10" id="comentarii"></textarea>
   <h4>Recommandations (sélectionner dans la liste) :</h4>
   <select id="recomandari">
      <option>Accepter la soumission</option>
      <option>Révisions requises</option>
      <option>Réévaluation nécessaire</option>
      <option>Rejeter la soumission</option>
   </select>
   <br><br><br><br>        
   <h4>Article évalué et annoté</h4>
   <p>Télécharger l’article éventuellement annoté, sous format .word (doc, docx). </p>
   <input type="file" name="adnot" id="adnot-fisier">        
   <h3>TERMINER</h3>
    
   <input type="submit" id="submit" value="Envoyer">    
</form>
`

const FORMULAR_DF = `
<h2>Formulaire d’évaluation</h2>
<h3 class="titlu-publicatie">Dialogues Francophones</h3>
<form>
   <p>*Tous les champs sont obligatoires.</p>
   <h3>DEMANDE D’ÉVALUATION </h3>
   <h4>&emsp;&emsp;Vous avez été désigné évaluateur d’un article soumis à la rédaction de la revue Dialogues francophones. Vous trouverez ci-dessous le résumé de la proposition et les informations concernant le processus d’évaluation. Nous espérons que vous accepterez d’évaluer article ci-joint.</h4>
   <h4>Résumé</h4>
   <p><i id="autocomplete-rezumat"></i></p>
   <h4>Type d’évaluation : évaluateur anonyme, contribution anonymisée </h4>
   <h4>Calendrier</h4>
   <p>Nous vous prions de nous communiquer d’abord par e-mail votre accord d’évaluer, dans un délai de 15 jours, et de soumettre par la suite votre rapport d’évaluation dans un délai supplémentaire de 30 jours au maximum.</p>
   <h3>ACCORD-CADRE</h3>
   <h4>Ligne éditoriale de la revue. Processus d’évaluation</h4>
   <p>Pour chaque numéro, la revue Dialogues francophones propose un dossier thématique après consultation des membres du comité scientifique. La qualité scientifique des articles publiés ressort de l’évaluation rigoureuse des contributions envoyées à la rédaction.<br>
<br>
Dans une première étape, les textes reçus sont évalués par le comité de rédaction afin d’établir dans quelle mesure les sujets développés correspondent à la thématique du numéro. <br>
<br>
Après avoir reçu le rapport d’originalité (Ithenticate, Turnitin, etc.) pour chaque article, le comité de rédaction envoie les textes aux évaluateurs. <br>
<br>
L’évaluation par les pair-e-s en « double aveugle » - anonymisation de l’auteur et des évaluateurs - est effectuée par au moins deux chercheurs (autres que les membres du comité de rédaction), membres du comité scientifique de la revue ou experts sollicités occasionnellement. <br>
<br>
La liste des évaluateurs est mise à jour pour chaque numéro de la revue.<br>
<br>
Dans le processus d’évaluation, les membres du comité scientifique et les experts-évaluateurs sollicités occasionnellement prennent en compte les critères suivants : <br>
&emsp;&emsp;1. L’observation de la feuille de style (le non-respect de cette feuille de style entraînera le rejet de l’article) ;<br>
&emsp;&emsp;2. L’originalité du sujet traité ; <br>
&emsp;&emsp;3. L’adéquation du sujet de l’article avec la thématique du numéro ;<br>
&emsp;&emsp;4. La pertinence de l’étude proposée, la problématique et l’argumentation ; <br>
&emsp;&emsp;5. La qualité des ressources bibliographiques.<br>
<br>
• On apprécie :<br>
&emsp;&emsp;o Les parties originales et correctement éditées du texte soumis à l’évaluation ;<br>
&emsp;&emsp;o Les références bibliographiques primaires, leur exégèse si le sujet l’exige ;<br>
&emsp;&emsp;o L’intégrité scientifique et la conduite des pratiques de recherche. <br>
<br>
• On sanctionne : <br>
&emsp;&emsp;o L’absence des sources primaires dans la bibliographie en faveur de références bibliographiques secondaires ; <br>
&emsp;&emsp;o La double citation signalée d’une manière incomplète ;<br>
&emsp;&emsp;o La reprise d’idées ainsi que de textes sans avoir indiqué adéquatement la source ; <br>
&emsp;&emsp;o Les citations de plus de dix lignes ;<br>
&emsp;&emsp;o L’utilisation de type mosaïque d’un bloc de texte sans avoir cité la source, en remplaçant certains mots à l’intérieur du texte et en préservant la structure globale de la phrase.<br>
<br>
Le comité de rédaction de la revue Dialogues francophones se charge d’informer par e-mail chaque collaborateur, -trice de l’acceptation ou du rejet de l’article soumis à évaluation.<br>
</p>
   <br><br>
   <hr>
   <br><br>        
   <h3>TÉLÉCHARGEZ ET ÉVALUEZ</h3>
   <h4>TÉLÉCHARGEZ:</h4>
   <p id="fill-download-link"></p>
   <h4>ÉVALUATION:</h4>
   <h4>L’article soumis à l’évaluation correspond-il à votre domaine de compétence ?</h4>
   <input type="radio" id="Da1"  name="arie_competenta" value="Oui" required>        <label for="Da1">Oui</label>        <br>        <input type="radio" id="Nu1" name="arie_competenta" value="Non">        <label for="Nu1">Non</label>        
   <h4>Le titre de l’article est-il clair, informatif et conforme à la proposition qu’il annonce ? </h4>
   <input type="radio" id="Da2"  name="conformitate_titlu" value="Oui" required>        <label for="Da2">Oui</label>        <br>        <input type="radio" id="Nu2" name="conformitate_titlu" value="Non">        <label for="Nu2">Non</label>        
   <h4>Le resumé est complét?</h4>
   <input type="radio" id="Da3"  name="completitudine_rezumat" value="Oui" required>        <label for="Da3">Oui</label>        <br>        <input type="radio" id="Nu3" name="completitudine_rezumat" value="Non">        <label for="Nu3">Non</label>        
   <h4>Les mots clés sont-ils adéquats à la proposition d’article ?</h4>
   <input type="radio" id="Perfect adecvate"  name="cuv_cheie_adecvate" value="Parfaitement adéquats" required>        <label for="Perfect adecvate">Parfaitement adéquats</label>        <br>        <input type="radio" id="Suficient de adecvate" name="cuv_cheie_adecvate" value="Suffisamment adéquats">        <label for="Suficient de adecvate">Suffisamment adéquats</label>        <br>        <input type="radio" id="Parțial adecvate"  name="cuv_cheie_adecvate" value="Partiellement adéquats">        <label for="Parțial adecvate">Partiellement adéquats</label>        <br>        <input type="radio" id="Insuficient adecvate" name="cuv_cheie_adecvate" value="Insuffisamment adéquats">        <label for="Insuficient adecvate">Insuffisamment adéquats</label>        <br>        
   <h4>S’agit-il d’une recherche originale ?</h4>
   <input type="radio" id="Complet original"  name="originalitate" value="Intégralement originale" required>        <label for="Complet original">Intégralement originale</label>        <br>        <input type="radio" id="original2" name="originalitate" value="Des idées originales insérées dans un texte qui synthétise des théories bien connues, une   interprétation originale du corpus,">        <label for="original2">Des idées originales insérées dans un texte qui synthétise des théories bien connues, une   interprétation originale du corpus,</label>        <br>        <input type="radio" id="original3" name="originalitate" value="Originalité modérée : reproduction d’idées communes, synthèse des points de vue théoriques suivie d’une analyse de corpus">        <label for="original3">Originalité modérée : reproduction d’idées communes, synthèse des points de vue théoriques suivie d’une analyse de corpus</label>        <br>        <input type="radio" id="original4" name="originalitate" value="Manque d’originalité">        <label for="original4">Manque d’originalité</label>        
   <h4>La démarche scientifique proposée est-elle actuelle et pertinente ?</h4>
   <input type="radio" id="actualitate1"  name="actualitate" value="Parfaitement actuelle et pertinente" required>        <label for="actualitate1">Parfaitement actuelle et pertinente</label>        <br>        <input type="radio" id="actualitate2" name="actualitate" value="Actuelle et suffisamment pertinente">        <label for="actualitate2">Actuelle et suffisamment pertinente</label>        <br>        <input type="radio" id="actualitate3" name="actualitate" value="Partiellement pertinente, non-actuelle">        <label for="actualitate3">Partiellement pertinente, non-actuelle</label>        <br>        <input type="radio" id="actualitate4" name="actualitate" value="Lipsă de relevanță și de actualitate">        <label for="actualitate4">Lipsă de relevanță și de actualitate</label>        
   <h4>La cohérence et l’argumentation</h4>
   <input type="radio" id="fb1"  name="coerenta" value="Très bien" required>        <label for="fb1">Très bien</label>        <br>        <input type="radio" id="b1" name="coerenta" value="Bien">        <label for="b1">Bien</label>        <br>        <input type="radio" id="s1" name="coerenta" value="Suffisant">        <label for="s1">Suffisant</label>        <br>        <input type="radio" id="i1" name="coerenta" value="Insuficient">        <label for="i1">Insuficient</label>        
   <h4>La langue et la qualité de l’écriture</h4>
   <input type="radio" id="fb2"  name="redactare" value="Très bien" required>        <label for="fb2">Très bien</label>        <br>        <input type="radio" id="b2" name="redactare" value="Bien">        <label for="b2">Bien</label>        <br>        <input type="radio" id="s2" name="redactare" value="Suffisant">        <label for="s2">Suffisant</label>        <br>        <input type="radio" id="i2" name="redactare" value="Insuficient">        <label for="i2">Insuficient</label>        
   <h4>La structure, le plan et l’organisation du texte</h4>
   <input type="radio" id="fb3"  name="structura" value="Très bien" required>        <label for="fb3">Très bien</label>        <br>        <input type="radio" id="b3" name="structura" value="Bien">        <label for="b3">Bien</label>        <br>        <input type="radio" id="s3" name="structura" value="Suffisant">        <label for="s3">Suffisant</label>        <br>        <input type="radio" id="i3" name="structura" value="Insuficient">        <label for="i3">Insuficient</label>        
   <h4>La clarté des objectifs exposés</h4>
   <input type="radio" id="fb4"  name="obiective" value="Très bien" required>        <label for="fb4">Très bien</label>        <br>        <input type="radio" id="b4" name="obiective" value="Bien">        <label for="b4">Bien</label>        <br>        <input type="radio" id="s4" name="obiective" value="Suffisant">        <label for="s4">Suffisant</label>        <br>        <input type="radio" id="i4" name="obiective" value="Insuficient">        <label for="i4">Insuficient</label>        
   <h4>Les fondements théoriques</h4>
   <input type="radio" id="fb5"  name="fundamente" value="Très bien" required>        <label for="fb5">Très bien</label>        <br>        <input type="radio" id="b5" name="fundamente" value="Bien">        <label for="b5">Bien</label>        <br>        <input type="radio" id="s5" name="fundamente" value="Suffisant">        <label for="s5">Suffisant</label>        <br>        <input type="radio" id="i5" name="fundamente" value="Insuficient">        <label for="i5">Insuficient</label>        
   <h4>La méthode de recherche utilisée</h4>
   <input type="radio" id="fb6"  name="cercetare" value="Très bien" required>        <label for="fb6">Très bien</label>        <br>        <input type="radio" id="b6" name="cercetare" value="Bien">        <label for="b6">Bien</label>        <br>        <input type="radio" id="s6" name="cercetare" value="Suffisant">        <label for="s6">Suffisant</label>        <br>        <input type="radio" id="i6" name="cercetare" value="Insuficient">        <label for="i6">Insuficient</label>        
   <h4>Les résultats de la recherche sont bien corrélés avec les objectifs envisagés</h4>
   <input type="radio" id="fb7"  name="rezultate" value="Très bien" required>        <label for="fb7">Très bien</label>        <br>        <input type="radio" id="b7" name="rezultate" value="Bien">        <label for="b7">Bien</label>        <br>        <input type="radio" id="s7" name="rezultate" value="Suffisant">        <label for="s7">Suffisant</label>        <br>        <input type="radio" id="i7" name="rezultate" value="Insuficient">        <label for="i7">Insuficient</label>        
   <h4>Les conclusions reflètent la démarche scientifique: </h4>
   <input type="radio" id="fb8"  name="concluzii" value="Très bien" required>        <label for="fb8">Très bien</label>        <br>        <input type="radio" id="b8" name="concluzii" value="Bien">        <label for="b8">Bien</label>        <br>        <input type="radio" id="s8" name="concluzii" value="Suffisant">        <label for="s8">Suffisant</label>        <br>        <input type="radio" id="i8" name="concluzii" value="Insuficient">        <label for="i8">Insuficient</label>        
   <h4>Les références bibliographiques sont structurées en fonction de leur importance dans la recherche : sources primaires, sources secondaires (exégèses), corpus, etc.</h4>
   <input type="radio" id="fb9"  name="referinte" value="Très bien" required>        
   <label for="fb9">Très bien</label>        
   <br>        <input type="radio" id="b9" name="referinte" value="Bien" >        <label for="b9">Bien</label>        <br>        <input type="radio" id="s9" name="referinte" value="Suffisant">        <label for="s9">Suffisant</label>        <br>        <input type="radio" id="i9" name="referinte" value="Insuficient">        <label for="i9">Insuficient</label>        <br><br><br><br>        <label>Commentaires (environ 100-150 mots, si nécessaire)  </label><br>        
   <textarea rows="10" id="comentarii"></textarea>
   <h4>Recommandations (sélectionner dans la liste) :</h4>
   <select id="recomandari">
      <option>Accepter la soumission</option>
      <option>Révisions requises</option>
      <option>Réévaluation nécessaire</option>
      <option>Rejeter la soumission</option>
   </select>
   <br><br><br><br>        
   <h4>Article évalué et annoté</h4>
   <p>Télécharger l’article éventuellement annoté, sous format .word (doc, docx). </p>
   <input type="file" name="adnot" id="adnot-fisier">        
   <h3>TERMINER</h3>
    
   <input type="submit" id="submit" value="Envoyer">    
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
                        if(PUB==='DF')  document.getElementById("formular-container").insertAdjacentHTML("beforeend",FORMULAR_DF)
                        else if(PUB==='AF') document.getElementById("formular-container").insertAdjacentHTML("beforeend",FORMULAR_AF)


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

                            //raise animation
                            document.getElementById("submit").insertAdjacentHTML('beforebegin',`
                            <div id="loadingAnimation" style="opacity: 1">
                                <svg width="30" height="30" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="loadingAnim">
                                        <g id="bigPart">
                                            <rect id="bigPartContainer" width="46" height="46" fill="white" fill-opacity="0.01"/>
                                            <path id="bigPartCenter" d="M8 23H2C2.33333 30 7 44 23 44C39 44 43.6667 30 44 23H38C37.8333 28 34.6 38 23 38C11.4 37.2 8.16667 27.6667 8 23Z" fill="#182268"/>
                                        </g>
                                        <g id="smallPart">
                                            <g id="smallPartContainer">
                                                <rect id="smallPartContainer_2" width="46" height="46" fill="white" fill-opacity="0.01"/>
                                                <path id="smallPartCenter" d="M14 23H10C10.1667 18.5 13 9.59998 23 9.99998C33 10.4 35.8333 18.8333 36 23H32C31.8333 19.8333 29.8 13.6 23 14C16.2 14.4 14.1667 20.1666 14 23Z" fill="#182268"/>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>`)

                            //block submit button
                            $("#submit").prop("disabled",true)

                            let databaseEvalForm = {
                                titlu: propunere.titlu,//!!!
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
                                fisier_adnotari:`${propunere.id}-${PUB.toLowerCase()}-${propunere.id_autor}-ev${EV}.${FISIER_ADNOTARI_DOC.extension}`,
                                data:DateToString(new Date())
                            }

                            let NeedToUpdate = {
                                "propunere": false,
                                "eval_db": false,
                                "eval_storage": false,
                                "user_evaluations":false
                            }
                            let requestFinished = false


                            //schimb proprietatea de completed de la propunere
                            propunere["evaluare_"+EV].completed = true

                            //schimb stadiu propunere
                            propunere.stadiu = propunere.stadiu === 2 ? 3 : 4

                            let updates = {}
                            updates[PUB+"/propuneri/"+EVAL_ID] = propunere
                            database.ref().update(updates)
                                .then(()=>{
                                    NeedToUpdate.propunere = true
                                })

                            //trimit evaluarea catre DB
                            database.ref(`${PUB}/evaluari/${EVAL_ID}/${EV}`).set(databaseEvalForm)
                                .then(()=>{
                                    NeedToUpdate.eval_db = true
                                })

                            //trimit evaluare catre Storage
                            firebase.storage().ref(`${PUB.toUpperCase()}/${propunere.id}-${PUB.toLowerCase()}-${propunere.id_autor}-ev${EV}.${FISIER_ADNOTARI_DOC.extension}`).put(FISIER_ADNOTARI_DOC.file)
                                .then(()=>{
                                    NeedToUpdate.eval_storage = true
                                })

                            // adaug evaluarea in lista de evaluari de la profilul meu
                            // sterg de_evaluat din lista de de_evaluat de la profilul meu
                            database.ref(`users/${getUserId()}`).once('value')
                                .then((snap)=>{
                                    let user = snap.val()
                                    if(user.evaluations)
                                        user.evaluations.push(propunere.id+'-'+EV+'-'+PUB.toLowerCase())
                                    else
                                        user.evaluations = [propunere.id+'-'+EV+'-'+PUB.toLowerCase()]

                                    const current_eval_id = user.to_evaluate.findIndex(element => element===`${propunere.id}-${EV}-${PUB.toLowerCase()}`)

                                    user.to_evaluate.splice(current_eval_id,1)

                                    let updates = {}
                                    updates[`users/${getUserId()}`] = user
                                    database.ref().update(updates)
                                    NeedToUpdate.user_evaluations = true
                                })

                            setInterval(()=>{
                                    if(requestFinished)
                                        clearInterval()

                                    let pass = true
                                    for(const [key,value] of Object.entries(NeedToUpdate)){
                                        if(value === false)
                                            pass = false

                                    if(pass){
                                        $("#formular-container").html(`<h2>${FormEnds[PUB.toUpperCase() === "DF" ? "eval-df" : "eval-af"]}</h2>`)
                                        requestFinished = true
                                    }
                                }

                            },800)

                        });
                        break

                    case 2:
                        database.ref(PUB + "/evaluari/" + EVAL_ID + "/" + EV).once('value')
                            .then((snapshot) => {
                                let dbObj = snapshot.val()

                                const FORMULAR_COMPLETED = `

        <div class="evaluare-pair">
            <span>L’article soumis à l’évaluation correspond-il à votre domaine de compétence?</span>
            <span>${dbObj.arieCompetenta}</span>
        </div>


        <div class="evaluare-pair">
            <span>Le titre de l’article est-il clair, informatif et conforme à la proposition qu’il annonce?</span>
            <span>${dbObj.conformitateTitlu}</span>
        </div>

        <div class="evaluare-pair">
            <span>Rezumatul poate fi considerat complet?</span>
            <span>${dbObj.completitudineRezumat}</span>
        </div>

        <div class="evaluare-pair">
            <span>Les mots clés sont-ils adéquats à la proposition d’article?</span>
            <span>${dbObj.cuvCheieAdecvate}</span>
        </div>

        <div class="evaluare-pair">
            <span>S’agit-il d’une recherche originale?</span>
            <span>${dbObj.originalitate}</span>
        </div>

        <div class="evaluare-pair">
            <span>La démarche scientifique proposée est-elle actuelle et pertinente?</span>
            <span>${dbObj.actualitate}</span>
        </div>


         <div class="evaluare-pair">
            <span>La cohérence et l’argumentation</span>
            <span>${dbObj.coerenta}</span>
        </div>

         <div class="evaluare-pair">
            <span>La langue et la qualité de l’écriture</span>
            <span>${dbObj.redactare}</span>
        </div>

         <div class="evaluare-pair">
            <span>La structure, le plan et l’organisation du texte</span>
            <span>${dbObj.structura}</span>
        </div>

        <div class="evaluare-pair">
            <span>La clarté des objectifs exposés</span>
            <span>${dbObj.obiective}</span>
        </div>

        <div class="evaluare-pair">
            <span>Les fondements théoriques</span>
            <span>${dbObj.fundamente}</span>
        </div>

        <div class="evaluare-pair">
            <span>La méthode de recherche utilisée</span>
            <span>${dbObj.cercetare}</span>
        </div>

        <div class="evaluare-pair">
            <span>Les résultats de la recherche sont bien corrélés avec les objectifs envisagés</span>
            <span>${dbObj.rezultate}</span>
        </div>

        <div class="evaluare-pair">
            <span>Les conclusions reflètent la démarche scientifique</span>
            <span>${dbObj.concluzii}</span>
        </div>


        <div class="evaluare-pair">
            <span>Les références bibliographiques sont structurées en fonction de leur importance dans la recherche : sources primaires, sources secondaires (exégèses), corpus, etc.</span>
            <span>${dbObj.referinte}</span>
        </div>


        <div class="evaluare-pair">
            <span>Commentaires</span>
            <span>${dbObj.comentarii}</span>
        </div>


        <div class="evaluare-pair">
            <span>Recommandations</span>
            <span>${dbObj.recomandari}</span>
        </div>


        <div class="evaluare-pair">
            <span>Article évalué et annoté</span>
            <span id="adnotari"></span>
        </div>`

                                var propunereRef = firebase.storage().ref(`${PUB.toUpperCase()}/${dbObj.fisier_adnotari}`);
                                propunereRef.getDownloadURL()
                                    .then((url) => {
                                        $("#adnotari").html(`<span><a href="${url}" target="__blank" style="color: black"><svg width="30" height="30" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="512" height="512" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0" transform="scale(0.00195312)"/></pattern><image id="image0" width="512" height="512" xlink:href="data:image/png;base64,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"/></defs></svg></a></span>`)
                                    })
                                    .catch((error) => {
                                        $("#adnotari").html(`<span>Error: ${error.code}</span>`)
                                    });

                                document.getElementById("formular-container").insertAdjacentHTML("beforeend",FORMULAR_COMPLETED)
                            })

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
    let userRank = JSON.parse(window.sessionStorage.getItem("accountStatus")).account.rank
    let userID = JSON.parse(window.sessionStorage.getItem("accountStatus")).account.id
    //verificam daca userul este sef, apoi verificam daca evaluare este completata sau nu
    if(RIGHTS[userRank]['access-eval-pages']){
        if(val['evaluare_'+EV]['completed']){
            return 2
        }
        else return 3
    }
    //daca userul nu este sef verificam daca este evaluator, dupa verificam daca este completata sau nu
    if(userID==val['evaluare_'+EV]['evaluator']){
        if(val['evaluare_'+EV]['completed']) return 2
        else return 1
    }
    //daca nu e nici sef nici evaluator nu are ce cauta aici
    return 0
}
