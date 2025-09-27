// index.js
var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 })); // legacy browsers
app.use(express.static('public'));

// Rutas básicas
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// ======================================
// Timestamp Microservice API
// ======================================

app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  // Si no envían fecha, usamos la fecha actual
  if (!dateString) {
    date = new Date();
  } else {
    // Si es un número, lo tratamos como timestamp en ms
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Validar si la fecha es inválida
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// ======================================
// Listen on port
// ======================================
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
