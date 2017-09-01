var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// creation of the song schema / model
const songSchema = new Schema({
  trackNumber: Number,
  name: String
});

// creation of the model
const Song = mongoose.model('Song', songSchema);

// export the model
module.exports = Song;
