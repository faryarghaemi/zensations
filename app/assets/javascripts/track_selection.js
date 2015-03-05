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
    var trackTitle;
    var $li;
    var $a;
    $('#user-tracks').empty();
    for (i = 0; i < this.tracks.length; i++) {
      track = this.tracks[i];
      trackTitle = this.shortenName(track.title);
      $li = $('<li>');
      $a = $('<a>');
      $a.attr("href", "#");
      $a.text(trackTitle);
      $a.addClass('userTrack');
      $a.attr("id", track.id);
      $('#user-tracks').append($li.append($a));
    }
  },

  shortenName: function (trackTitle) {
    if (trackTitle.length > 39) {
      return jQuery.trim(trackTitle).substring(0, 30)
                          .trim(this) + "...";
    } else {
      return trackTitle;
    }
  }
};

$(document).ready(function () {
  tracksMenu.loadTracks();
  
  $('#user-tracks').on('click', '.userTrack', function () {
      var id = $(this).attr('id');
      console.log(id);
  });  
});
