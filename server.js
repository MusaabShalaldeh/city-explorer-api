"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const server = express();
const Weather = require("./modules/weather");
const Movies = require("./modules/movies");

server.use(cors());
const PORT = process.env.PORT;



//http://localhost:3010/
server.get("/", (req, res) => {
  res.send("Hello from the home route");
});

//http://localhost:3010/weather?cityName=Seattle&lat=47.6038321&lon=-122.3300624
server.get("/weather", Weather.getWeatherData);

server.get("/movies", Movies.getMoviesData);

server.get("*", (req, res) => {
  res.status(404).send("PAGE NOT FOUND");
});

server.listen(PORT, () => {
  console.log(`Listening on port....${PORT}`);
});

