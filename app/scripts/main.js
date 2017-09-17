window.jQuery(function ($) {
  var tileSize = 32;
  var numTilesX = 512 / tileSize;
  var numTilesY = 512 / tileSize;

  var curTileNum = 0;

  $('#tileset').css({
    position: 'relative',
    width: 512,
    height: 512
  });

  for(var y = 0; y < numTilesY; y++) {
    for(var x = 0; x < numTilesX; x++) {
      var div = $('<div class="tile"/>');
      var tileNum = (y * numTilesX + x);
      div.addClass('tile-' + tileNum);
      div.css({
        top: y * 32,
        left: x * 32
      });
      div.data({
        tilenum: tileNum
      });

      div.on('click', function () {
        curTileNum = $(this).data('tilenum');
      });

      $('#tileset').append(div);
    }
  }

  numTilesX = 1024 / tileSize;
  numTilesY = 1024 / tileSize;

  $('#tilemap').css({
    position: 'relative',
    width: 1024,
    height: 1024
  });

  for(var y = 0; y < numTilesY; y++) {
    for(var x = 0; x < numTilesX; x++) {
      var div = $('<div class="tile"/>');
      div.css({
        top: y * 32,
        left: x * 32
      });
      div.data({
        tilenum: 0
      });

      div.on('click', function () {
        $(this).removeClass().addClass('tile tile-' + curTileNum);
      });

      $('#tilemap').append(div);
    }
  }
});
