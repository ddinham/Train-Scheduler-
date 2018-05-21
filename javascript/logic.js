/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train schedule database.
// 4. Create a way to calculate the next arrival time for each train. Using difference between start and current time.
//    Then use moment.js formatting to set difference in minutes reamin until the trains arrive at their station.

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBXcgjMbEQCf2ktZY9oBL49R_zvd_NlA6g",
    authDomain: "train-schedule-67289.firebaseapp.com",
    databaseURL: "https://train-schedule-67289.firebaseio.com",
    projectId: "train-schedule-67289",
    storageBucket: "train-schedule-67289.appspot.com",
    messagingSenderId: "879359219791"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirst = moment($("#first-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = moment($("#frequency-input").val().trim(),"m");

  // Creates local "temporary" object for holding train data
  var newTrain = {
    "name": trainName,
    "destination": trainDestination,
    "first": trainFirst,
    "frequency": trainFrequency
  };

  // Uploads train data to the database
  database.ref("/trains").push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirst);
  console.log(trainFrequency);

  
 // Assumptions
//  var tFrequency = 3;

 // Time is 3:30 AM
//  var firstTime = "03:30";

 // First Time (pushed back 1 year to make sure it comes before current time)
 var trainFirstConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
 console.log(trainFirstConverted);

 // Current Time
 var currentTime = moment();
 console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

 // Difference between the times
 var diffTime = moment().diff(moment(trainFirstConverted), "minutes");
 console.log("DIFFERENCE IN TIME: " + diffTime);

 // Time apart (remainder)
 var tRemainder = diffTime % tFrequency;
 console.log(tRemainder);

 // Minute Until Train
 var tMinutesTillTrain = trainFrequency - tRemainder;
 console.log("MINUTES AWAY: " + tMinutesTillTrain);

 // Next Train
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("NEXT ARRIVAL: " + moment(nextTrain).format("hh:mm")); 
  
  
  
  
  
  // Prettify the train first departure from station
//   var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

  // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + tMinutesTillTrain + "</td><td>" + nextTrain + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case

