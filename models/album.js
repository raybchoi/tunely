var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// creation of the album db
var albumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [String]
})

// creation of the model
const Album = mongoose.model('Album', albumSchema);

// export the model
module.exports = Album;
