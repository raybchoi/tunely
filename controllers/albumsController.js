/************
 * DATABASE *
 ************/

var db = require('../models');

// GET /api/albums
function index(req, res) {
  // send back all albums as JSON
  db.Album.find({}, function(err, allAlbums) {
    res.json(allAlbums);
  });
}

// POST /api/albums
function create(req, res) {
  // create an album based on request body and send it back as JSON
  console.log('body', req.body);

  // split at comma and remove and trailing space
  var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  req.body.genres = genres;

  db.Album.create(req.body, function(err, album) {
    if (err) { console.log('error', err); }
    console.log(album);
    res.json(album);
  });
}

// GET /api/albums/:albumId
function show(req, res) {
  // find one album by id and send it back as JSON
  db.Album.findById(req.params.albumId, function(err, foundAlbum) {
    if(err) { console.log('albumsController.show error', err); }
    console.log('albumsController.show responding with', foundAlbum);
    res.json(foundAlbum);
  });
}

// DELETE /api/albums/:albumId
function destroy(req, res) {
  console.log(req.params.id);
  db.Album.findByIdAndRemove(req.params.id, function(err, deleteAlbum) {
    if(err) {
      console.log('albumsController.delete error', err);
    }
    console.log('albumsController.delete how responding with', deleteAlbum);
    // deleteAlbum.remove();
    res.json(deleteAlbum);
  });
}

// PUT or PATCH /api/albums/:albumId
function update(req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
  console.log("UPDATE AJAX RECEIVING FILE", req.body);
  db.Album.findByIdAndUpdate(req.params.id, {$set: { artistName: req.body.artistName, name: req.body.name, releaseDate: req.body.releaseDate}} , {new: true}, function(err, saveAlbum) {
    if(err) {
      console.log('albumsController.update error', err);
    }
    console.log('albumsController.update RESPONDS WITH', saveAlbum);
    res.json(saveAlbum);
  });
}

// exports.editPost = function (req, res) {
//   //console.log("edit post: " + req.body.title);
//       Track.findByIdAndUpdate(req.params.id, {
//         $set: { text: req.body.text, title: req.body.title }}, {upsert:true}, function (err, user) {
//           return res.json(true);
//         }
//       );
//     };


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
