document.addEventListener("DOMContentLoaded", function (event) {

    var petName = document.getElementsByName("pet-name")
    var fileButton = document.getElementById('file-upload');
    var petDescription = document.getElementsByName('petDescription');

    var petNameExample = document.getElementById('petNameExample');
    var petImgExample = document.getElementById('petImgExample');
    var petDescriptionExample = document.getElementById('petDescriptionExample');
    var uploadStatus = document.getElementById('uploadStatus');

    var imgURL = '';

    // event listeners 
    petName[0].addEventListener('change', writePetName);
    fileButton.addEventListener('change', writePetImgExample);
    petDescription[0].addEventListener('change', writePetDescription);

    // functions for event listeners
    function writePetName() {
        petNameExample.innerHTML = this.value;
    }
    function writePetDescription() {
        petDescriptionExample.innerHTML = this.value;
    }
    function writePetImgExample(e) {
        // Get file
        var file = e.target.files[0];
        // Create a storage reference
        var storageRef = firebase.storage().ref('images/' + userID + '-' + file.name);
        // Upload file
        var uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    // console.log('Upload is running');
                    uploadStatus.innerText = 'Image is uploading: ' + progress + '%';
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
        }, function (e) {
            // Handle successful uploads on complete
            // Get download URL
            storageRef.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                imgURL = downloadURL;
                petImgExample.src = downloadURL;
                uploadStatus.innerText = '';
            });
        });
    }

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