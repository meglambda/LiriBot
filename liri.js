var fs = require ("fs");
var value = process.argv[2];
var dataArr = '';
var request = require("request");

var Twitter = require('twitter');

var keys = require('./keys.js')
 

// fs.readFile("keys.js", "utf8", function(error, data){
// 	if(error) {
// 		return console.log(error);
// 	}
// 	console.log(data)

// dataArr = data.split(",");
// 	// console.log("variable dataArr----------" + dataArr);
// })

if(value === "my-tweets") {
	var client = new Twitter(keys.twitterKeys);
 
var params = {screen_name: 'meglambda', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, created_at, text) {
  if (!error) {
  	for(var i=0; i < tweets.length; i++){


    console.log('Created:' + tweets[i]['created_at'])
    console.log(tweets[i]['text'])
  }
    // console.log(repsonse);
  }
});
// }else {
// 	console.log("hmm?")
}else if (value === "spotify-this-song") {
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotifyKeys);
	var songName = process.argv[3];
	console.log(songName);
	spotify
  .search({ type: 'track', query: songName })
  .then(function(response) {
    // console.log(response.tracks.items[0]);
    var songInfo = response.tracks.items[0];
    var artist = songInfo.artists[0].name;
    var nameOfSong = songInfo.name;
    var songLink = songInfo.preview_url;
    var albumName = songInfo.album.name;
    console.log( artist, nameOfSong, songLink, albumName);
  })
  .catch(function(err) {
    console.log(err);
  });
}else if(value === "movie-this"){
	var movieName = process.argv[3];
	console.log(movieName);
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    
    console.log("Title of the Movie is: " + JSON.parse(body).Title);
    console.log("Year Released: " + JSON.parse(body).Year);
    console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
    if (JSON.parse(body).Ratings[1]) {
      console.log("Rotten Totamoes Rating: " + JSON.parse(body).Ratings[1].Value);
    }
    console.log("Country where the movie was produced" + JSON.parse(body).Country);
    console.log("Language of the movie:" + JSON.parse(body).Language);
    console.log("Plot of the movie: " + JSON.parse(body).Plot);
    console.log("Actors in the movie: " + JSON.parse(body).Actors);
  }
});
}

	else {
	console.log("!errorrr!");
}
// Client ID
// 7df81e0bd99c461ebe372986a3e0984f
// Client Secret
// 56f47059590e4c2a92d7df0e2e5646ea