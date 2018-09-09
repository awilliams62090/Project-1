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
    var storage = firebase.storage();