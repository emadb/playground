var canvas = new fabric.Canvas('area');
canvas.setHeight(500);
canvas.setWidth(800);

canvas.on('mouse:down', function(e) {
  console.log('click', e);
  addMarker(e.e.offsetX, e.e.offsetY);
});


function addMarker(x, y){
    var circle = new fabric.Circle({
        radius: 10, fill: 'green', left: x-10, top: y-10
    });
    circle.set('selectable', false);
    canvas.add(circle);
}