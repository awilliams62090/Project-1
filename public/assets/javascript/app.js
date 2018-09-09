
document.addEventListener("DOMContentLoaded", function (event) {

    var imgURL = '';
    var fileButton = document.getElementById('file-upload');

        // Upload image
    fileButton.addEventListener('change', function (e) {
        // Get file
        var file = e.target.files[0];
        // Create a storage reference
        var storageRef = firebase.storage().ref('images/' + userID + '-' + file.name);
        // Get the download URL
        storageRef.getDownloadURL().then(function(url) {
            imgURL = url;
          })
        // Upload file
        storageRef.put(file);
    });

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

        var newUser = {
            name: name,
            userID: userID,
            email: email,
            pet: {
                petName: petName,
                petTpye: petType,
                breed: breed,
                phone: phone,
                lastLoc: lastLoc,
                lastDate: lastDate,
                description: description,
                reward: reward,
                imgURL: imgURL
            }
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
});