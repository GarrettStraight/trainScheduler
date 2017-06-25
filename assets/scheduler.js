// Globals
var config = {
    apiKey: "AIzaSyBBoyZvc0BR5QIoIoBGD7wepn5wHsZHiNs",
    authDomain: "cool-f0a13.firebaseapp.com",
    databaseURL: "https://cool-f0a13.firebaseio.com",
    projectId: "cool-f0a13",
    storageBucket: "cool-f0a13.appspot.com",
    messagingSenderId: "633106733016"
};

firebase.initializeApp(config);
// Create a variable to reference the database.
var database = firebase.database();


var currentTime = moment();



console.log(currentTime)


var name = "";
var destination = "";
var newTrainTime = "";
var arrival = "";
var minutesAway = "";



$("#submit").on("click", function(event) {
      event.preventDefault();
      // Grabbed values from text boxes
      name = $("#nameInput").val().trim();
      destination = $("#destinationInput").val().trim();
      newTrainTime = $("#startTimeInput").val().trim();
      minutesAway = $("#frequencyInput").val().trim();


      console.log(name)
      console.log(destination)
      // Code for handling the push
      database.ref().push({
        name: name,
        destination: destination,
        newTrainTime: newTrainTime,
        minutesAway: minutesAway

      });

    });


	 // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();
      var p = snapshot.val().name;
      // Getting an array of each key In the snapshot object
      var svArr = Object.keys(sv);
      // Finding the last user's key
      var lastIndex = svArr.length - 1;
      var lastKey = svArr[lastIndex];
      // Using the last user's key to access the last added user object
      var lastObj = sv[lastKey]
      // Console.loging the last user's data
      console.log(p);
      console.log(lastObj.destination);
      console.log(lastObj.newTrainTime);
      console.log(lastObj.minutesAway);
      // Change the HTML to reflect
      $("#trainName").append(lastObj.name);
      $("#trainDestination").append(lastObj.destination);
      $("#trainFrequency").append(lastObj.newTrainTime);
      $("#trainMinutesAway").append(lastObj.minutesAway);
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
// Assume the following situations.
    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away
    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away
    // ==========================================================
    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18
    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21
    // Assumptions
    // var tFrequency = 3;
    // // Time is 3:30 AM
    // var firstTime = "03:30";
    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);
    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);
    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);
    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));