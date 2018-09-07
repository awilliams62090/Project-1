$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAuLgvbFiomHN1mZoxrS6YYcvPI1oGznqw",
        authDomain: "homewardfound-e93a2.firebaseapp.com",
        databaseURL: "https://homewardfound-e93a2.firebaseio.com",
        projectId: "homewardfound-e93a2",
        storageBucket: "homewardfound-e93a2.appspot.com",
        messagingSenderId: "1031249661778"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    //Button for adding info to profile. 
    $("#add-user").on("click", function (event) {
        event.preventDefault();
        //grab user input
        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var petName = $("#pet-name").val().trim();
        var petType = $("#pet-type").val().trim();
        var breed = $("#breed").val().trim();
        var phone = $("#phone").val().trim();
        var lastLoc = $("#last-seen-location").val().trim();
        var lastDate = $("#last-seen-date").val().trim();
        var description = $("#description").val().trim();
        var reward = $("#reward").val().trim();
        var photo = $("#file-upload").val().trim();

        var newUser = {
            name: name,
            email: email,
            petName: petName,
            petType: petType,
            breed: breed,
            phone: phone,
            lastLoc: lastLoc,
            lastDate: lastDate,
            description: description,
            reward: reward,
            photo: photo
        };

        database.ref().push(newUser);
        console.log(newUser);

        $("#name").val("");
        $("#email").val("");
        $("#pet-name").val("");
        $("#pet-type").val("");
        $("#breed").val("");
        $("#phone").val("");
        $("#last-seen-location").val("");
        $("#last-seen-date").val("");
        $("#description").val("");
        $("#reward").val("");
        $("#file-upload").val("");

    });
})