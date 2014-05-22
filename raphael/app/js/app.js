var WIDTH = 900,
    HEIGHT = 600,
    MARKER_SIZE = 10;

var canvas = document.getElementById('canvas');
var paper = new Raphael(canvas, WIDTH, HEIGHT);

var panZoom = paper.panzoom({ 
    initialZoom: 1,
    gestures: true
});

panZoom.enable();


var img = paper.image("/img/uno.jpg", 0, 0, 1181, 953);
img.attr({ "clip-rect": "0, 0, " + WIDTH + ", " + HEIGHT + " ,30" });

img.click(function(evt){
  console.log('click', evt);
  var box = this.getBBox();
  var currPaperPosition = panZoom.getCurrentPosition();
  var currPaperZoom = panZoom.getCurrentZoom();
  var currHeight = paper.height * (1 - currPaperZoom * 0.1);
  var zoomDif = (currHeight / 2) / box.height;

  var xdif = currPaperPosition.x - box.x + ((box.width * zoomDif) - box.width) / 2;
  var ydif = (currPaperPosition.y + ((currHeight / 2) - (box.height / 2))) - box.y;
  console.log(xdif);
  paper.circle(evt.clientX - (MARKER_SIZE/2), evt.clientY - (MARKER_SIZE/2), MARKER_SIZE);
});
