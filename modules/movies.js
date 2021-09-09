const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const axios = require("axios");

function Movie(item) {
  this.title = item.title;
  this.overview = item.overview;
  this.average_votes = item.vote_average;
  this.total_votes = item.vote_count;
  //https://image.tmdb.org/t/p/w500/wcdAB1Pb4uIHXPAwdeXG5jQKbwA.jpg
  this.img_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  this.popularity = item.popularity;
  this.released_on = item.release_date;
}

let Movies = {};
let MoviesMemory = {};
//http://localhost:3010/movies?search_key=Amman
Movies.getMoviesData = function (req, res) {
  let movieName = req.query.search_key;

  if(MoviesMemory[movieName] !== undefined)
  {
    res.send(MoviesMemory[movieName])
    console.log(MoviesMemory[movieName]);
  }
  else{
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${movieName}`;
  console.log(url);
  axios
    .get(url)
    .then((result) => {
      console.log(result.data.results);
      let moviesData = result.data.results.map((item) => {
        return new Movie(item);
      });
      MoviesMemory[movieName] = moviesData;
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
};

module.exports = Movies;
