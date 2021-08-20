const RANKS = {
    admin:{
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
    1: "Password is too short",
    2: "Passwords do not match",
    3: "Email address is not valid",
    4: "There already is an account with this email address",
    5: "Incorrect data. Try again"
}

//~~~~~~~~~~~~~~RIGHTS~~~~~~~~~~~~~~~
const RIGHTS = {
    0:{
        'to-propose': false,
        'to-eval': false,
        'change-to-999': false,
        'change-to-909': false,
        'change-to-808': false,
        'change-to-707': false,
        'change-to-606': false,
        'change-to-505': false,
        'change-to-404': false,
        'change-to-303': false,
        'change-to-202': false,
        'change-to-101': false,
        'view-DF-props': false,
        'view-AF-props': false,
        'assign-DF-props': false,
        'assign-AF-props': false
    },
    101:{
        'to-propose': false,
        'to-eval': false,
        'change-to-999': false,
        'change-to-909': false,
        'change-to-808': false,
        'change-to-707': false,
        'change-to-606': false,
        'change-to-505': false,
        'change-to-404': false,
        'change-to-303': false,
        'change-to-202': false,
        'change-to-101': false,
        'view-DF-props': false,
        'view-AF-props': false,
        'assign-DF-props': false,
        'assign-AF-props': false
    },
    202:{
        'to-propose': false,
        'to-eval': false,
        'change-to-999': false,
        'change-to-909': false,
        'change-to-808': false,
        'change-to-707': false,
        'change-to-606': false,
        'change-to-505': false,
        'change-to-404': false,
        'change-to-303': false,
        'change-to-202': false,
        'change-to-101': false,
        'view-DF-props': false,
        'view-AF-props': false,
        'assign-DF-props': false,
        'assign-AF-props': false
    },
    303:{
        'to-propose': false,
        'to-eval': false,
        'change-to-999': false,
        'change-to-909': false,
        'change-to-808': false,
        'change-to-707': false,
        'change-to-606': false,
        'change-to-505': false,
        'change-to-404': false,
        'change-to-303': false,
        'change-to-202': false,
        'change-to-101': false,
        'view-DF-props': false,
        'view-AF-props': false,
        'assign-DF-props': false,
        'assign-AF-props': false
    },
    404:{
        'to-propose': false,
        'to-eval': false,
        'change-to-999': false,
        'change-to-909': false,
        'change-to-808': false,
        'change-to-707': false,
        'change-to-606': false,
        'change-to-505': false,
        'change-to-404': false,
        'change-to-303': false,
        'change-to-202': false,
        'change-to-101': false,
        'view-DF-props': false,
        'view-AF-props': false,
        'assign-DF-props': false,
        'assign-AF-props': false
    },
    505:{
        'to-propose': false,
        'to-eval': false,
        'change-to-999': false,
        'change-to-909': false,
        'change-to-808': false,
        'change-to-707': false,
        'change-to-606': false,
        'change-to-505': false,
        'change-to-404': false,
        'change-to-303': false,
        'change-to-202': false,
        'change-to-101': false,
        'view-DF-props': false,
        'view-AF-props': false,
        'assign-DF-props': false,
        'assign-AF-props': false
    },
    606:{
        'to-propose': false,
        'to-eval': false,
        'change-to-999': false,
        'change-to-909': false,
        'change-to-808': false,
        'change-to-707': false,
        'change-to-606': false,
        'change-to-505': false,
        'change-to-404': false,
        'change-to-303': false,
        'change-to-202': false,
        'change-to-101': false,
        'view-DF-props': false,
        'view-AF-props': false,
        'assign-DF-props': false,
        'assign-AF-props': false
    },
    707:{
        'to-propose': false,
        'to-eval': false,
        'change-to-999': false,
        'change-to-909': false,
        'change-to-808': false,
        'change-to-707': false,
        'change-to-606': false,
        'change-to-505': false,
        'change-to-404': false,
        'change-to-303': false,
        'change-to-202': false,
        'change-to-101': false,
        'view-DF-props': false,
        'view-AF-props': false,
        'assign-DF-props': false,
        'assign-AF-props': false
    },
    808:{
        'to-propose': false,
        'to-eval': false,
        'change-to-999': false,
        'change-to-909': false,
        'change-to-808': false,
        'change-to-707': false,
        'change-to-606': false,
        'change-to-505': false,
        'change-to-404': false,
        'change-to-303': false,
        'change-to-202': false,
        'change-to-101': false,
        'view-DF-props': false,
        'view-AF-props': false,
        'assign-DF-props': false,
        'assign-AF-props': false
    },
    909:{
        'to-propose': false,
        'to-eval': false,
        'change-to-999': false,
        'change-to-909': false,
        'change-to-808': false,
        'change-to-707': false,
        'change-to-606': false,
        'change-to-505': false,
        'change-to-404': false,
        'change-to-303': false,
        'change-to-202': false,
        'change-to-101': false,
        'view-DF-props': false,
        'view-AF-props': false,
        'assign-DF-props': false,
        'assign-AF-props': false
    },
    999:{
        'to-propose': false,
        'to-eval': false,
        'change-to-999': false,
        'change-to-909': false,
        'change-to-808': false,
        'change-to-707': false,
        'change-to-606': false,
        'change-to-505': false,
        'change-to-404': false,
        'change-to-303': false,
        'change-to-202': false,
        'change-to-101': false,
        'view-DF-props': false,
        'view-AF-props': false,
        'assign-DF-props': false,
        'assign-AF-props': false
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
