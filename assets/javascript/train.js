var firebaseConfig = {
    apiKey: "AIzaSyBltnyVVgAHFPDSvrjvcFHpTpMg4PZghZc",
    authDomain: "matthewryanhag.firebaseapp.com",
    databaseURL: "https://matthewryanhag.firebaseio.com",
    projectId: "matthewryanhag",
    storageBucket: "matthewryanhag.appspot.com",
    messagingSenderId: "473975414003",
    appId: "1:473975414003:web:230ab98b5acb5d9a"
  };

  firebase.initializeApp(firebaseConfig);


  var database = firebase.database();

  var trainName = "";
  var destination= "";
  var firstTrainTime = "03:30";
  var frequency = "";


  $(".submit").on("click", function(event) {
    event.preventDefault();

  trainName = $("#train-name-input").val().trim();
  destination =$("#destination-input").val().trim();
  firstTrainTime = $("#first-train-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  if (trainName === "" || destination === "" || firstTrainTime === "" || frequency === "") {
    alert("Please input all of the train information. Thanks!");
    return false;
    } else {

  database.ref("train-scheduler").push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
  });

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
  }
});
  

    database.ref("train-scheduler").on("child_added", function(snapshot) {

        var trainScheduler = snapshot.val();

        var now = moment();

        frequency = trainScheduler.frequency;
        firstTrainTime = trainScheduler.firstTrainTime;

        var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        var fromNow = now.diff(moment(firstTimeConverted), "minutes");
        var timeRemaining = fromNow % frequency;
        var minutesLeft = frequency - timeRemaining;
        var nextTrain = now.add(minutesLeft, "minutes").format("LT");

        var tableRow = $("<tr>");
        var tableData = "<td>";
        var tableBody= $("#tbody");

        tableRow.append($(tableData).text(trainScheduler.trainName));
        tableRow.append($(tableData).text(trainScheduler.destination));
        tableRow.append($(tableData).text(frequency));
        tableRow.append($(tableData).text(nextTrain));
        tableRow.append($(tableData).text(minutesLeft));

        tableBody.append(tableRow);


    },
        function(errorObject) {
            console.log("Errors handled: " + errorObject.code)
        })

