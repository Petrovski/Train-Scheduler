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

        database.ref().on("child_added", function (childSnapshot) {

        var newTrain = $("<tr>")
        $("#tables").append(newTrain);
        $(newTrain).prepend($("<td>")).text(train);
        $(newTrain).append($("<td>")).text(destination);
        $(newTrain).append($("<td>")).text(firsttrain);
        $(newTrain).append($("<td>")).text(frequency);

            console.log(childSnapshot.val().train);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().firsttrain);
            console.log(childSnapshot.val().frequency);

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    });
});