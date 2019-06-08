

  var firebaseConfig = {
    apiKey: "AIzaSyCFm0KFQ-GDKkPEZMByAqHJoTG4WN5TPR0",
    authDomain: "casual-salad-redo.firebaseapp.com",
    databaseURL: "https://casual-salad-redo.firebaseio.com",
    projectId: "casual-salad-redo",
    storageBucket: "casual-salad-redo.appspot.com",
    messagingSenderId: "730940020222",
    appId: "1:730940020222:web:139c207263441203"
  };

  firebase.initializeApp(firebaseConfig);

  var dataRef = firebase.database();

  var trainName = "";
  var destination= "";
  var firstTrainTime = "";
  var frequency = "";

  $("#submit-train").on("click", function(event) {
    event.preventDefault();

  tainName = $("#train-name-input").val().trim();
  destination =$("#destination-input").val().trim();
  firstTrainTime = $("#first-train-input").val().trim();
  frequency = $("#frequency-input").value().trim();

  dataRef.ref().push({
      trainNameF: trainName,
      destinationF: destination,
      firstTrainTimeF: firstTrainTime,
      frequencyF: frequency,
  });
});