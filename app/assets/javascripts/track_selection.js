var tracksMenu = {
  loadTracks: function () {
    $.getJSON('/tracks').done(function (tracks) {
      tracksMenu.tracks = tracks;
      tracksMenu.renderTracks();
    });
  },

  renderTracks: function () {
    var i;
    var track;
    var $li;
    $('#user-tracks').empty();
    for (i = 0; i < this.tracks.length; i++) {
      track = this.tracks[i];
      $li = $('<li>');
      $li.html('<a href="#">' + track.title + '</a>');
      console.log($li)
      $('#user-tracks').append($li);
    }
  }

};

$(document).ready(function () {
  tracksMenu.loadTracks();
});