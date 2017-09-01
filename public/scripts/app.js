/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');
// rendering the albumn info into the HTML page
  $.ajax({
    type: 'GET',
    url: '/api/albums',
    success: handleSuccess,
    error: handleError,
  });



  $('#actual-form').submit( function(event) {
    // debugger;
    event.preventDefault();

    let newData = $(this).serialize();
    console.log(newData);
    this.reset();
    $.ajax({
      type: 'POST',
      url: 'api/albums',
      data: newData,
    })
    .then(function(albumData) {
      console.log('AJAX worked: ', albumData);
      renderAlbum(albumData);
    })
    .catch(function (err){
      console.log('AJAX FAILED: ', err)
    });
  });

  // $('.add-song').on('click', function(){
  //   console.log('Song Added Button Works');
  // });




  // end of document ready
});

function handleNewSongSubmit (event) {
  event.preventDefault();

  var $modal = $('#songModal');
  var $songNameField = $modal.find('#songName');
  var $trackNumberField = $modal.find('#trackNumber');

  // let newSongName = $('#songModal').find('#songName');
  // let newTrackNumber = $('#songModal').find('#trackNumber');
  // let $modalID =   $modal.data('album-id');
  // console.log('ID THAT IS FROM MODAL', $modalID);


  let newSongData = {
    trackNumber: $trackNumberField.val(),
    name: $songNameField.val(),
  }
  if ( newSongData.trackNumber === '' ) {
    console.log('Do nothing')
  } else {
  $('#songName').val('');
  $('#trackNumber').val('');
  $modal.modal('hide');
  console.log('THIS IS THE SONG DATA ', newSongData)
  var albumId = $modal.data('albumId');
  let newURL = `api/albums/${albumId}/songs`


  $.ajax({
    type: 'POST',
    url: newURL,
    data: newSongData, // body.__.seralized
  })
  .then(function(oneSongData) {
    console.log('AJAX FOR SONG PASSED', oneSongData)
    let oneSongDataId = oneSongData._id;
    let newURLTwo = `api/albums/${oneSongDataId}`;
    console.log(newURLTwo)
    $.ajax({
      type: 'GET',
      url: newURLTwo,
    })
    .then(function(songData){
      console.log('AJAX FOR SONG PASSED', songData)
    })
    /*
A) Have POST /api/albums/:album_id/songs respond with only the newly created song, then make a request to GET /api/albums/:album_id to get the entire album and render that on the page. (You'll need to add the show function in albumsController and the route above in server.js.)
    */
  })
  .catch(function(err) {
    console.log('AJAX FOR SONG FAILED', err)
  });
}
}

// function handleNewSongSubmit(event) {
//   event.preventDefault();
//   var $modal = $('#songModal');
//   var $songNameField = $modal.find('#songName');
//   var $trackNumberField = $modal.find('#trackNumber');
//
//     // console.log('ID THAT IS FROM MODAL', modalID);
//   // get data from modal fields
//   // note the server expects the keys to be 'name', 'trackNumber' so we use those.
//   var dataToPost = {
//     name: $songNameField.val(),
//     trackNumber: $trackNumberField.val()
//   };
// // console.log('ID THAT IS FROM MODAL', dataToPost);
//   // clear form
//   $songNameField.val('');
//   $trackNumberField.val('');
//   // close modal
//   $modal.modal('hide');
//
//
//   var albumId = $modal.data('albumId');
//   console.log('retrieved songName:', songName, ' and trackNumber:', trackNumber, ' for album w/ id: ', albumId);
//   // POST to SERVER
  // var songPostToServerUrl = '/api/albums/'+ albumId + '/songs';
  // $.post(songPostToServerUrl, dataToPost, function(data) {
  //   console.log('received data from post to /songs:', data);
  //   // clear form
  //   $songNameField.val('');
  //   $trackNumberField.val('');
  //   // close modal
  //   $modal.modal('hide');
  //   // update the correct album to show the new song
  //   $.get('/api/albums/' + albumId, function(data) {
  //     // remove the current instance of the album from the page
  //     $('[data-album-id=' + albumId + ']').remove();
  //     // re-render it with the new album data (including songs)
//       renderAlbum(data);
//     });
//   }).error(function(err) {
//     console.log('post to /api/albums/:albumId/songs resulted in error', err);
//   });
// }


function handleSuccess (albums) {
  albums.forEach(function(album) {
    renderAlbum(album);
  });
  //Have to add event listener after the page has rendered which is why its inside this function
  // We are now getting the data-album-id from this button
  // closest => Begins with the current element and Travels up the DOM tree until it finds a match for the supplied selector
  // and the data looks for the 'album-id'

  $('#albums').on('click', '.add-song', function(){
    // console.log('Song Added Button Clicked');
    var id = $(this).closest('.album').data('album-id');

    // this sets the modal to the new data id
    $('#songModal').data('album-id', id)
    // opens the modal
    $('#songModal').modal();
    console.log('THIS IS THE ID FROM THE ADD SONG CLICK', id);
    console.log('THIS IS THE ID FROM THE ADD SONG CLICK', $('#songModal').data('album-id'));
    $('#saveSong').on('click', function(event) {

      //handleNewSongSubmit(data-album-id);
      handleNewSongSubmit(event);
      // $('modal-body input').val('');
    });
  });
};

function handleError(err){
  console.log('There has been an error: ', err);
}



// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);

  // forEach through the album.songs
  // take each one and create a new
  // console.log(album.songs[0].name);
  let trackList = [];
  let counter = 0
  album.songs.forEach(function(song) {
    counter++
    trackList.push(`- (${counter}) ${song.name}`);
  });
  // console.log(trackList);
  // join the array with a space inbetween them
  trackList = trackList.join(' ');
  // console.log(trackList);

  // updated the new HTML with a new section added Song as header and then added the trackList


  let newHTML =
  `<!-- one album -->
    <div class="row album" data-album-id=${album._id}>

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
                    <span class='album-name'>${album.name}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Artist Name:</h4>
                    <span class='artist-name'>${album.artistName}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Released date:</h4>
                    <span class='album-releaseDate'>${album.releaseDate}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class="inline-header">Songs:</h4>
                    <span>${trackList}</span>
                  </li>

                </ul>
              </div>

            </div>
            <!-- end of album internal row -->

              <div class='panel-footer'>
              <button class='btn btn-warning add-song'>Add a Song</button>
              </div>

          </div>
        </div>
      </div>
    </div>
    <!-- end one album -->`

  $('#albums').append(newHTML);
}

/*
.then(function(albumData) {
  console.log('AJAX worked: ', albumData)
  albumData.forEach(function (album) {
    renderAlbum(album);
  });
})
.catch(function (err){
  console.log('AJAX FAILED: ', err)
});
*/
