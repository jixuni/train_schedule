$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyBv8g5wCqJzpAlBTtdbfXmmY8YPSONmYXE",
        authDomain: "train-schedule-7edde.firebaseapp.com",
        databaseURL: "https://train-schedule-7edde.firebaseio.com",
        projectId: "train-schedule-7edde",
        storageBucket: "train-schedule-7edde.appspot.com",
        messagingSenderId: "235273511954"
      };
    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName, destination, trainFrequency, firstTrainTime = "";
    // var destination = "";
    // var trainFrequency ="";
    // var firstTrainTime ="";

    $(".btn").on("click", function(event){
        event.preventDefault();
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        trainFrequency = $("#trainFrequency").val().trim();
        firstTrainTime = $("#firstTrainTime").val().trim();

        var trainData = {
            trainName: trainName,
            destination: destination,
            trainFrequency: trainFrequency,
            firstTrainTime: firstTrainTime,
            timeAdded: firebase.database.ServerValue.TIMESTAMP,
        }
        
        database.ref().push(trainData)
        
        console.log(trainData.trainName);
        console.log(trainData.destination);
        console.log(trainData.trainFrequency);
        console.log(trainData.firstTrainTime);
        console.log(trainData.timeAdded);

        
        var form = document.getElementById("trainForm");
        form.reset();
        // $("#trainName").val("");
        // $("#destination").val("");
        // $("#trainFrequency").val("");
        // $("#firstTrainTime").val("");
    })

    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());

        var dataName = childSnapshot.val().trainName;
        var dataDestination = childSnapshot.val().destination;
        var dataTrainFrequency = childSnapshot.val().trainFrequency;
        var datafirstTrain = childSnapshot.val().firstTrainTime;

        console.log(dataName);
        console.log(dataDestination);
        console.log(dataTrainFrequency);
        console.log(datafirstTrain);
    })














    
})