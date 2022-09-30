"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const grabWeather = require("./weatherContent")
// const {response} = require('express')

// initializes our express server
const app = express();

app.use(cors());

//port variable to transfer information on
let PORT = process.env.PORT || 3004;
let API = process.env.WEATHER_ACCESS_KEY;
console.log('api key', API);

app.listen(PORT, () => console.log('listening for connection', PORT));


//end points here
app.get("/weather", grabWeather);




app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
  });