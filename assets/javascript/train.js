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
  var firstTrainTime = "";
  var frequency = "";

  $(".submit").on("click", function(event) {
    event.preventDefault();

  trainName = $("#train-name-input").val().trim();
  destination =$("#destination-input").val().trim();
  firstTrainTime = $("#first-train-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  database.ref("train-scheduler").push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
  });
});

    database.ref("train-scheduler").on("child_added", function(snapshot) {

        var trainScheduler = snapshot.val();

        var tableRow = $("<tr>");
        var tableData = "<td>";
        var tableBody =$("<tbody>");

        tableRow.append($(tableData).text(trainScheduler.trainName));
        tableRow.append($(tableData).text(trainScheduler.destination));
        tableRow.append($(tableData).text(trainScheduler.firstTrainTime));
        tableRow.append($(tableData).text(trainScheduler.frequency));

        tableBody.append(tableRow);
        $("#tbody").append(tableRow);


    },
        function(errorObject) {
            console.log("Errors handled: " + errorObject.code)
        })

