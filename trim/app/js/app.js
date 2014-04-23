var canvas = new fabric.Canvas('area');
var bkgImage;

canvas.setHeight(500);
canvas.setWidth(800);

addImage();


var lastMarker = null;

var zoomPlus = document.getElementById('zoom-plus');
var zoomMinus = document.getElementById('zoom-minus');

function scale(marker, applyFactor){
    var currentScale = marker.get('scaleX');
    currentScale = applyFactor(currentScale, 0.2);
    marker.set({'scaleX': currentScale, 'scaleY': currentScale} );
    canvas.renderAll();
}

zoomPlus.addEventListener('click', function(){
   zoomIn();
    // scale(lastMarker, function(currentScale, amount){
    //     return currentScale + amount;
    // });
    // console.log(bkgImage);
    // scale(bkgImage, function(currentScale, amount){
    //     return currentScale + amount;
    // })
});

zoomMinus.addEventListener('click', function(){
    zoomOut();
   // scale(lastMarker, function(currentScale, amount){
   //      return currentScale - amount;
   //  });
});


canvas.on('mouse:down', function(e) {
    console.log(e);
    if (e.target === undefined){
        addMarker(e.e.offsetX, e.e.offsetY);
    } else {
        if (e.target.fill === 'green'){
            e.target.fill = 'red';
        }
        else{
            e.target.fill = 'green';
        }
    }
});


function addImage(){
    fabric.Image.fromURL('../img/png.png', function(img) {
        bkgImage = img;
        img.set({width: canvas.width, height: canvas.height, originX: 'left', originY: 'top'});
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });
}

function addMarker(x, y){
    var circle = new fabric.Circle({
        radius: 10, fill: 'green', left: x-10, top: y-10
    });
    circle.set('selectable', false);
    canvas.add(circle);
    lastMarker = circle;
}


var copiedObject;
var copiedObjects = new Array();
var canvasScale = 1;
var SCALE_FACTOR = 1.2;

// Zoom In
function zoomIn() {
    // TODO limit the max canvas zoom in
    
    canvasScale = canvasScale * SCALE_FACTOR;
    
    canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
    canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
    
    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
        
        var tempScaleX = scaleX * SCALE_FACTOR;
        var tempScaleY = scaleY * SCALE_FACTOR;
        var tempLeft = left * SCALE_FACTOR;
        var tempTop = top * SCALE_FACTOR;
        
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        
        objects[i].setCoords();
    }
        
    canvas.renderAll();
}

// Zoom Out
function zoomOut() {
    // TODO limit max cavas zoom out
    
    canvasScale = canvasScale / SCALE_FACTOR;
    
    canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
    canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));
    
    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
    
        var tempScaleX = scaleX * (1 / SCALE_FACTOR);
        var tempScaleY = scaleY * (1 / SCALE_FACTOR);
        var tempLeft = left * (1 / SCALE_FACTOR);
        var tempTop = top * (1 / SCALE_FACTOR);

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }
    
    canvas.renderAll();        
}

