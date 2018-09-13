database.ref().on("child_added", function (Snapshot){

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    var myPet;

    if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
    }

    if (Snapshot.val().userID == uid) {
        var petImg = Snapshot.val().pet.imgURL;
        myPet = $("<tr>").append(
            $("<td>").append('<img class ="img-fluid" src="' + petImg + '">'),
            $("<td>").text(Snapshot.val().pet.petName),
            $("<td>").text(Snapshot.val().pet.lastLoc),
            $("<td>").text(Snapshot.val().pet.lastDate),
            $("<td>").text(Snapshot.val().pet.petType),
            $("<td>").text(Snapshot.val().pet.reward),
        )
    }
    
// Append the new row to the table
$("#myPet > tbody").append(myPet);
});