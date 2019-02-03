# liri-node-app

LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

1. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
2. Node packages downloaded for use in this app:
    * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
    * [Axios](https://www.npmjs.com/package/axios)
    * [Moment](https://www.npmjs.com/package/moment)
    * [DotEnv](https://www.npmjs.com/package/dotenv)
3. Instructions on how to use LIRI
    * Open Git Bash or Terminal
    * Navigate to the folder with LIRI and its components
    * Check and make sure the liri.js file exists
    * Check and make sure package.json exists/node_modules folder
        * If node_modules folder does not exist, run npm install in Git Bash/Terminal and node_modules will be downloaded
        * If package.json does not exist, let me know and that means I missed a big part of the assignment :)
    * cd into the folder with LIRI: 
    * To get concert info, type: node liri.js concert-this artist name
        * See screenshot in Images folder - Images/Concerts.PNG
    * To get music info, type: node liri.js spotify-this-song song name
        * See screenshot in Images folder - Images/Spotify.PNG
    * To get movie info, type: node liri.js movie-this movie name
        * See screenshot in Images folder - Images/Movie.PNG
    * To use a random text file instead of typing in Git Bash/Terminal, add the commands concert-this, spotify-this, movie-this and the respective names of artists, songs, movies in the Random.txt file, then type: node liri.js do-what-it-says
4. Tools used in building LIRI
    * Node.js
        * See Node packages downloaded above
    * Javascript
    * Git Bash/Terminal
