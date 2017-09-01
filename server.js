// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var controllers = require('./controllers');

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */
// this route only happens with the API gets hit
app.get('/api', controllers.api.index);

// main route that shows the albumns
app.get('/api/albums', controllers.albums.index);

// this route should take the inputted values from the form and post it as a new div with all the album info // this gets hit when we create a new album
app.post('/api/albums', controllers.albums.create);

// route for adding songs to an albumn
app.post('/api/albums/:album_id/songs', controllers.songs.create)
// api/albums/59a8a64fc41157b49b707805/songs

// once the modal closes we should be left at this url
app.get('/api/albums/:album_id/', controllers.albums.show)
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
