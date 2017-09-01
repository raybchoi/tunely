/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


$(document).ready(function() {
  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: renderMultipleAlbums
  });

  $('#album-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/albums', formData, function(album) {
      console.log('album after POST', album);
      renderAlbum(album);  //render the server's response
    });
    $(this).trigger("reset");
  });

  // catch and handle the click on an add song button
  $('#albums').on('click', '.add-song', handleAddSongClick);

  // save song modal save button
  $('#saveSong').on('click', handleNewSongSubmit);

  // delete button parent / child asspoications
  $('#albums').on('click', '.delete-album', handleDeleteAlbum);
  //edit button parent/child asspoications
  $('#albums').on('click', '.edit-album', handleEditAlbum);
  //edit button parent/child asspoications
  $('#albums').on('click', '.save-album', handleSaveAlbum);


});

function renderMultipleAlbums(albums) {
  albums.forEach(function(album) {
    renderAlbum(album);
  });
}

function renderSong(song){
  return `<span>&ndash; (${song.trackNumber}) ${song.name} &ndash;</span>`
}
let counter = 0
function renderAlbum(album) {
  console.log('rendering album', album);

  album.songsHtml = album.songs.map(renderSong).join("");

  var albumHtml = (`
    <form class='album-form'>
    <div class="row album" data-album-id="${album._id}">

      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">


          <!-- begin album internal row -->
            <div class='row'>
              <div class="col-md-3 col-xs-12 thumbnail album-art">
                <img src="images/800x800.png" alt="album image">
              </div>

              <div class="col-md-9 col-xs-12">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Album Name:</h4>
                    <span class='album-name span-for-album'>${album.name}</span>
                    <input class='album-name-input input-for-album input-for-album-name' value='${album.name}'></input>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Artist Name:</h4>
                    <span class='artist-name span-for-album'>${album.artistName}</span>
                    <input class='artist-name-input input-for-album input-for-artist-name' value='${album.artistName}'></input>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Released date:</h4>
                    <span class='album-releaseDate span-for-album'>${album.releaseDate}</span>
                    <input class='album-releaseDate-input input-for-album input-for-release-date' value='${album.releaseDate}'></input>
                  </li>

                  <li class="list-group-item">
                    <h4 class="inline-header">Songs:</h4>
                    ${album.songsHtml}
                  </li>

                </ul>
              </div>

            </div>
            <!-- end of album internal row -->

            <div class='panel-footer'>
              <div class='panel-footer'>
                <button class='btn btn-primary add-song'>Add Song</button>
                  <button class='btn btn-primary delete-album'>Delete Album</button>
                  <button class='btn btn-info edit-album'>Edit Album</button>
                  <button type='submit' class='btn btn-info save-album'>Save Changes</button>
              </div>

            </div>
            </form>
    <!-- end one album -->
  `);
  $('#albums').prepend(albumHtml);
}


// when edit album is clicked give ID
function handleEditAlbum(e) {
  e.preventDefault();
  console.log('edit-album clicked!');
  // closest looks at parents until it finds a parent with given paramater (.album in this case)
  let album = $(this).closest('.album');
  // finding the ID
  var currentAlbumId = $(this).closest('.album').data('album-id');

  // find looks at a parents childern and grandchildern till it finds one with the give paramater (.edit-save in this case)
  // album.find('.edit-save').data('album-id', currentAlbumId)
  console.log('id',currentAlbumId);
  album.find(".save-album").toggle();
  album.find(".input-for-album").toggle();
  album.find(".edit-album").toggle();
  album.find(".span-for-album").toggle();

}
function handleSaveAlbum(e) {
  e.preventDefault();
  console.log('save-album clicked!');
  let album = $(this).closest('.album');
  var currentAlbumId = $(this).closest('.album').data('album-id');
  console.log('id',currentAlbumId);

  let albumnNameUpdate = album.find('.input-for-album-name').val();
  let artistNameUpdate = album.find('.input-for-artist-name').val();
  let resleaseDateUpdate = album.find('.input-for-release-date').val();
  console.log('THIS IS THE ANAME', albumnNameUpdate);
  console.log('THIS IS THE ARTNAME', artistNameUpdate);
  console.log('THIS IS THE RELEASEDATE', resleaseDateUpdate);

  let editAlbumData = {
    artistName: artistNameUpdate,
    name: albumnNameUpdate,
    releaseDate: resleaseDateUpdate,
  }
  $.ajax({
    method:"PUT",
    url:"api/albums/" + currentAlbumId,
    data: editAlbumData,
  })
  .then(function(data){
    console.log("Save is working", data);
    renderAlbum(data);
    //$(".album[data-album-id=" + data._id +"]").remove();
  })
  .catch(function(err){
    console.log("Delete is not working");
  })
  album.find(".save-album").toggle();
  album.find(".input-for-album").toggle();
  album.find(".edit-album").toggle();
  album.find(".span-for-album").toggle();

}
// when delete album is clicked give ID
function handleDeleteAlbum(e) {
  console.log('del-album clicked!');
  var currentAlbumId = $(this).closest('.album').data('album-id');
  console.log('id',currentAlbumId);
  $.ajax({
    method:"delete",
    url:"api/albums/" + currentAlbumId,
  })
  .then(function(data){
    console.log("delete is working", data);

    $(".album[data-album-id=" + data._id +"]").remove();
  })
  .catch(function(err){
    console.log("Delete is not working");
  })
}


// when the add song button is clicked, display the modal
function handleAddSongClick(e) {
  console.log('add-song clicked!');
  var currentAlbumId = $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
  console.log('id',currentAlbumId);
  $('#songModal').data('album-id', currentAlbumId);
  $('#songModal').modal();  // display the modal!
}

// when the song modal submit button is clicked:
function handleNewSongSubmit(e) {
  e.preventDefault();
  var $modal = $('#songModal');
  var $songNameField = $modal.find('#songName');
  var $trackNumberField = $modal.find('#trackNumber');

  // get data from modal fields
  // note the server expects the keys to be 'name', 'trackNumber' so we use those.
  var dataToPost = {
    name: $songNameField.val(),
    trackNumber: $trackNumberField.val()
  };
  var albumId = $modal.data('albumId');
  console.log('retrieved songName:', songName, ' and trackNumber:', trackNumber, ' for album w/ id: ', albumId);
  // POST to SERVER
  var songPostToServerUrl = '/api/albums/'+ albumId + '/songs';
  $.post(songPostToServerUrl, dataToPost, function(data) {
    console.log('received data from post to /songs:', data);
    // clear form
    $songNameField.val('');
    $trackNumberField.val('');

    // close modal
    $modal.modal('hide');
    // update the correct album to show the new song
    $.get('/api/albums/' + albumId, function(data) {
      // remove the current instance of the album from the page
      $('[data-album-id=' + albumId + ']').remove();
      // re-render it with the new album data (including songs)
      renderAlbum(data);
    });
  }).error(function(err) {
    console.log('post to /api/albums/:albumId/songs resulted in error', err);
  });
}
