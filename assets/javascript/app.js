// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-vRgWa_Qq5CLIHYs3ZM1RUBjmXhTJcnA",
    authDomain: "train-scheduler-45881.firebaseapp.com",
    databaseURL: "https://train-scheduler-45881.firebaseio.com",
    projectId: "train-scheduler-45881",
    storageBucket: "train-scheduler-45881.appspot.com",
    messagingSenderId: "1031995942365"
};
firebase.initializeApp(config);

var database = firebase.database();


database.ref().on("child_added", function (childSnapshot) {


    var convert = moment(childSnapshot.val().startTime, "HH:mm").subtract(1, "days")
    var difference = moment().diff(moment(convert), "minutes")
    var remainder = difference % childSnapshot.val().frequency
    var timeTillNext = childSnapshot.val().frequency - remainder
    var nextTrain = moment().add(timeTillNext, "minutes").format("hh:mm a")

    
    var newTrain = $("<tr>").append(
        $("<td>").html("<strong>" + childSnapshot.val().train + "</strong>"),
        $("<td>").text(childSnapshot.val().destination),
        $("<td>").text(childSnapshot.val().firsttrain),
        $("<td>").text(childSnapshot.val().frequency),
        $("<td>").text(nextTrain)
    )

    $("#tables").append(newTrain);

    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firsttrain);
    console.log(childSnapshot.val().frequency);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

$(document).ready(function () {
    
    $("#submit").on("click", function(){

        event.preventDefault();

        var train = $("#train").val().trim()
        var destination = $("#destination").val().trim()
        var firsttrain = $("#firsttrain").val().trim()
        var frequency = $("#frequency").val().trim()
        
        console.log(train)
        console.log(destination)
        console.log(firsttrain)
        console.log(frequency)

        database.ref().push({
            train: train,
            destination: destination,
            firsttrain: firsttrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });
});