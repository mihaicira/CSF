const RANKS = {
    admin:{
        id: "admin",
        nume: "Administrator",
        weight: 1
    },
    rsdf:{
        id: "rsdf",
        nume: "Redactor șef Dialogues Francophones",
        weight: 2
    },
    redresdf:{
        id: "redresdf",
        nume: "Redactor responsabil Dialogues Francophones",
        weight: 3
    },
    redresaf:{
        id: "redresaf",
        nume: "Redactor responsabil Agapes Francophones",
        weight: 3
    },
    mcaf:{
        id: "mcaf",
        nume: "Membru în comitetul de redacție Agapes Francophones",
        weight: 4
    },
    mcdf:{
        id: "mcdf",
        nume: "Membru în comitetul de redacție Dialogues Francophones",
        weight: 4
    },
    evdf:{
        id: "evdf",
        nume: "Evaluator Dialogues Francophones",
        weight: 5
    },
    evaf:{
        id: "evaf",
        nume: "Evaluator Agapes Francophones",
        weight: 5
    },
    adf:{
        id: "adf",
        nume: "Autor Dialogues Francophones",
        weight: 6
    },
    aaf:{
        id: "aaf",
        nume: "Autor Agapes Francophones",
        weight: 6
    }
}

const LoginSignupErrors = {
    1: "Mot de passe trop court",
    2: "Mot de passe incorrect. Veuillez réessayer",
    3: "Désolé, nous ne reconnaissons pas cette adresse mail",
    4: "Désolé, il existe déjà un compte avec cette adresse mail",
    5: "Données incorrectes. Veuillez réessayer"
}

const CONTRIBUTION_STATUS = {
    1: "Contributia a fost trimisa",
    2: "Contributia a fost asignata evaluatorilor",
    3: "Contributia a fost evaluata de un evaluator",
    4: "Contributia a fost evaluata de doi evaluatori",
    5: "Procesul contributiei a fost finalizat"
}

const GeneralErrors = {
    "not-authorized":"Nu sunteti autorizat pentru aceasta actiune",
    "doesnt-exist":"Aceasta propunere nu exista",
    "not-completed":"Aceasta propunere nu a fost inca evaluata",
    "TBA":"Aici trebuie sa facem in caz ca e deja completat si are si acces"
}

const ProfileErrors = {
    "no-cotrib-prop": "Nu exista nicio contributie propusa",
    "no-art-eval":"Nu exista niciun articol evaluat",
    "no-art-to-eval":"Nu exista niciun articol de evaluat"
}

