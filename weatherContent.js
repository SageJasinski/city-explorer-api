'use strict';

const axios = require("axios");
const cache = require("./cache");

async function grabWeather(req,res) {

  let searchQuery = req.query.searchQuery; 

  let destination = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_ACCESS_KEY}&city=${searchQuery}`;

  let key = searchQuery;
    
    try {

      if (cache[key] && (Date.now() - cache[key].timeStamp < 100000)) {
        console.log('Cached');
        res.status(200).send(cache[key].data);
      }else{
        const respond = await axios.get(destination);
        const weatherData = respond.data.data.map(value => new Weather(value));
        res.status(200).send(weatherData);

        cache[key] = {
          time: Date.now(),
          data: weatherData,
        }
      }


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