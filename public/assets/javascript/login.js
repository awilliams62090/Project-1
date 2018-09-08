$(document).ready(function () {
var config = {
    apiKey: "AIzaSyAuLgvbFiomHN1mZoxrS6YYcvPI1oGznqw",
    authDomain: "homewardfound-e93a2.firebaseapp.com",
    databaseURL: "https://homewardfound-e93a2.firebaseio.com",
    projectId: "homewardfound-e93a2",
    storageBucket: "homewardfound-e93a2.appspot.com",
    messagingSenderId: "1031249661778"
};

firebase.initializeApp(config);

//Get elements for login page
var txtEmail = $("#txtEmail");
var txtPassword = $("#txtPassword");
var btnLogin = $("#btnLogin");
var btnSignUp = $("#btnSignup");
var btnLogout = $("#btnLogout");

//log in event 
btnLogin.on("click", function(){
    event.preventDefault();
    var email = txtEmail.val();
    var pass = txtPassword.val();
    var auth = firebase.auth();
    var promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

});
// sign up event 
btnSignUp.on("click", function(){
    event.preventDefault();
    var email = txtEmail.val();
    var pass = txtPassword.val();
    var auth = firebase.auth();
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

});

//log out event 
btnLogout.on("click", function() {
    firebase.auth().signOut();
});


//adding real time listener for when user is logged in vs. out
firebase.auth().onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
        console.log(firebaseUser);
        $("#btnLogout").removeClass("hide");
    } else {
        console.log("not logged in");
        $("#btnLogout").addClass("hide");
    }
});



})
