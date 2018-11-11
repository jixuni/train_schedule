$(document).ready(function(){

    function htmlClock (){
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();

       
        // used ternary instead of doing multiple if statement
        // adds 0 in front of clock digit for aesthetics 
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        

        var time = h + ":" + m + ":" + s;
        $("#clock").html("Current time: " + time);
    }

    setInterval(htmlClock, 1000);

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
    
        var form = document.getElementById("trainForm");
        form.reset();
    })

    database.ref().on("child_added", function(childSnapshot){
    
        var dataName = childSnapshot.val().trainName;

        var dataDestination = childSnapshot.val().destination;

        var dataTrainFrequency = childSnapshot.val().trainFrequency;

        var datafirstTrain = childSnapshot.val().firstTrainTime;

        
        
        var currentTime = moment(datafirstTrain, "HH:mm");
        
        
        var timeDiff = moment().diff(currentTime, "minutes");
        
        var timeRemainder = timeDiff % dataTrainFrequency;
        

        var nextTrainMin = dataTrainFrequency - timeRemainder;
        

        var timeNexttrain = moment().add(nextTrainMin, "minutes");
        

        var addRow = $("<tr>").append(
            $("<td>").text(dataName),
            $("<td>").text(dataDestination),
            $("<td>").text(dataTrainFrequency),
            $("<td>").text(moment(timeNexttrain).format("hh:mm")),
            $("<td>").text(nextTrainMin),
        );
        $("#trainTable > tbody").append(addRow);
        
        
        
    })

})