var tileSize = 32;
var numTilesX = 512 / tileSize;
var numTilesY = 512 / tileSize;

for(var y = 0; y < numTilesY; y++) {
  for(var x = 0; x < numTilesX; x++) {
    var div = document.createElement('div');
    div.classList.add('tile');
    div.classList.add('tile-' + (y * numTilesX + x));
    div.style.top = '' + (y * 32) + 'px';
    div.style.left = '' + (x * 32) + 'px';
    document.body.appendChild(div);
  }
}
