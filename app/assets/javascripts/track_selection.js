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
      trackTitle = this.shortenName(track.title);
      $li = $('<li>');
      $li.html('<a href="#">' + trackTitle + '</a>');
      $('#user-tracks').append($li);
    }
  },

  shortenName: function(trackTitle) {
    if (trackTitle.length > 37) {
    return jQuery.trim(trackTitle).substring(0, 30)
                          .trim(this) + "...";
    } else {
      return trackTitle
    }
  }

};

$(document).ready(function () {
  tracksMenu.loadTracks();
});