var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Song = require('./song')

// creation of the album db
// we are adding the the Song.schema into the albumSchema
var albumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [String],
  songs: [Song.schema]
});

// creation of the model
const Album = mongoose.model('Album', albumSchema);

// export the model
module.exports = Album;
