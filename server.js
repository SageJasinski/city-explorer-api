"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weather = require("./weather.json");
const axios = require("axios");
// const {response} = require('express')

// initializes our express server
const app = express();

app.use(cors());

//port variable to transfer information on
let PORT = process.env.PORT || 3002;
let API = process.env.WEATHER_ACCESS_KEY;
console.log('api key', API);

app.listen(PORT, () => console.log('listening for connection', PORT));


//end points here
app.get("/weather", grabWeather);

async function grabWeather(req,res) {
    let searchQuery = req.query.searchQuery; 
    let destination = `https://api.weatherbit.io/v2.0/forecast/daily?key=${API}&city=${searchQuery}`;
    
    try {
        const respond = await axios.get(destination);
        const weatherData = respond.data.data.map(value => new Weather(value));
        res.status(200).send(weatherData);
    }catch(error) {
        res.status(500).send(`server side: ${error}`);
    }
}


class Weather {
    constructor(weatherObj){
        this.low_temp = weatherObj.low_temp;
        this.high_temp = weatherObj.high_temp;
        this.description = weatherObj.weather.description;
    }
}



app.get("/seattle", (req, res) => {
    res.send(weather[0]);
});

app.get("/paris", (req, res) => {
    res.send(weather[1].city_name + ': ' + weather[1].lat + ' ' + weather[1].lon);
})

app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
  });