const axios = require("axios");
require("dotenv").config();

async function grabWeather(req,res) {
    let searchQuery = req.query.searchQuery; 
    let destination = `https://api.weatherbit.io/v2.0/forecast/daily?key=${API}}&city=seattle`;
    
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

module.exports = grabWeather;