const RIGHTS =  {
    admin:{
        "to-eval": true,
        "change-to-rsdf": true,
        "change-to-redresdf": true,
        "change-to-redresaf": true,
        "change-to-mcdf": true,
        "change-to-mcaf": true,
        "change-to-evdf": true,
        "change-to-evaf": true,
        "contributii-propuse-panel": true,
        "articole-evaluate-panel": false,
        "articole-de-evaluat-panel": false,
        "df-articole-assign-panel": true,
        "af-articole-assign-panel": true,
        "df-contributii-wip-panel": true,
        "af-contributii-wip-panel": true,
        "df-contributii-finalizate-panel": true,
        "af-contributii-finalizate-panel": true,
        "access-cieft-page": true,
        "access-members-page": true,
        "access-eval-pages": false,
        "df-access-contributii-page": true,
        "af-access-contributii-page": true
    },
    rsdf:{
        "to-eval": false,
        "change-to-rsdf": false,
        "change-to-redresdf": true,
        "change-to-redresaf": false,
        "change-to-mcdf": true,
        "change-to-mcaf": false,
        "change-to-evdf": true,
        "change-to-evaf": false,
        "contributii-propuse-panel": false,
        "articole-evaluate-panel": false,
        "articole-de-evaluat-panel": false,
        "df-articole-assign-panel": true,
        "af-articole-assign-panel": false,
        "df-contributii-wip-panel": true,
        "af-contributii-wip-panel": false,
        "df-contributii-finalizate-panel": true,
        "af-contributii-finalizate-panel": false,
        "access-cieft-page": true,
        "access-members-page": true,
        "access-eval-pages": true,
        "df-access-contributii-page": true,
        "af-access-contributii-page": false
    },
    redresdf: {
        "to-eval": false,
        "change-to-rsdf": false,
        "change-to-redresdf": false,
        "change-to-redresaf": false,
        "change-to-mcdf": true,
        "change-to-mcaf": false,
        "change-to-evdf": true,
        "change-to-evaf": false,
        "contributii-propuse-panel": true,
        "articole-evaluate-panel": false,
        "articole-de-evaluat-panel": false,
        "df-articole-assign-panel": true,
        "af-articole-assign-panel": false,
        "df-contributii-wip-panel": true,
        "af-contributii-wip-panel": false,
        "df-contributii-finalizate-panel": true,
        "af-contributii-finalizate-panel": false,
        "access-cieft-page": true,
        "access-members-page": true,
        "access-eval-pages": true,
        "df-access-contributii-page": true,
        "af-access-contributii-page": false
    },
    redresaf:{
        "to-eval": false,
        "change-to-rsdf": false,
        "change-to-redresdf": false,
        "change-to-redresaf": false,
        "change-to-mcdf": false,
        "change-to-mcaf": true,
        "change-to-evdf": false,
        "change-to-evaf": true,
        "contributii-propuse-panel": false,
        "articole-evaluate-panel": false,
        "articole-de-evaluat-panel": false,
        "df-articole-assign-panel": false,
        "af-articole-assign-panel": true,
        "df-contributii-wip-panel": false,
        "af-contributii-wip-panel": true,
        "df-contributii-finalizate-panel": false,
        "af-contributii-finalizate-panel": true,
        "access-cieft-page": true,
        "access-members-page": true,
        "access-eval-pages": true,
        "df-access-contributii-page": false,
        "af-access-contributii-page": true
    },
    mcdf:{
        "to-eval": false,
        "change-to-rsdf": false,
        "change-to-redresdf": false,
        "change-to-redresaf": false,
        "change-to-mcdf": false,
        "change-to-mcaf": false,
        "change-to-evdf": true,
        "change-to-evaf": false,
        "contributii-propuse-panel": true,
        "articole-evaluate-panel": false,
        "articole-de-evaluat-panel": false,
        "df-articole-assign-panel": false,
        "af-articole-assign-panel": false,
        "df-contributii-wip-panel": false,
        "af-contributii-wip-panel": false,
        "df-contributii-finalizate-panel": false,
        "af-contributii-finalizate-panel": false,
        "access-cieft-page": false,
        "access-members-page": false,
        "access-eval-pages": false,
        "df-access-contributii-page": false,
        "af-access-contributii-page": false
    },
    mcaf:{
        "to-eval": false,
        "change-to-rsdf": false,
        "change-to-redresdf": false,
        "change-to-redresaf": false,
        "change-to-mcdf": false,
        "change-to-mcaf": false,
        "change-to-evdf": false,
        "change-to-evaf": true,
        "contributii-propuse-panel": true,
        "articole-evaluate-panel": false,
        "articole-de-evaluat-panel": false,
        "df-articole-assign-panel": false,
        "af-articole-assign-panel": false,
        "df-contributii-wip-panel": false,
        "af-contributii-wip-panel": false,
        "df-contributii-finalizate-panel": false,
        "af-contributii-finalizate-panel": false,
        "access-cieft-page": false,
        "access-members-page": false,
        "access-eval-pages": false,
        "df-access-contributii-page": false,
        "af-access-contributii-page": false
    },
    evdf:{
        "to-eval": true,
        "change-to-rsdf": false,
        "change-to-redresdf": false,
        "change-to-redresaf": false,
        "change-to-mcdf": false,
        "change-to-mcaf": false,
        "change-to-evdf": false,
        "change-to-evaf": false,
        "contributii-propuse-panel": true,
        "articole-evaluate-panel": true,
        "articole-de-evaluat-panel": true,
        "df-articole-assign-panel": false,
        "af-articole-assign-panel": false,
        "df-contributii-wip-panel": false,
        "af-contributii-wip-panel": false,
        "df-contributii-finalizate-panel": false,
        "af-contributii-finalizate-panel": false,
        "access-cieft-page": false,
        "access-members-page": false,
        "access-eval-pages": false,
        "df-access-contributii-page": false,
        "af-access-contributii-page": false
    },
    evaf:{
        "to-eval": true,
        "change-to-rsdf": false,
        "change-to-redresdf": false,
        "change-to-redresaf": false,
        "change-to-mcdf": false,
        "change-to-mcaf": false,
        "change-to-evdf": false,
        "change-to-evaf": false,
        "contributii-propuse-panel": true,
        "articole-evaluate-panel": true,
        "articole-de-evaluat-panel": true,
        "df-articole-assign-panel": false,
        "af-articole-assign-panel": false,
        "df-contributii-wip-panel": false,
        "af-contributii-wip-panel": false,
        "df-contributii-finalizate-panel": false,
        "af-contributii-finalizate-panel": false,
        "access-cieft-page": false,
        "access-members-page": false,
        "access-eval-pages": false,
        "df-access-contributii-page": false,
        "af-access-contributii-page": false
    },
    aaf:{
        "to-eval": false,
        "change-to-rsdf": false,
        "change-to-redresdf": false,
        "change-to-redresaf": false,
        "change-to-mcdf": false,
        "change-to-mcaf": false,
        "change-to-evdf": false,
        "change-to-evaf": false,
        "contributii-propuse-panel": true,
        "articole-evaluate-panel": false,
        "articole-de-evaluat-panel": false,
        "df-articole-assign-panel": false,
        "af-articole-assign-panel": false,
        "df-contributii-wip-panel": false,
        "af-contributii-wip-panel": false,
        "df-contributii-finalizate-panel": false,
        "af-contributii-finalizate-panel": false,
        "access-cieft-page": false,
        "access-members-page": false,
        "access-eval-pages": false,
        "df-access-contributii-page": false,
        "af-access-contributii-page": false
    },
    adf:{
        "to-eval": false,
        "change-to-rsdf": false,
        "change-to-redresdf": false,
        "change-to-redresaf": false,
        "change-to-mcdf": false,
        "change-to-mcaf": false,
        "change-to-evdf": false,
        "change-to-evaf": false,
        "contributii-propuse-panel": true,
        "articole-evaluate-panel": false,
        "articole-de-evaluat-panel": false,
        "df-articole-assign-panel": false,
        "af-articole-assign-panel": false,
        "df-contributii-wip-panel": false,
        "af-contributii-wip-panel": false,
        "df-contributii-finalizate-panel": false,
        "af-contributii-finalizate-panel": false,
        "access-cieft-page": false,
        "access-members-page": false,
        "access-eval-pages": false,
        "df-access-contributii-page": false,
        "af-access-contributii-page": false
    }
}

const months_short = {
    'Jan': 'January',
    'Feb':'February',
    'Mar':'March',
    'Apr':'April',
    'May':'May',
    'Jun':'June',
    'Jul':'July',
    'Aug':'August',
    'Sep':'September',
    'Oct':'October',
    'Nov':'November',
    'Dec':'December'
}

const months_num = {
    'January': 0 ,
    'February': 1,
    'March': 2,
    'April': 3,
    'May': 4,
    'June': 5,
    'July': 6,
    'August': 7,
    'September': 8,
    'October': 9,
    'November': 10,
    'December': 11
}

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
]