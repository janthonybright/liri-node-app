require("dotenv").config();
let Spotify = require("node-spotify-api");
let keys = require("./keys.js");
let axios = require("axios");
let moment = require("moment");
let fs = require("fs");

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];

let input = '';

switch (command) {
    case "spotify-this-song":
    song();

    break;

    case "movie-this":
    movie();

    break;

    case "concert-this":
    concert();
    break;

    case "do-what-it-says":
    random();
    break;

    default:
    console.log("!-----NOT-RECOGNIZED-----!")
}

function movie() {
    let movie = process.argv.slice(3).join(" ");
    if (!movie) {
        movie = "Mr.Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=d56ade4e").then(
        function(response) {
            let movieData = response.data;
            console.log("=============== "+movie+" Movie Info ===============")
            console.log("Title: " + movieData.Title);
            console.log("Released Year: " + movieData.Year);
            console.log("IMDb Rating: " + movieData.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
            console.log("Country Produced: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
            console.log("=========================================================")
        });
}

function concert() {
    let band = process.argv.slice(3).join(" ");
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
      function(response) {
          let concertData = response.data;
          for (let i = 0; i < 3; i++) {
            console.log("=============== Concerts of "+band+" ===============")
            console.log("Venue: " + concertData[i].venue.name);
            console.log("Venue Location: " + concertData[i].venue.country +", "+ concertData[i].venue.region +", "+ concertData[i].venue.city);
            console.log("Date & Time: " + moment(concertData[i].datetime).format("MM/DD/YYYY-hh:mm"));
            console.log("=========================================================")

          }
      }  
    )
}

function song() {
    let songName = process.argv.slice(3).join(" ");
    if (!songName) {
        songName = "The Sign Ace Of Base"
    } 
    spotify.search({ type: "track", query: songName}, function (err, response) {
        if (err) throw err;
        let track = response.tracks.items;
        for (let i = 0; i < 1; i++) {
            console.log("=============== "+songName+" Details ===============")
            console.log("Artist: " + track[i].artists[0].name);
            console.log("Track Title: " + track[i].name);
            console.log("Song Link: " + track[i].external_urls.spotify);
            console.log("Album: " + track[i].album.name);
            console.log("==========================================================")

        }
    }
    )};
    
    function random() {
        fs.readFile("random.txt", "utf8", function(error, response) {
            if (error){
               return console.log(error);
            }
            console.log("=============== I'm doing what it says ===============")
            console.log(response);
            
            
        })
    }