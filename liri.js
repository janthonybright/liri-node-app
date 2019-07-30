require("dotenv").config();
let Spotify = require("node-spotify-api");
let keys = require("./keys.js");
let axios = require("axios");
let moment = require("moment");
let fs = require("fs");

let spotify = new Spotify(keys.spotify);

let command = proccess.argv[2];
let output;

switch (command) {
    case "spotify-this-song":
    output = spotify.search({});
    break;

    case "movie-this":
    let movie = process.argv[3];
    output = axios.get("http://www.omdbapi.com/?i=" + movie + "&apikey=d56ade4e").then(
        function(response) {
            console.log("Title: " + response.data.Title, "\nReleased: " + response.data.Year, "\nRating: " + response.data.Rating);
        });
    break;

    case "concert-this":
    output = ;
    break;

    case "do-what-it-says":
    output = ;
    break;

    default:
        output = "Not Recognized"

}