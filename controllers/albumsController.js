/************
 * DATABASE *
 ************/
const db = require('../models')


/* hard-coded data */
// var albums = [];

// GET /api/albums
function index(req, res) {
  // send back all albums as JSON to the to the app.js file to render in the html file
  db.Album.find({}, function (err, albums) {
    if (err) {
      console.log(err);
    }
    res.json(albums);
  });


}

// POST /api/albums
function create(req, res) {
  // create an album based on request body and send it back as JSON

  console.log('THIS IS THE BODY DATA', req.body.genres);
  let genreSplit = req.body.genres.split(',')
  console.log(genreSplit)
  const newAlbum = new db.Album ({
    artistName: req.body.artistName,
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    genres: genreSplit
  });
  newAlbum.save(function(err, newAlbums) {
    if (err) {
      console.log('ERR ON CREATE', err);
    }
    res.json(newAlbum);
  });

}

// GET /api/albums/:albumId
function show(req, res) {
  // find one album by id and send it back as JSON
}

// DELETE /api/albums/:albumId
function destroy(req, res) {
  // find one album by id, delete it, and send it back as JSON
}

// PUT or PATCH /api/albums/:albumId
function update(req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
