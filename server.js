// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// (DATA)
// =============================================================

let reservaciones = [];
let listaEspera = [];
const limite = 5;

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });


  //APIS 
  
  // waitlist -> lista espera

  // tables -> checa tables y si se puede hace reservacion

  // clear -> borra una table

app.get("/api/tables", function(req, res) {
  return res.json(reservaciones);
});

app.post("/api/tables", function(req, res) {
    const newReservation = req.body;
    let reservado = false;

    if (reservaciones.length < limite){
        reservaciones.push(newReservation);
        reservado = true;
    } else {
        listaEspera.push(newReservation);
    }

    return res.json(reservado);
  });

app.get("/api/waitlist", function(req, res) {
    return res.json(listaEspera);
});

app.post("/api/clear", function(req, res) {
    reservaciones = listaEspera = [];
    return res.json(true);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});