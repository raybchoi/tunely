
const db = require('../models')

function create(req, res) {
  console.log('THIS IS THE SONG DATA', req.body);
  // if (trackNumber === null) {
  //   console.log('Null')
  // } else {
  const newSong = new db.Song ({
    trackNumber: req.body.trackNumber,
    name: req.body.name
  });
  newSong.save(function(err, newSongs) {
    if (err) {
      console.log('ERR ON CREATE', err);
    }
    // console.log(newSongs);
    res.json(newSongs);
  });
  // }

};

// export public methods here
module.exports = {
  create: create,
};
