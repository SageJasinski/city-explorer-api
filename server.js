"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weather = require("./weather.json");

// initializes our express server
const app = express();

app.use(cors());

//port variable to transfer information on
let PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log('listening for connection'))

app.get("/seattle", (req, res) => {
    res.send(weather[0]);
});

app.get("/paris", (req, res) => {
    res.send(weather[1].city_name + ': ' + weather[1].lat + ' ' + weather[1].lon);
})

app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
  });