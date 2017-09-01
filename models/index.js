var mongoose = require("mongoose");
// const Album = require('./album.js');


mongoose.connect("mongodb://localhost/tunely");
// module.exports = Album;
module.exports.Album = require("./album.js");
module.exports.Song = require("./song.js");
