"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const server = express();
let weatherData = [];

server.use(cors());
const PORT = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

//http://localhost:3010/
server.get("/", (req, res) => {
  res.send("Hello from the home route");
});

//http://localhost:3010/weather?cityName=Seattle&lat=47.6038321&lon=-122.3300624
server.get("/weather", getWeatherData);

function getWeatherData(req, res) {
  const cityName = req.query.cityName;
  const lat = req.query.lat;
  const lon = req.query.lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${WEATHER_API_KEY}`;

  axios
    .get(url)
    .then((result) => {
      console.log(result.data.data);
      let dayData=result.data.data.map(item=>{
          return new Data(item);
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

server.get("/movies", getMoviesData);

//http://localhost:3010/movies?search_key=Amman
function getMoviesData(req,res){
    let movieName = req.query.search_key;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${movieName}`;
    console.log(url);

    axios
    .get(url)
    .then((result) => {
      console.log(result.data.results);
      let moviesData=result.data.results.map(item=>{
          return new Movie(item);
      })
      res.send(moviesData);
    })
    .catch((error) => {
      const errorData = {
        error: "Something went wrong",
        status: 500,
      };
      res.status(500).send(errorData);
    });

}

function Data(item) {
  this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`;
  this.date = item.dateTime;
}

function Movie(item){
    this.title = item.title;
    this.overview = item.overview;
    this.average_votes = item.vote_average;
    this.total_votes = item.vote_count;
    //https://image.tmdb.org/t/p/w500/wcdAB1Pb4uIHXPAwdeXG5jQKbwA.jpg
    this.img_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    this.popularity = item.popularity;
    this.released_on = item.release_date;
}

server.get("*", (req, res) => {
  res.status(404).send("PAGE NOT FOUND");
});

server.listen(PORT, () => {
  console.log(`Listening on port....${PORT}`);
});
