database.ref().on("child_added", function (Snapshot){

    var petName = Snapshot.val().pet.petName;
    var lastLoc = Snapshot.val().pet.lastLoc;
    var lastDate = Snapshot.val().pet.lastDate;
    var petType = Snapshot.val().pet.petType;
    var breed = Snapshot.val().pet.breed;
    


    console.log(petName);
    console.log(lastLoc);
    console.log(lastDate);
    console.log(petType);
    console.log(breed);
    

    // Create the new row
    var newPet = $("<tr>").append(
        $("<td>").text(petName),
        $("<td>").text(lastLoc),
        $("<td>").text(lastDate),
        $("<td>").text(petType),
        $("<td>").text(breed)
    );

    // Append the new row to the table
    $("#browsePets > tbody").append(newPet);
})
