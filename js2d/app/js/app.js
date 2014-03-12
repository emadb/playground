$(function(){

  var canvas = new fabric.Canvas('c');
  canvas.setDimensions({width:900, height:600});


  $('.toolbar ul li img').each(function(i, img){
    img.addEventListener('dragstart', handleDragStart, false);
    img.addEventListener('dragend', handleDragEnd, false);
  });


  // Bind the event listeners for the canvas
  var canvasContainer = document.getElementById('canvas-container');
  canvasContainer.addEventListener('dragenter', handleDragEnter, false);
  canvasContainer.addEventListener('dragover', handleDragOver, false);
  canvasContainer.addEventListener('dragleave', handleDragLeave, false);
  canvasContainer.addEventListener('drop', handleDrop, false);


  function handleDragStart(e) {
    console.log('drag start');
    this.classList.add('img_dragging');
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
    // NOTE: comment above refers to the article (see top) -natchiketa

    return false;
  }

  function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
  }

  function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    var img = document.querySelector('img.img_dragging');

    console.log('event: ', e);

    var newImage = new fabric.Image(img, {
        width: img.width,
        height: img.height,
        left: e.offsetX - (img.width / 2),
        top: e.offsetY - (img.height / 2)
    });

    var objs = canvas.getObjects();
    canvas.add(newImage);
    
    for(var i=0;i<objs.length;i++){
      if (objs[i].intersectsWithObject(newImage)) {
            console.log('conflict', objs[i]);
        }  
    }
  
    

    return false;
  }

  function handleDragEnd(e) {
      // this/e.target is the source node.
     console.log('drag end');
  }





  // $('.toolbar ul li img').dblclick(function(){
  //   var imgInstance = new fabric.Image(this, {
  //     left: 100,
  //     top: 100,
  //     opacity: 0.85
  //   });
  //   canvas.add(imgInstance);
  // });

});
