require("dotenv").config();

// Grab the packages...
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");

//inputs
var keys = require("./keys");
var spotify = new Spotify (keys.spotify);
var action = process.argv[2];
var nodeArgs = process.argv;

//variables for the functions, putting them as global variables
// Create an empty variable for holding the band name
var artist = "";
// empty variable to hold the song;
var song = "";
// Create an empty variable for holding the movie name
var movieName = "";


// Functions

    // bands in town/ concerts-this

    function bandsInTown(artist){
      
        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {
            artist = artist + "+" + nodeArgs[i];
            }
            else {
            artist += nodeArgs[i];
        
            }
        }

        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        // Run the axios.get function...
        // The axios.get function takes in a URL and returns a promise (just like $.ajax)
        axios
        .get(queryUrl)
        .then(function(response) {
            // If the axios was successful...Then log the body from the site!

            // picking 5 concerts for fun//
            for (i = 0; i < 5; i++) {

            var venue = response.data[i].venue.name;
            var location = response.data[i].venue.city;
            var date = response.data[i].datetime;

            console.log("Venue Name: " + venue);
            console.log("Venue City: " + location);
            //using moment to capture format of dates
            console.log("Venue Date: " + moment(date).format("MM/DD/YYYY"));


            }
        });
    };

    // spotify - songs - spotify-this-song

    function spotifySong(song) {

        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {
            song = song + "+" + nodeArgs[i];
            }
            else {
            song += nodeArgs[i];
        
            }
        }

        //If no song is provided then your program will default to "The Sign" by Ace of Base.
        if (song === ""){
            song = "The Sign"
        };

        //limiting 5 songs (randomly)
        spotify.search({ type: 'track', query: song, limit: 5}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
          
            //looping to 5 to match with limit up top//
            for (i = 0; i < 5; i++) {

            var songName = data.tracks.items[i].name;
            var album = data.tracks.items[i].album.name;
            var artist = data.tracks.items[i].artists[0].name;
            var preview = data.tracks.items[i].preview_url;
        
            console.log("Song Name: " + songName);
            console.log("Album Name: " + album);  
            console.log("Artist : " + artist); 
            console.log("Preview Link: " + preview);
            
            
            }
          });
        
        };

    // movies - OMDB -movie-this

    function movieThis(movieName){
                                
        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            }
            else {
                movieName += nodeArgs[i];
            }
        };

        //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        if (movieName === ""){
            movieName = "Mr. Nobody"
        }; 

        // Then run a request with axios to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        // This line is just to help us debug against the actual URL.

        axios.get(queryUrl).then(
            function(response) {
                console.log("Title:" + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Production Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);

            }
        );
    };     

    //reading from the random.txt - do what it says

    function doWhatItSays() {

        fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
               
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        console.log(dataArr); //looking at the array
        console.log(dataArr[0]); //first thing in the array -- the command of what we're doing
        console.log(dataArr[1].slice(1, -1)); //the second thing in the array/removing the "" so text can be read.

        //If else to run stuff --

        if (dataArr[0] === "spotify-this-song") {
            console.log("spotify!");
            var doItSong = dataArr[1].slice(1, -1);
            spotifySong(doItSong);      
        } else if (dataArr[0] === "concert-this") {
            console.log("bands in town!");
            var doItArtist = dataArr[1].slice(1, -1);
            bandsInTown(doItArtist);                
        } else if(dataArr[0] === "movie-this") {
            console.log("movie this!");
            var doItMovieName = dataArr[1].slice(1, -1);                                             
            movieThis(doItMovieName); 
        };
        
        });


    };

//lets do stuff; show stuff in the terminal.

if (action === "concert-this") {

    bandsInTown(artist);

    } 

    else if (action === "spotify-this-song")  {

    spotifySong(song);  

    }
    
    else if (action === "movie-this"){

    movieThis(movieName);   
    
    }
        
    else if (action === "do-what-it-says") {

    doWhatItSays();
    
    };

