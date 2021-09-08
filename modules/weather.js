const axios = require("axios");
WEATHER_API_KEY = process.env.WEATHER_API_KEY;

function DayData(item) {
    this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`;
    this.date = item.datetime;
}

let Weather ={}

Weather.getWeatherData = function(req, res) {
    const cityName = req.query.cityName;
    const lat = req.query.lat;
    const lon = req.query.lon;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${WEATHER_API_KEY}`;
    console.log(url);
  
    axios
      .get(url)
      .then((result) => {
        console.log(result.data.data);
        let dayData=result.data.data.map(item=>{
            return new DayData(item);
        })
        res.send(dayData);
      })
      .catch((error) => {
        const errorData = {
          error: "Something went wrong",
          status: 500,
        };
        res.status(500).send(errorData);
      });
}


module.exports = Weather;