const firebaseConfig = {
    apiKey: "AIzaSyDL7z-puep3pACXMypPbf7dFGahwdiAcQo",
    authDomain: "centrul-de-studii-franco-feacf.firebaseapp.com",
    databaseURL: "https://centrul-de-studii-franco-feacf-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "centrul-de-studii-franco-feacf",
    storageBucket: "centrul-de-studii-franco-feacf.appspot.com",
    messagingSenderId: "707386481280",
    appId: "1:707386481280:web:4ca25d2bb5fc64d676a465",
    measurementId: "G-GL98Z7QWFV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();
